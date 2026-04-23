let lcwReady = false;
let contextProviderSet = false;
let lastSdkInstance = null;
let lastWebAppContextPayload = null;

const WEBAPP_LCW_CONFIG = {
    id: "Microsoft_Omnichannel_LCWidget",
    primarySrc:
        "https://oc-cdn-public-oce.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js",
    fallbackSrc:
        "https://ocprodpublicocegs.blob.core.windows.net/livechatwidget/scripts/LiveChatBootstrapper.js",
    attributes: {
        "data-app-id": "8cfe244f-3a11-4922-956d-2a093b2a988c",
        "data-lcw-version": "prod",
        "data-org-id": "025ebcf6-780b-f011-9aee-002248e344cd",
        "data-org-url":
            "https://m-025ebcf6-780b-f011-9aee-002248e344cd.au.omnichannelengagementhub.com",
        "data-customization-callback": "lcwCustomizationCallback",
        "data-hide-chat-button": "true"
    }
};

function getWebAppWidgetSize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        return {
            width: "96vw",
            height: "94vh",
            right: "2vw",
            bottom: "2vh",
            borderRadius: "12px"
        };
    }

    return {
        width: "92vw",
        height: "90vh",
        right: "4vw",
        bottom: "5vh",
        borderRadius: "18px"
    };
}

function lcwCustomizationCallback() {
    const BRAND = "#5B2D90";
    const WIDGET_BG = "#ffffff";
    const LOGO_URL =
        "https://yourtownau.sharepoint.com/:i:/r/sites/FundraisingDev/Shared%20Documents/Test_WebChat/khl_webchat_logo.png?csf=1&web=1&e=N85bkc";

    const widgetSize = getWebAppWidgetSize();

    return {
        styleProps: {
            generalStyleProps: {
                width: widgetSize.width,
                height: widgetSize.height,
                borderRadius: widgetSize.borderRadius,
                bottom: widgetSize.bottom,
                right: widgetSize.right,
                fontFamily: "Segoe UI, Arial, sans-serif",
                boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
                overflow: "hidden"
            }
        },
        chatButtonProps: {
            styleProps: {
                generalStyleProps: {
                    position: "fixed",
                    borderRadius: "12px",
                    backgroundColor: WIDGET_BG,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.18)",
                    zIndex: 9999
                }
            },
            iconStyleProps: {
                width: "50px",
                height: "40px",
                cursor: "pointer",
                backgroundImage: `url('${LOGO_URL}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }
        },
        headerProps: {
            controlProps: {
                headerIconProps: {
                    src: LOGO_URL,
                    alt: "Kids Helpline",
                    width: "28px",
                    height: "28px"
                },
                headerTitleProps: {
                    text: "Kids Helpline"
                },
                minimizeButtonProps: {
                    iconName: "MiniContract"
                },
                closeButtonProps: {
                    iconName: "Leave"
                }
            },
            styleProps: {
                generalStyleProps: {
                    backgroundColor: BRAND,
                    borderRadius: `${widgetSize.borderRadius} ${widgetSize.borderRadius} 0 0`,
                    padding: "10px 10px"
                },
                titleStyleProps: {
                    marginLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffffff"
                },
                minimizeButtonStyleProps: {
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.18)"
                },
                minimizeButtonHoverStyleProps: {
                    backgroundColor: "rgba(255,255,255,0.28)"
                },
                closeButtonStyleProps: {
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.18)"
                },
                closeButtonHoverStyleProps: {
                    backgroundColor: "rgba(255,255,255,0.28)"
                }
            }
        },
        loadingPaneProps: {
            controlProps: {
                titleText: "We will be with you shortly...",
                subtitleText: "Connecting you to a counsellor...",
                hideSpinnerText: true,
                spinnerSize: 3,
                iconImageProps: {
                    src: LOGO_URL,
                    alt: "Kids Helpline",
                    width: "80px",
                    height: "80px"
                }
            }
        },
        confirmationPaneProps: {
            controlProps: {
                hideTitle: true,
                hideSubtitle: true
            },
            styleProps: {
                generalStyleProps: {
                    position: "absolute",
                    width: "100px",
                    height: "90px",
                    right: "10px",
                    top: "10px",
                    left: "unset",
                    minHeight: "unset",
                    maxHeight: "unset",
                    borderRadius: "10px"
                },
                buttonGroupStyleProps: {
                    marginBottom: 0,
                    flexFlow: "column"
                },
                confirmButtonStyleProps: {
                    borderColor: "black",
                    color: "black",
                    borderRadius: "10px",
                    backgroundColor: "#ffdae9"
                },
                confirmButtonHoveredStyleProps: {
                    borderColor: "black",
                    color: "black",
                    borderRadius: "10px",
                    backgroundColor: "#ffa8cb"
                },
                confirmButtonFocusedStyleProps: {
                    borderColor: "black",
                    color: "black",
                    borderRadius: "10px",
                    backgroundColor: "#ffa8cb"
                },
                cancelButtonStyleProps: {
                    borderRadius: "10px"
                },
                cancelButtonHoveredStyleProps: {
                    borderRadius: "10px"
                },
                cancelButtonFocusedStyleProps: {
                    borderRadius: "10px"
                }
            }
        },
        webChatContainerProps: {
            webChatStyles: {
                backgroundColor: "#ffffff",
                bubbleBorderWidth: 0,
                bubbleBorderRadius: 14,
                bubbleBackground: "#EAF3F3",
                bubbleTextColor: "#111827",
                bubbleFromUserBorderRadius: 14,
                bubbleFromUserBackground: BRAND,
                bubbleFromUserTextColor: "#ffffff",
                bubbleMaxWidth: 320,
                bubbleMinWidth: 40,
                sendBoxBackground: "#F3FAFA",
                sendBoxBorderTop: "1px solid rgba(17,24,39,0.08)",
                suggestedActionBorderRadius: 999,
                suggestedActionBorderWidth: 1,
                suggestedActionBorderColor: BRAND,
                suggestedActionBackground: "#F3F6F9",
                suggestedActionTextColor: BRAND,
                suggestedActionPadding: "8px 18px",
                suggestedActionMargin: "4px 8px 4px 0",
                suggestedActionHeight: 38,
                suggestedActionFontSize: 14,
                suggestedActionHoverBackground: "rgba(0,0,0,0.06)",
                suggestedActionHoverTextColor: BRAND,
                suggestedActionHoverBorderColor: BRAND
            },
            renderingMiddlewareProps: {
                avatarStyleProps: {
                    backgroundImage: `url('${LOGO_URL}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%"
                },
                avatarTextStyleProps: {
                    display: "none"
                }
            }
        }
    };
}

