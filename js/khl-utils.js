const BLOCKED_WORDS = [
    "asshole", "ass", "bitch", "bastard", "bollocks",
    "crap", "cunt", "damn", "dick", "dumbass",
    "fuck", "fucker", "fucking",
    "shit", "shitty",
    "slut", "whore",
    "idiot", "moron", "loser",
    "stupid", "retard",
    "jerk", "prick"
];

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[@$]/g, "s")
        .replace(/!/g, "i")
        .replace(/0/g, "o")
        .replace(/1/g, "i")
        .replace(/3/g, "e")
        .replace(/4/g, "a")
        .replace(/5/g, "s")
        .replace(/7/g, "t")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "")
        .trim();
}

function containsBlockedWord(text) {
    const normalized = normalizeText(text);
    if (!normalized) return false;

    return BLOCKED_WORDS.some((word) => normalized.includes(word));
}

function maskAbusiveWords(text) {
    if (!text) return text;

    let result = text;

    BLOCKED_WORDS.forEach(word => {
        const pattern = new RegExp(word.split("").join("\\s*"), "gi");
        result = result.replace(pattern, "***");
    });

    return result;
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? String(element.value || "").trim() : "";
}

function isChecked(id) {
    const element = document.getElementById(id);
    return !!element?.checked;
}

function validateName(name) {
    const value = String(name || "").trim();
    if (value.length < 1 || value.length > 35) return false;
    if (containsBlockedWord(value)) return false;
    return true;
}

function validateAge(age) {
    const validAges = new Set([
        "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
        "16", "17", "18", "19", "20", "21", "22", "23", "24", "25",
        "26+", "Others"
    ]);
    return validAges.has(String(age || "").trim());
}

function validatePronouns(pronouns) {
    const value = String(pronouns || "").trim();
    if (value.length > 20) return false;
    if (containsBlockedWord(value)) return false;
    return true;
}

function validateGender(gender) {
    const valid = new Set([
        "",
        "Girl/woman",
        "Boy/man",
        "Transgender boy/man",
        "Transgender girl/woman",
        "Non-binary",
        "I use another word/description",
        "Prefer not to say"
    ]);
    return valid.has(String(gender || "").trim());
}

function validateGenderOther(value) {
    const text = String(value || "").trim();
    if (text.length > 35) return false;
    if (containsBlockedWord(text)) return false;
    return true;
}

function validateAtsiOrigin(value) {
    const valid = new Set([
        "",
        "Yes, Aboriginal",
        "Yes, Torres Strait Islander",
        "Yes, both",
        "No",
        "Prefer not to say"
    ]);
    return valid.has(String(value || "").trim());
}

function validateCulturalBackground(value) {
    const text = String(value || "").trim();
    if (text.length > 35) return false;
    if (containsBlockedWord(text)) return false;
    return true;
}

function validateState(state) {
    if (!state) return true;
    const validStates = new Set(["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]);
    return validStates.has(String(state || "").trim().toUpperCase());
}

function validateSuburb(value) {
    const text = String(value || "").trim();
    if (text.length > 35) return false;
    if (containsBlockedWord(text)) return false;
    return true;
}

function validatePostcode(postcode) {
    const value = String(postcode || "").trim();
    return value === "" || /^\d{4}$/.test(value);
}

function validatePhone(phone) {
    const value = String(phone || "").trim();
    if (value === "") return true;
    return /^(?:\+61\s?4\d{2}\s?\d{3}\s?\d{3}|04\d{2}\s?\d{3}\s?\d{3})$/.test(value);
}

function validateEmail(email) {
    const value = String(email || "").trim();
    if (value === "") return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRequestedCounsellor(value) {
    const valid = new Set(["", "Yes", "No"]);
    return valid.has(String(value || "").trim());
}

function validateRequestedCounsellorName(value) {
    const text = String(value || "").trim();
    if (text.length > 15) return false;
    if (containsBlockedWord(text)) return false;
    return true;
}

function getBrowserInfo() {
    const ua = navigator.userAgent || "";
    const uaData = navigator.userAgentData;

    let browser = "Unknown";
    let browserVersion = "";
    let operatingSystem = "Unknown";
    const deviceType = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "Mobile" : "Desktop";

    if (uaData && Array.isArray(uaData.brands) && uaData.brands.length > 0) {
        const brand = uaData.brands.find((b) => !/Not/i.test(b.brand)) || uaData.brands[0];
        browser = brand?.brand || "Unknown";
        browserVersion = brand?.version || "";
        operatingSystem = uaData.platform || "Unknown";
    } else {
        if (/Edg\//.test(ua)) {
            browser = "Microsoft Edge";
            browserVersion = (ua.match(/Edg\/([\d.]+)/) || [])[1] || "";
        } else if (/Chrome\//.test(ua)) {
            browser = "Chrome";
            browserVersion = (ua.match(/Chrome\/([\d.]+)/) || [])[1] || "";
        } else if (/Firefox\//.test(ua)) {
            browser = "Firefox";
            browserVersion = (ua.match(/Firefox\/([\d.]+)/) || [])[1] || "";
        } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
            browser = "Safari";
            browserVersion = (ua.match(/Version\/([\d.]+)/) || [])[1] || "";
        }

        if (/Windows/i.test(ua)) operatingSystem = "Windows";
        else if (/Mac OS X/i.test(ua)) operatingSystem = "macOS";
        else if (/Android/i.test(ua)) operatingSystem = "Android";
        else if (/iPhone|iPad|iPod/i.test(ua)) operatingSystem = "iOS";
        else if (/Linux/i.test(ua)) operatingSystem = "Linux";
    }

    return {
        ckhl_browser: browser,
        ckhl_browserVersion: browserVersion,
        ckhl_operatingSystem: operatingSystem,
        ckhl_deviceType: deviceType,
        ckhl_userAgent: ua
    };
}

async function getPublicIp() {
    try {
        const response = await fetch("https://api.ipify.org?format=json", {
            method: "GET",
            headers: { Accept: "application/json" }
        });

        if (!response.ok) {
            throw new Error(`IP lookup failed: ${response.status}`);
        }

        const data = await response.json();

        return {
            ckhl_ipAddress: data.ip || "",
            ckhl_ipSource: "ipify"
        };
    } catch (error) {
        console.warn("IP lookup failed", error);
        return {
            ckhl_ipAddress: "",
            ckhl_ipSource: "unavailable"
        };
    }
}

function getCoordinates() {
    return Promise.resolve({
        ckhl_latitude: "",
        ckhl_longitude: "",
        ckhl_locationPermission: "not_collected",
        ckhl_locationSource: "disabled"
    });
}
function getReferrerSource() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("referrer") || "khl").toLowerCase();
}