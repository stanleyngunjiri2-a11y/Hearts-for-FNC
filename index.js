/* =========================================================
   FRANCY LOVE WEBSITE - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SELECT HTML ELEMENTS
    ===================================================== */

    const navButtons = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    const loveButton = document.getElementById("loveButton");
    const surpriseModal = document.getElementById("surpriseModal");
    const closeModal = document.getElementById("closeModal");

    const heartMessageButton =
        document.getElementById("heartMessageButton");

    const heartsContainer =
        document.getElementById("hearts-container");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       2. PAGE NAVIGATION
    ===================================================== */

    function showPage(pageId) {

        // Hide all pages
        pages.forEach((page) => {
            page.classList.remove("active-page");
        });

        // Remove active class from all navigation buttons
        navButtons.forEach((button) => {
            button.classList.remove("active");
        });

        // Find selected page
        const selectedPage =
            document.getElementById(pageId);

        // Find selected navigation button
        const selectedButton =
            document.querySelector(
                `.nav-btn[data-page="${pageId}"]`
            );

        // Show selected page
        if (selectedPage) {
            selectedPage.classList.add("active-page");
        }

        // Highlight selected navigation button
        if (selectedButton) {
            selectedButton.classList.add("active");
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Save selected page
        localStorage.setItem(
            "francyCurrentPage",
            pageId
        );
    }


    // Navigation button click events
    navButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const pageId =
                button.dataset.page;

            showPage(pageId);

        });

    });


    /* =====================================================
       3. REMEMBER LAST VISITED PAGE
    ===================================================== */

    const savedPage =
        localStorage.getItem("francyCurrentPage");

    if (
        savedPage &&
        document.getElementById(savedPage)
    ) {

        showPage(savedPage);

    } else {

        showPage("home");

    }


    /* =====================================================
       4. SURPRISE MODAL
    ===================================================== */

    function openSurpriseModal() {

        if (!surpriseModal) {
            return;
        }

        surpriseModal.classList.add("show");

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

        // Create heart effect
        createHeartBurst(15);
    }


    function closeSurpriseModal() {

        if (!surpriseModal) {
            return;
        }

        surpriseModal.classList.remove("show");

        // Allow scrolling again
        document.body.style.overflow = "";
    }


    // Open surprise modal
    if (loveButton) {

        loveButton.addEventListener(
            "click",
            openSurpriseModal
        );

    }


    // Close modal using close button
    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeSurpriseModal
        );

    }


    // Close modal when clicking outside modal content
    if (surpriseModal) {

        surpriseModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === surpriseModal
                ) {

                    closeSurpriseModal();

                }

            }
        );

    }


    // Close modal using Escape key
    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                surpriseModal &&
                surpriseModal.classList.contains("show")
            ) {

                closeSurpriseModal();

            }

        }
    );


    /* =====================================================
       5. FLOATING HEARTS
    ===================================================== */

    function createFloatingHeart() {

        if (!heartsContainer) {
            return;
        }

        const heart =
            document.createElement("div");

        heart.classList.add("floating-heart");

        // Different heart emojis
        const heartTypes = [
            "❤️",
            "💕",
            "💖",
            "💗",
            "💓",
            "💘",
            "💝"
        ];

        // Select random heart
        const randomHeart =
            heartTypes[
                Math.floor(
                    Math.random() * heartTypes.length
                )
            ];

        heart.textContent = randomHeart;

        // Random horizontal position
        heart.style.left =
            Math.random() * 100 + "vw";

        // Random size
        const randomSize =
            Math.random() * 20 + 15;

        heart.style.fontSize =
            randomSize + "px";

        // Random animation duration
        const randomDuration =
            Math.random() * 3 + 4;

        heart.style.animationDuration =
            randomDuration + "s";

        // Add heart to page
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {

            heart.remove();

        }, randomDuration * 1000);

    }


    // Create a new floating heart every 700 milliseconds
    setInterval(
        createFloatingHeart,
        700
    );


    /* =====================================================
       6. HEART BURST
    ===================================================== */

    function createHeartBurst(amount = 10) {

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(() => {

                createFloatingHeart();

            }, i * 100);

        }

    }


    /* =====================================================
       7. SEND LOVE BUTTON
    ===================================================== */

    if (heartMessageButton) {

        heartMessageButton.addEventListener(
            "click",
            () => {

                // Create many hearts
                createHeartBurst(25);

                // Save original button text
                const originalText =
                    heartMessageButton.innerHTML;

                // Change button text
                heartMessageButton.innerHTML =
                    "❤️ Love Sent To Francy!";

                // Disable button temporarily
                heartMessageButton.disabled =
                    true;

                // Restore button after 2.5 seconds
                setTimeout(() => {

                    heartMessageButton.innerHTML =
                        originalText;

                    heartMessageButton.disabled =
                        false;

                }, 2500);

            }
        );

    }


    /* =====================================================
       8. LOVE COUNTER
    ===================================================== */

    /*
       CHANGE THIS DATE TO YOUR SPECIAL DATE.

       Example:
       const loveStartDate =
           new Date("2025-06-15T00:00:00");
    */

    const loveStartDate =
        new Date("2025-01-01T00:00:00");


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    function updateLoveCounter() {

        const now =
            new Date();

        const difference =
            now - loveStartDate;


        // If date is in the future
        if (difference < 0) {

            if (daysElement) {
                daysElement.textContent = "0";
            }

            if (hoursElement) {
                hoursElement.textContent = "0";
            }

            if (minutesElement) {
                minutesElement.textContent = "0";
            }

            if (secondsElement) {
                secondsElement.textContent = "0";
            }

            return;
        }


        // Convert milliseconds to seconds
        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        // Calculate days
        const days =
            Math.floor(
                totalSeconds / 86400
            );


        // Calculate hours
        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        // Calculate minutes
        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        // Calculate seconds
        const seconds =
            totalSeconds % 60;


        // Update Days
        if (daysElement) {

            daysElement.textContent =
                days;

        }


        // Update Hours
        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(2, "0");

        }


        // Update Minutes
        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

        }


        // Update Seconds
        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        }

    }


    // Run counter immediately
    updateLoveCounter();


    // Update counter every second
    setInterval(
        updateLoveCounter,
        1000
    );


    /* =====================================================
       9. AUTOMATIC COPYRIGHT YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       10. GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-card img"
        );


    let currentImageIndex = 0;


    // Create lightbox
    const lightbox =
        document.createElement("div");

    lightbox.id =
        "galleryLightbox";


    // Add lightbox HTML
    lightbox.innerHTML = `
        <div class="lightbox-content">

            <button
                class="lightbox-close"
                aria-label="Close gallery"
            >
                ×
            </button>

            <button
                class="lightbox-prev"
                aria-label="Previous image"
            >
                ❮
            </button>

            <img
                class="lightbox-image"
                src=""
                alt="Gallery image"
            >

            <button
                class="lightbox-next"
                aria-label="Next image"
            >
                ❯
            </button>

            <div class="lightbox-counter">
                1 / ${galleryImages.length}
            </div>

        </div>
    `;


    // Add lightbox to body
    document.body.appendChild(lightbox);


    // Select lightbox elements
    const lightboxImage =
        lightbox.querySelector(
            ".lightbox-image"
        );

    const lightboxClose =
        lightbox.querySelector(
            ".lightbox-close"
        );

    const lightboxPrev =
        lightbox.querySelector(
            ".lightbox-prev"
        );

    const lightboxNext =
        lightbox.querySelector(
            ".lightbox-next"
        );

    const lightboxCounter =
        lightbox.querySelector(
            ".lightbox-counter"
        );


    /* =====================================================
       11. SHOW GALLERY IMAGE
    ===================================================== */

    function showGalleryImage(index) {

        // Make sure there are images
        if (galleryImages.length === 0) {
            return;
        }


        // Loop to last image
        if (index < 0) {

            currentImageIndex =
                galleryImages.length - 1;

        }

        // Loop to first image
        else if (
            index >= galleryImages.length
        ) {

            currentImageIndex = 0;

        }

        // Use selected image
        else {

            currentImageIndex = index;

        }


        // Get selected image
        const selectedImage =
            galleryImages[
                currentImageIndex
            ];


        // Update lightbox image
        lightboxImage.src =
            selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt;


        // Update counter
        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${galleryImages.length}`;

    }


    /* =====================================================
       12. OPEN LIGHTBOX
    ===================================================== */

    galleryImages.forEach(
        (image, index) => {

            // Show pointer cursor
            image.style.cursor =
                "pointer";


            image.addEventListener(
                "click",
                () => {

                    currentImageIndex =
                        index;

                    showGalleryImage(
                        currentImageIndex
                    );

                    lightbox.classList.add(
                        "show"
                    );

                    // Disable background scrolling
                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


    /* =====================================================
       13. CLOSE LIGHTBOX
    ===================================================== */

    function closeGallery() {

        lightbox.classList.remove(
            "show"
        );

        // Enable background scrolling
        document.body.style.overflow =
            "";

    }


    // Close button
    lightboxClose.addEventListener(
        "click",
        closeGallery
    );


    // Close by clicking background
    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeGallery();

            }

        }
    );


    /* =====================================================
       14. NEXT IMAGE
    ===================================================== */

    lightboxNext.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            showGalleryImage(
                currentImageIndex + 1
            );

        }
    );


    /* =====================================================
       15. PREVIOUS IMAGE
    ===================================================== */

    lightboxPrev.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            showGalleryImage(
                currentImageIndex - 1
            );

        }
    );


    /* =====================================================
       16. KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            // Only work when gallery is open
            if (
                !lightbox.classList.contains("show")
            ) {
                return;
            }


            // Right arrow
            if (
                event.key === "ArrowRight"
            ) {

                showGalleryImage(
                    currentImageIndex + 1
                );

            }


            // Left arrow
            if (
                event.key === "ArrowLeft"
            ) {

                showGalleryImage(
                    currentImageIndex - 1
                );

            }


            // Escape
            if (
                event.key === "Escape"
            ) {

                closeGallery();

            }

        }
    );


    /* =====================================================
       17. LIGHTBOX CSS
    ===================================================== */

    const lightboxStyles =
        document.createElement("style");


    lightboxStyles.textContent = `
        #galleryLightbox {
            position: fixed;
            inset: 0;
            z-index: 5000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 30px;
            background: rgba(30, 5, 15, 0.92);
            backdrop-filter: blur(8px);
        }

        #galleryLightbox.show {
            display: flex;
        }

        .lightbox-content {
            position: relative;
            width: 100%;
            max-width: 900px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lightbox-image {
            max-width: 80vw;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            border: none;
            cursor: pointer;
            color: white;
            background: rgba(255, 255, 255, 0.15);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: #d6336c;
            transform: scale(1.1);
        }

        .lightbox-close {
            top: -70px;
            right: 0;
        }

        .lightbox-prev {
            left: 20px;
        }

        .lightbox-next {
            right: 20px;
        }

        .lightbox-counter {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1rem;
        }

        @media (max-width: 768px) {

            .lightbox-image {
                max-width: 90vw;
                max-height: 70vh;
            }

            .lightbox-prev {
                left: 5px;
            }

            .lightbox-next {
                right: 5px;
            }

            .lightbox-close {
                top: -60px;
            }
        }
    `;


    // Add lightbox CSS to document
    document.head.appendChild(
        lightboxStyles
    );


    /* =====================================================
       18. INITIAL HEART EFFECT
    ===================================================== */

    setTimeout(() => {

        createHeartBurst(5);

    }, 1000);


    /* =====================================================
       19. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "❤️ Francy Love Website Loaded Successfully!"
    );

});