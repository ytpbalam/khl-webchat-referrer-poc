const CONVERSATIONAL_LCW_CONFIG = {
    id: "Microsoft_Omnichannel_LCWidget",
    primarySrc:
        "https://oc-cdn-public-oce.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js",
    fallbackSrc:
        "https://ocprodpublicocegs.blob.core.windows.net/livechatwidget/scripts/LiveChatBootstrapper.js",
    attributes: {
        "data-app-id": "144797c1-0e81-4734-b3b3-3c667d2b8bd8",
        "data-lcw-version": "prod",
        "data-org-id": "025ebcf6-780b-f011-9aee-002248e344cd",
        "data-org-url":
            "https://m-025ebcf6-780b-f011-9aee-002248e344cd.au.omnichannelengagementhub.com",
        "data-customization-callback": "conversationalLcwCustomizationCallback",
        "data-suggested-action-layout": "stacked"
    }
};

let conversationalContextProviderSet = false;
let conversationalLastSdkInstance = null;

function conversationalLcwCustomizationCallback() {
    const BRAND = "#777c33";
    const WIDGET_BG = "#ffffff";
    const LOGO_URL =
        "https://yourtownau.sharepoint.com/:i:/r/sites/FundraisingDev/Shared%20Documents/Test_WebChat/khl_webchat_logo.png?csf=1&web=1&e=N85bkc";
    const panelSize = getResponsiveChatPanelSize();

    return {
        styleProps: {
            generalStyleProps: {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                bottom: "0px",
                right: "0px",
                fontFamily: "Segoe UI, Arial, sans-serif",
                boxShadow: "none",
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
                    alt: "Conversational - KHL",
                    width: "28px",
                    height: "28px"
                },
                headerTitleProps: {
                    text: "Conversational - KHL"
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
                    borderRadius: "18px 18px 0 0",
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
                    alt: "Conversational - KHL",
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

function buildConversationalContext() {
    const browserInfo = getBrowserInfo();

    return {
        ckhl_browser: { value: browserInfo.ckhl_browser || "", isDisplayable: true },
        ckhl_browserVersion: { value: browserInfo.ckhl_browserVersion || "", isDisplayable: true },
        ckhl_operatingSystem: { value: browserInfo.ckhl_operatingSystem || "", isDisplayable: true },
        ckhl_deviceType: { value: browserInfo.ckhl_deviceType || "", isDisplayable: true },
        ckhl_userAgent: { value: browserInfo.ckhl_userAgent || "", isDisplayable: true }
    };
}

async function buildConversationalContextAsync() {
    const base = buildConversationalContext();
    const ipInfo = await getPublicIp();
    const locationInfo = await getCoordinates();
    const referrer = getReferrerSource();

    return {
        ...base,
        ckhl_ipAddress: { value: ipInfo.ckhl_ipAddress || "", isDisplayable: true },
        ckhl_ipSource: { value: ipInfo.ckhl_ipSource || "", isDisplayable: true },
        ckhl_latitude: { value: locationInfo.ckhl_latitude || "", isDisplayable: true },
        ckhl_longitude: { value: locationInfo.ckhl_longitude || "", isDisplayable: true },
        ckhl_locationPermission: { value: locationInfo.ckhl_locationPermission || "", isDisplayable: true },
        ckhl_locationSource: { value: locationInfo.ckhl_locationSource || "", isDisplayable: true },
        ckhl_referrerSource: { value: referrer, isDisplayable: true }
    };
}

async function registerConversationalContext() {
    const sdk = window.Microsoft?.Omnichannel?.LiveChatWidget?.SDK;

    if (!sdk || typeof sdk.setContextProvider !== "function") {
        return false;
    }

    if (sdk !== conversationalLastSdkInstance) {
        conversationalContextProviderSet = false;
        conversationalLastSdkInstance = sdk;
    }

    if (conversationalContextProviderSet) {
        return true;
    }

    try {
        const contextPayload = await buildConversationalContextAsync();
        sdk.setContextProvider(() => contextPayload);
        conversationalContextProviderSet = true;
        console.log("Conversational context set:", contextPayload);
        return true;
    } catch (error) {
        console.warn("Failed to set conversational context", error);
        return false;
    }
}

function getResponsiveChatPanelSize() {
    const chatColumn = document.querySelector(".chat-column");

    if (!chatColumn) {
        return {
            width: "420px",
            height: "650px",
            right: "24px",
            bottom: "24px",
            borderRadius: "18px"
        };
    }

    const rect = chatColumn.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    let width;
    let height;
    let right;
    let bottom;
    let borderRadius = "18px";

    if (isMobile) {
        width = window.innerWidth - 24;
        height = window.innerHeight - 24;
        right = 12;
        bottom = 12;
        borderRadius = "12px";
    } else if (isTablet) {
        width = rect.width - 20;
        height = window.innerHeight - 30;
        right = window.innerWidth - rect.right + 10;
        bottom = 15;
    } else {
        width = rect.width - 24;
        height = window.innerHeight - 24;
        right = window.innerWidth - rect.right + 12;
        bottom = 12;
    }

    return {
        width: `${Math.max(320, Math.floor(width))}px`,
        height: `${Math.max(500, Math.floor(height))}px`,
        right: `${Math.max(0, Math.floor(right))}px`,
        bottom: `${Math.max(0, Math.floor(bottom))}px`,
        borderRadius
    };
}

let resizeTimer = null;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        const conversationalSection = document.getElementById("conversationalSection");
        const isActive = conversationalSection?.classList.contains("active");

        if (!isActive) return;

        if (typeof window.initConversationalPoc === "function") {
            window.initConversationalPoc();
        }
    }, 300);
});

function initConversationalPoc() {
    conversationalContextProviderSet = false;
    conversationalLastSdkInstance = null;

    document.body.classList.remove("lcw-hidden");
    window.LCWCommon.loadWidget(CONVERSATIONAL_LCW_CONFIG, "conversational");
    console.log("Loading CONVERSATIONAL widget", CONVERSATIONAL_LCW_CONFIG.attributes["data-app-id"]);
}

window.initConversationalPoc = initConversationalPoc;
window.conversationalLcwCustomizationCallback = conversationalLcwCustomizationCallback;

window.addEventListener("khl:lcwReady", async (e) => {
    if (e?.detail?.widgetType !== "conversational") return;
    await registerConversationalContext();
});

window.addEventListener("khl:lcwStartChat", async (e) => {
    if (e?.detail?.widgetType !== "conversational") return;
    conversationalContextProviderSet = false;
    await registerConversationalContext();
});

window.addEventListener("khl:chatClosed", (e) => {
    if (e?.detail?.widgetType !== "conversational") return;
    document.body.classList.remove("lcw-hidden");
});