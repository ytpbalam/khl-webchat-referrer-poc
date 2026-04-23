document.addEventListener("DOMContentLoaded", () => {
    const selectionSection = document.getElementById("selectionSection");
    const webappSection = document.getElementById("webappSection");
    const conversationalSection = document.getElementById("conversationalSection");

    const startPocBtn = document.getElementById("startPocBtn");
    const backToSelectionFromWeb = document.getElementById("backToSelectionFromWeb");
    const backToSelectionFromConversational = document.getElementById("backToSelectionFromConversational");

    function updateSelectionCards() {
        const selected = document.querySelector('input[name="pocType"]:checked')?.value;
        document.getElementById("cardWebApp")?.classList.toggle("selected", selected === "webapp");
        document.getElementById("cardConversational")?.classList.toggle("selected", selected === "conversational");
    }

    function showSelection() {
        selectionSection.classList.add("active");
        webappSection.classList.remove("active");
        conversationalSection.classList.remove("active");

        document.body.classList.remove("brand-conversational");
        document.body.classList.remove("conversational-fullscreen");
        document.body.classList.add("brand-khl");
        document.body.classList.add("lcw-hidden");

        window.LCWCommon.cleanupWidget();

        if (typeof window.resetWebAppPoc === "function") {
            window.resetWebAppPoc();
        }
    }

    function startSelectedPoc() {
        const selected = document.querySelector('input[name="pocType"]:checked')?.value;

        selectionSection.classList.remove("active");
        webappSection.classList.remove("active");
        conversationalSection.classList.remove("active");

        if (selected === "conversational") {
            conversationalSection.classList.add("active");
            document.body.classList.remove("brand-khl");
            document.body.classList.add("brand-conversational");
            document.body.classList.add("conversational-fullscreen");
            document.body.classList.remove("lcw-hidden");

            if (typeof window.initConversationalPoc === "function") {
                window.initConversationalPoc();
            }
        } else {
            webappSection.classList.add("active");
            document.body.classList.remove("brand-conversational");
            document.body.classList.remove("conversational-fullscreen");
            document.body.classList.add("brand-khl");
            document.body.classList.add("lcw-hidden");

            if (typeof window.initWebAppPoc === "function") {
                window.initWebAppPoc();
            }
        }
    }

    document.querySelectorAll('input[name="pocType"]').forEach((radio) => {
        radio.addEventListener("change", updateSelectionCards);
    });

    startPocBtn.addEventListener("click", startSelectedPoc);
    backToSelectionFromWeb.addEventListener("click", showSelection);
    backToSelectionFromConversational.addEventListener("click", showSelection);

    updateSelectionCards();
    showSelection();
});