(function () {
    const IFRAME_SELECTORS =
        'iframe[id*="oc-lcw"], iframe[title*="Chat"], iframe[src*="livechatwidget"], iframe[src*="omnichannelengagementhub.com"]';
    const CONTAINER_SELECTORS = 'div[id*="oc-lcw"], div[class*="oc-lcw"]';
    const BUTTON_SELECTORS = 'button[id*="lcw"], button[class*="lcw"]';

    let currentWidgetType = null;
    let handlersRegistered = false;

    const QueueLock = (() => {
        let locked = false;
        let overlay = null;
        let iframe = null;
        let domObserver = null;
        let rafId = null;

        function findIframe() {
            return document.querySelector(IFRAME_SELECTORS);
        }

        function ensureIframeReady() {
            return new Promise((resolve) => {
                const existing = findIframe();
                if (existing) return resolve(existing);

                if (domObserver) domObserver.disconnect();

                domObserver = new MutationObserver(() => {
                    const foundIframe = findIframe();
                    if (foundIframe) {
                        domObserver.disconnect();
                        domObserver = null;
                        resolve(foundIframe);
                    }
                });

                domObserver.observe(document.body, { childList: true, subtree: true });
            });
        }

        function ensureOverlay() {
            if (overlay) return overlay;

            overlay = document.createElement("div");
            overlay.id = "lcw-queue-overlay";

            const banner = document.createElement("div");
            banner.className = "queue-banner";
            banner.textContent =
                "You are in the queue. Messaging will be enabled when a counsellor is assigned.";

            overlay.appendChild(banner);
            document.body.appendChild(overlay);
            return overlay;
        }

        function positionOverlay() {
            if (!locked) return;
            if (!iframe) iframe = findIframe();
            if (!iframe || !overlay) return;

            const rect = iframe.getBoundingClientRect();
            if (rect.width < 200 || rect.height < 200) {
                overlay.style.display = "none";
                return;
            }

            const composerBlockHeight = 96;

            overlay.style.left = `${Math.round(rect.left)}px`;
            overlay.style.top = `${Math.round(rect.bottom - composerBlockHeight)}px`;
            overlay.style.width = `${Math.round(rect.width)}px`;
            overlay.style.height = `${composerBlockHeight}px`;
            overlay.style.borderRadius = "0 0 18px 18px";
            overlay.style.display = "block";
        }

        function startTracking() {
            const tick = () => {
                positionOverlay();
                rafId = requestAnimationFrame(tick);
            };
            if (!rafId) rafId = requestAnimationFrame(tick);
        }

        function stopTracking() {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        }

        async function lockNow() {
            locked = true;
            ensureOverlay();
            iframe = await ensureIframeReady();
            positionOverlay();
            startTracking();
        }

        function unlockNow(hardCleanup = false) {
            locked = false;
            if (overlay) overlay.style.display = "none";
            stopTracking();

            if (hardCleanup) {
                if (overlay) overlay.remove();
                overlay = null;
                iframe = null;
                if (domObserver) domObserver.disconnect();
                domObserver = null;
            }
        }

        return {
            lock: lockNow,
            unlock: unlockNow
        };
    })();

    function persistQueueState(isLocked) {
        if (isLocked) {
            sessionStorage.setItem("lcwQueueLocked", "true");
        } else {
            sessionStorage.removeItem("lcwQueueLocked");
        }
    }

    function restoreQueueStateIfNeeded() {
        const shouldLock = sessionStorage.getItem("lcwQueueLocked") === "true";
        if (!shouldLock) return;

        setTimeout(() => {
            QueueLock.lock();
        }, 800);
    }

    function cleanupWidget() {
        const existingScript = document.getElementById("Microsoft_Omnichannel_LCWidget");
        if (existingScript) existingScript.remove();

        document.querySelectorAll(IFRAME_SELECTORS).forEach((iframe) => {
            try { iframe.remove(); } catch { }
        });

        document.querySelectorAll(CONTAINER_SELECTORS).forEach((container) => {
            try { container.remove(); } catch { }
        });

        document.querySelectorAll(BUTTON_SELECTORS).forEach((button) => {
            try { button.remove(); } catch { }
        });

        try {
            if (window.Microsoft?.Omnichannel?.LiveChatWidget?.SDK) {
                delete window.Microsoft.Omnichannel.LiveChatWidget.SDK;
            }
            if (window.Microsoft?.Omnichannel?.LiveChatWidget) {
                delete window.Microsoft.Omnichannel.LiveChatWidget;
            }
        } catch { }

        persistQueueState(false);
        QueueLock.unlock(true);
        currentWidgetType = null;
    }

    function createChatScript(src, config) {
        const script = document.createElement("script");
        script.id = config.id;
        script.src = src;
        script.async = true;
        script.setAttribute("v2", "");

        Object.keys(config.attributes).forEach((key) => {
            script.setAttribute(key, config.attributes[key]);
        });

        return script;
    }

    function loadWidget(config, widgetType) {
        cleanupWidget();
        currentWidgetType = widgetType;

        const script = createChatScript(config.primarySrc, config);

        script.onerror = function (ev) {
            try { ev?.target?.remove?.(); } catch { }
            const fallback = createChatScript(config.fallbackSrc, config);
            document.body.appendChild(fallback);
        };

        document.body.appendChild(script);
    }

    function registerGlobalHandlers() {
        if (handlersRegistered) return;
        handlersRegistered = true;

        window.addEventListener("lcw:ready", () => {
            restoreQueueStateIfNeeded();
            window.dispatchEvent(new CustomEvent("khl:lcwReady", {
                detail: { widgetType: currentWidgetType }
            }));
        });

        window.addEventListener("lcw:startChat", () => {
            window.dispatchEvent(new CustomEvent("khl:lcwStartChat", {
                detail: { widgetType: currentWidgetType }
            }));
        });

        window.addEventListener("lcw:onMessageReceived", (e) => {
            const detail = e?.detail || {};
            const tags = (e?.tags || detail?.tags || detail?.channelData?.tags || []).map((t) =>
                String(t).toLowerCase()
            );
            const msgType = String(e?.msgType || detail?.messageType || "").toLowerCase();
            const text = String(detail?.text || "").toLowerCase();

            const isConversationEndedOrDisconnected =
                tags.includes("supervisorforceclosedconversation") ||
                tags.includes("chatdisconnected") ||
                tags.includes("conversationended") ||
                tags.includes("sessionended") ||
                text.includes("supervisor force closed the session") ||
                text.includes("customer left chat") ||
                text.includes("chat disconnected") ||
                text.includes("session ended") ||
                text.includes("conversation closed") ||
                text.includes("connection lost") ||
                text.includes("reconnecting failed");

            if (isConversationEndedOrDisconnected) {
                persistQueueState(false);
                QueueLock.unlock(true);
                window.dispatchEvent(new CustomEvent("khl:chatClosed", {
                    detail: { widgetType: currentWidgetType }
                }));
                return;
            }

            if (tags.includes("agentaccepted")) {
                persistQueueState(false);
                QueueLock.unlock(false);
                return;
            }

            const isWaitingState =
                tags.includes("queueposition") ||
                tags.includes("customerqueueposition") ||
                tags.includes("customerqueuepositionnext");

            if (isWaitingState) {
                persistQueueState(true);
                QueueLock.lock();
                return;
            }

            const counsellorLeft =
                msgType === "system" &&
                (
                    text.includes("left chat") ||
                    text.includes("left the session") ||
                    text.includes("counsellor left")
                ) &&
                !text.includes("ai agent") &&
                !text.includes("copilot agent") &&
                !text.includes("__agent__") &&
                !text.includes("__admin__") &&
                !text.includes("__system__") &&
                !text.includes("customer left");

            if (counsellorLeft) {
                persistQueueState(true);
                QueueLock.lock();
            }
        });

        window.addEventListener("lcw:onMinimize", () => {
            QueueLock.unlock(false);
        });

        window.addEventListener("lcw:onMaximize", () => {
            restoreQueueStateIfNeeded();
        });

        window.addEventListener("lcw:closeChat", () => {
            persistQueueState(false);
            QueueLock.unlock(true);
            window.dispatchEvent(new CustomEvent("khl:chatClosed", {
                detail: { widgetType: currentWidgetType }
            }));
        });

        window.addEventListener("lcw:onClose", () => {
            persistQueueState(false);
            QueueLock.unlock(true);
            window.dispatchEvent(new CustomEvent("khl:chatClosed", {
                detail: { widgetType: currentWidgetType }
            }));
        });

        window.addEventListener("lcw:chatClosed", () => {
            persistQueueState(false);
            QueueLock.unlock(true);
            window.dispatchEvent(new CustomEvent("khl:chatClosed", {
                detail: { widgetType: currentWidgetType }
            }));
        });
    }

    registerGlobalHandlers();

    window.LCWCommon = {
        loadWidget,
        cleanupWidget,
        persistQueueState,
        restoreQueueStateIfNeeded,
        getCurrentWidgetType: () => currentWidgetType
    };
})();