window.lcwCustomizationCallback = lcwCustomizationCallback;

document.addEventListener("DOMContentLoaded", () => {
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const chatFormShell = document.querySelector("#webappSection .chat-form-shell");

    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const submitBtn = document.getElementById("submitBtn");
    const progressFill = document.getElementById("progressFill");
    const genderSelect = document.getElementById("gender");
    const genderOtherRow = document.getElementById("genderOtherRow");
    const requestedCounsellorSelect = document.getElementById("requestedCounsellor");
    const requestedCounsellorNameRow = document.getElementById("requestedCounsellorNameRow");

    const fieldsToMask = [
        "name",
        "pronouns",
        "genderOther",
        "culturalBackground",
        "suburb",
        "requestedCounsellorName"
    ];

    fieldsToMask.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener("input", () => {
            const cursorPos = el.selectionStart;
            el.value = maskAbusiveWords(el.value);
            el.setSelectionRange(cursorPos, cursorPos);
        });
    });

    function setLCWVisibility(show) {
        document.body.classList.toggle("lcw-hidden", !show);
    }

    function setFormVisibility(show) {
        if (!chatFormShell) return;
        chatFormShell.classList.toggle("chat-active", !show);
    }

    function showPage(pageToShow, stepNumber) {
        [page1, page2, page3].forEach((page) => {
            if (page) page.classList.remove("active");
        });

        if (pageToShow) pageToShow.classList.add("active");
        updateProgress(stepNumber);
        clearErrors();

        console.log("[WebApp] showPage:", {
            page: pageToShow?.id || "unknown",
            stepNumber
        });
    }

    function updateProgress(stepNumber) {
        if (!progressFill) return;
        progressFill.style.width = stepNumber === 1 ? "50%" : "100%";
        progressFill.setAttribute("aria-valuenow", stepNumber === 1 ? "50" : "100");
    }

    function toggleGenderOther() {
        const show = getValue("gender") === "I use another word/description";
        if (genderOtherRow) {
            genderOtherRow.classList.toggle("d-none", !show);
        }
        if (!show) {
            const el = document.getElementById("genderOther");
            if (el) el.value = "";
        }
    }

    function toggleRequestedCounsellorName() {
        const show = getValue("requestedCounsellor") === "Yes";
        if (requestedCounsellorNameRow) {
            requestedCounsellorNameRow.classList.toggle("d-none", !show);
        }
        if (!show) {
            const el = document.getElementById("requestedCounsellorName");
            if (el) el.value = "";
        }
    }

    function showError(message) {
        const box = document.getElementById("formErrorSummary");
        if (!box) return;
        box.classList.remove("d-none");
        box.textContent = message;
        console.warn("[WebApp] Validation/Error:", message);
    }

    function clearErrors() {
        const box = document.getElementById("formErrorSummary");
        if (!box) return;
        box.classList.add("d-none");
        box.textContent = "";
    }

    function getFormData() {
        return {
            ckhl_privacyConsent: isChecked("privacyConsent") ? "Yes" : "No",
            ckhl_name: getValue("name"),
            ckhl_age: getValue("age"),
            ckhl_pronouns: getValue("pronouns"),
            ckhl_gender: getValue("gender"),
            ckhl_genderOther: getValue("genderOther"),
            ckhl_atsiOrigin: getValue("atsiOrigin"),
            ckhl_culturalBackground: getValue("culturalBackground"),
            ckhl_state: getValue("state").toUpperCase(),
            ckhl_suburb: getValue("suburb"),
            ckhl_postcode: getValue("postcode"),
            ckhl_phone: getValue("phone"),
            ckhl_email: getValue("email"),
            ckhl_requestedCounsellor: getValue("requestedCounsellor"),
            ckhl_requestedCounsellorName: getValue("requestedCounsellorName")
        };
    }

    function buildChatContext(formData, browserInfo, ipInfo, locationInfo) {
        const referrer = getReferrerSource();

        return {
            ckhl_privacyConsent: { value: formData.ckhl_privacyConsent || "", isDisplayable: true },
            ckhl_referrerSource: { value: referrer, isDisplayable: true },
            ckhl_name: { value: formData.ckhl_name || "", isDisplayable: true },
            ckhl_age: { value: formData.ckhl_age || "", isDisplayable: true },
            ckhl_pronouns: { value: formData.ckhl_pronouns || "", isDisplayable: true },
            ckhl_gender: { value: formData.ckhl_gender || "", isDisplayable: true },
            ckhl_genderOther: { value: formData.ckhl_genderOther || "", isDisplayable: true },
            ckhl_atsiOrigin: { value: formData.ckhl_atsiOrigin || "", isDisplayable: true },
            ckhl_culturalBackground: { value: formData.ckhl_culturalBackground || "", isDisplayable: true },
            ckhl_state: { value: formData.ckhl_state || "", isDisplayable: true },
            ckhl_suburb: { value: formData.ckhl_suburb || "", isDisplayable: true },
            ckhl_postcode: { value: formData.ckhl_postcode || "", isDisplayable: true },
            ckhl_phone: { value: formData.ckhl_phone || "", isDisplayable: true },
            ckhl_email: { value: formData.ckhl_email || "", isDisplayable: true },
            ckhl_requestedCounsellor: { value: formData.ckhl_requestedCounsellor || "", isDisplayable: true },
            ckhl_requestedCounsellorName: { value: formData.ckhl_requestedCounsellorName || "", isDisplayable: true },

            ckhl_browser: { value: browserInfo.ckhl_browser || "", isDisplayable: true },
            ckhl_browserVersion: { value: browserInfo.ckhl_browserVersion || "", isDisplayable: true },
            ckhl_operatingSystem: { value: browserInfo.ckhl_operatingSystem || "", isDisplayable: true },
            ckhl_deviceType: { value: browserInfo.ckhl_deviceType || "", isDisplayable: true },
            ckhl_userAgent: { value: browserInfo.ckhl_userAgent || "", isDisplayable: true },

            ckhl_ipAddress: { value: ipInfo.ckhl_ipAddress || "", isDisplayable: true },
            ckhl_ipSource: { value: ipInfo.ckhl_ipSource || "", isDisplayable: true },

            ckhl_latitude: { value: locationInfo.ckhl_latitude || "", isDisplayable: true },
            ckhl_longitude: { value: locationInfo.ckhl_longitude || "", isDisplayable: true },
            ckhl_locationPermission: { value: locationInfo.ckhl_locationPermission || "", isDisplayable: true },
            ckhl_locationSource: { value: locationInfo.ckhl_locationSource || "", isDisplayable: true }
        };
    }

    function registerChatContext(contextPayload) {
        const sdk = window.Microsoft?.Omnichannel?.LiveChatWidget?.SDK;

        console.log("[WebApp] registerChatContext called");
        console.log("[WebApp] SDK exists:", !!sdk);
        console.log("[WebApp] setContextProvider exists:", !!sdk?.setContextProvider);
        console.log("[WebApp] payload keys:", Object.keys(contextPayload || {}));
        console.log("[WebApp] full payload:", contextPayload);

        if (!sdk || typeof sdk.setContextProvider !== "function") {
            console.warn("[WebApp] LiveChat SDK not ready for setContextProvider");
            return false;
        }

        if (sdk !== lastSdkInstance) {
            contextProviderSet = false;
            lastSdkInstance = sdk;
            console.log("[WebApp] New SDK instance detected");
        }

        if (contextProviderSet) {
            console.log("[WebApp] Context provider already set");
            return true;
        }

        try {
            sdk.setContextProvider(() => {
                console.log("[WebApp] setContextProvider executed");
                return contextPayload;
            });

            contextProviderSet = true;
            console.log("[WebApp] Context successfully set:", contextPayload);
            return true;
        } catch (error) {
            console.warn("[WebApp] Failed to set context provider", error);
            return false;
        }
    }

    function reRegisterLastContextIfNeeded() {
        if (!lastWebAppContextPayload) {
            console.log("[WebApp] No last context payload to re-register");
            return false;
        }

        console.log("[WebApp] Re-registering last context payload");
        return registerChatContext(lastWebAppContextPayload);
    }

    function validatePage1() {
        const data = getFormData();
        console.log("[WebApp] validatePage1 data:", data);

        if (data.ckhl_privacyConsent !== "Yes") {
            showError("To connect with a counsellor you need to tick Yes.");
            return false;
        }
        if (!validateName(data.ckhl_name)) {
            showError("Please enter a name or nickname up to 35 characters.");
            return false;
        }
        if (!validateAge(data.ckhl_age)) {
            showError("Please choose a number from the list below. We need you to tell us your age to move on.");
            return false;
        }
        if (!validatePronouns(data.ckhl_pronouns)) {
            showError("Pronouns must be 20 characters or fewer.");
            return false;
        }
        if (!validateGender(data.ckhl_gender)) {
            showError("Please select a valid gender option.");
            return false;
        }
        if (!validateGenderOther(data.ckhl_genderOther)) {
            showError("Gender description must be 35 characters or fewer.");
            return false;
        }

        return true;
    }

    function validatePage2() {
        const data = getFormData();
        console.log("[WebApp] validatePage2 data:", data);

        if (!validateAtsiOrigin(data.ckhl_atsiOrigin)) {
            showError("Please select a valid Aboriginal or Torres Strait Islander option.");
            return false;
        }
        if (!validateCulturalBackground(data.ckhl_culturalBackground)) {
            showError("Cultural background must be 35 characters or fewer.");
            return false;
        }
        if (!validateState(data.ckhl_state)) {
            showError("Please select a valid state or territory.");
            return false;
        }
        if (!validateSuburb(data.ckhl_suburb)) {
            showError("Suburb must be 35 characters or fewer.");
            return false;
        }
        if (!validatePostcode(data.ckhl_postcode)) {
            showError("Please enter a valid 4 digit postcode.");
            return false;
        }
        if (!validatePhone(data.ckhl_phone)) {
            showError("Please enter a valid phone number.");
            return false;
        }
        if (!validateEmail(data.ckhl_email)) {
            showError("Please enter a valid email address.");
            return false;
        }
        if (!validateRequestedCounsellor(data.ckhl_requestedCounsellor)) {
            showError("Please select a valid requested counsellor option.");
            return false;
        }
        if (!validateRequestedCounsellorName(data.ckhl_requestedCounsellorName)) {
            showError("Requested counsellor name must be 15 characters or fewer.");
            return false;
        }

        return true;
    }

    function resetToHome() {
        const ids = [
            "name", "age", "pronouns", "gender", "genderOther", "atsiOrigin",
            "culturalBackground", "state", "suburb", "postcode", "phone",
            "email", "requestedCounsellor", "requestedCounsellorName"
        ];

        const privacyConsent = document.getElementById("privacyConsent");
        if (privacyConsent) privacyConsent.checked = false;

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });

        contextProviderSet = false;
        lastSdkInstance = null;
        lastWebAppContextPayload = null;

        toggleGenderOther();
        toggleRequestedCounsellorName();
        clearErrors();
        setSubmitBusy(false);
        setLCWVisibility(false);
        setFormVisibility(true);
        showPage(page1, 1);

        console.log("[WebApp] Reset to home");
    }

    function goToPage2() {
        clearErrors();
        console.log("[WebApp] Next clicked");
        if (!validatePage1()) return;
        showPage(page2, 2);
    }

    function goToPage1() {
        clearErrors();
        console.log("[WebApp] Back clicked");
        showPage(page1, 1);
    }

    async function submitForm() {
        clearErrors();
        console.log("[WebApp] Submit clicked");

        if (!validatePage1()) {
            showPage(page1, 1);
            return;
        }

        if (!validatePage2()) {
            showPage(page2, 2);
            return;
        }

        if (!lcwReady) {
            console.warn("[WebApp] LCW not ready at submit");
            showError("Chat is still loading. Please wait a moment and try again.");
            return;
        }

        setSubmitBusy(true);

        try {
            const formData = getFormData();
            const browserInfo = getBrowserInfo();
            const ipInfo = await getPublicIp();
            const locationInfo = await getCoordinates();

            const contextPayload = buildChatContext(formData, browserInfo, ipInfo, locationInfo);
            lastWebAppContextPayload = contextPayload;

            console.log("[WebApp] Context payload built:", contextPayload);

            setFormVisibility(false);
            setLCWVisibility(true);

            const sdk = window.Microsoft?.Omnichannel?.LiveChatWidget?.SDK;

            if (!sdk || typeof sdk.startChat !== "function") {
                throw new Error("LiveChat SDK startChat is not available.");
            }

            sdk.startChat({
                customContext: contextPayload
            });

            console.log("[WebApp] startChat invoked with customContext");
        } catch (error) {
            console.error("[WebApp] Failed to start chat", error);
            contextProviderSet = false;
            window.LCWCommon.persistQueueState(false);
            setLCWVisibility(false);
            setFormVisibility(true);
            showPage(page2, 2);
            showError("Something went wrong while starting chat. Please try again.");
        } finally {
            setSubmitBusy(false);
        }
    }

    function setSubmitBusy(isBusy) {
        if (!submitBtn) return;
        submitBtn.disabled = isBusy;
        submitBtn.textContent = isBusy ? "Submitting..." : "Submit";
    }

    function initWebAppPoc() {
        lcwReady = false;
        contextProviderSet = false;
        lastSdkInstance = null;
        lastWebAppContextPayload = null;

        //console.log("[WebApp] Initialising widget");
        //console.log("[WebApp] App ID:", WEBAPP_LCW_CONFIG.attributes["data-app-id"]);
        //console.log("[WebApp] Full config:", WEBAPP_LCW_CONFIG);

        window.LCWCommon.loadWidget(WEBAPP_LCW_CONFIG, "webapp");
        setLCWVisibility(false);
        setFormVisibility(true);
        showPage(page1, 1);
    }

    window.initWebAppPoc = initWebAppPoc;
    window.resetWebAppPoc = resetToHome;

    if (nextBtn) nextBtn.addEventListener("click", goToPage2);
    if (backBtn) backBtn.addEventListener("click", goToPage1);
    if (submitBtn) submitBtn.addEventListener("click", submitForm);
    if (genderSelect) genderSelect.addEventListener("change", toggleGenderOther);
    if (requestedCounsellorSelect) {
        requestedCounsellorSelect.addEventListener("change", toggleRequestedCounsellorName);
    }

    toggleGenderOther();
    toggleRequestedCounsellorName();
    showPage(page1, 1);
    setLCWVisibility(false);

    window.addEventListener("khl:lcwReady", (e) => {
        console.log("[WebApp] khl:lcwReady event:", e?.detail);

        if (e?.detail?.widgetType !== "webapp") {
            console.log("[WebApp] Ignored lcwReady for non-webapp widget");
            return;
        }

        lcwReady = true;
        contextProviderSet = false;
        setLCWVisibility(false);

        if (lastWebAppContextPayload) {
            reRegisterLastContextIfNeeded();
        }
    });

    window.addEventListener("khl:lcwStartChat", (e) => {
        console.log("[WebApp] khl:lcwStartChat event:", e?.detail);

        if (e?.detail?.widgetType !== "webapp") {
            console.log("[WebApp] Ignored lcwStartChat for non-webapp widget");
            return;
        }

        contextProviderSet = false;

        if (lastWebAppContextPayload) {
            reRegisterLastContextIfNeeded();
        }
    });

    window.addEventListener("khl:chatClosed", (e) => {
        console.log("[WebApp] khl:chatClosed event:", e?.detail);

        if (e?.detail?.widgetType !== "webapp") {
            console.log("[WebApp] Ignored chatClosed for non-webapp widget");
            return;
        }

        resetToHome();
    });
});