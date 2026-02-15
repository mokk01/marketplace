
(function RotatingImage() {
    if (!window.Spicetify || !Spicetify.Player || !Spicetify.Platform) {
        setTimeout(RotatingImage, 100);
        return;
    }

    const IMAGE_URL = "https://raw.githubusercontent.com/mokk01/ysr/main/IMG-20260210-WA0001.jpg";

    const style = document.createElement("style");
    style.innerHTML = `
        .rotating-photo-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 100 !important;
            pointer-events: none !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            animation: rotate-smooth 10s linear infinite !important;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
            background-color: #121212;
        }

        @keyframes rotate-smooth {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Target selectors */
        .main-nowPlayingWidget-coverArt,
        .main-nowPlayingView-coverArt,
        .main-coverSlotExpanded-container {
            position: relative !important;
            overflow: hidden !important;
        }

        /* Hide original imagery */
        .main-nowPlayingWidget-coverArt img,
        .main-nowPlayingWidget-coverArt .cover-art,
        .main-nowPlayingView-coverArt img,
        .main-nowPlayingView-coverArt .cover-art,
        .main-coverSlotExpanded-container img {
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);

    function inject() {
        const selectors = [
            ".main-nowPlayingWidget-coverArt",
            ".main-nowPlayingView-coverArt",
            ".main-coverSlotExpanded-container"
        ];

        selectors.forEach(selector => {
            const containers = document.querySelectorAll(selector);
            containers.forEach(container => {
                if (container.querySelector(".rotating-photo-overlay")) return;

                const overlay = document.createElement("div");
                overlay.className = "rotating-photo-overlay";
                overlay.style.backgroundImage = "url('" + IMAGE_URL + "')";

                // Force display if it's a link or something else
                container.style.display = "block";
                container.appendChild(overlay);
                console.log("Injected rotating photo into:", selector);
            });
        });
    }

    // Persistent check to combat Spotify's dynamic UI
    setInterval(inject, 1000);
    inject();

    console.log("Rotating Photo Extension (GitHub RAW) Active!");
})();
