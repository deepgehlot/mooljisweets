
/* ---------------------------------
   1. HERO BANNER SLIDER
---------------------------------- */

const sweetsSwiper = new Swiper(".sweetsSwiper", {
    loop: true,
    effect: "fade",
    speed: 900,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    fadeEffect: {
        crossFade: true
    },

    pagination: {
        el: ".sweetsSwiper .swiper-pagination",
        clickable: true
    },

    navigation: {
        nextEl: ".sweetsSwiper .swiper-button-next",
        prevEl: ".sweetsSwiper .swiper-button-prev"
    },

    keyboard: {
        enabled: true
    },

    a11y: {
        enabled: true
    }
});


/* ---------------------------------
   2. BESTSELLERS SLIDER
---------------------------------- */


/* 2. BESTSELLERS SLIDER */

const productsSwiper = new Swiper(".productsSwiper", {
    slidesPerView: 1.4,
    spaceBetween: 10,
    speed: 4500,
    loop: true,
    rewind: false,
    watchOverflow: false,
    grabCursor: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    freeMode: {
        enabled: true,
        momentum: false
    },

    navigation: {
        nextEl: ".product-next",
        prevEl: ".product-prev",
        disabledClass: "swiper-button-disabled"
    },

    pagination: {
        el: ".products-pagination",
        clickable: true
    },

    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 12
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 14
        },
        1100: {
            slidesPerView: 3.5,
            spaceBetween: 8
        }
    }
});



/* ---------------------------------
   3. ENQUIRY MODAL
---------------------------------- */

const enquiryModal = document.getElementById("enquiryModal");
const enquiryForm = document.getElementById("enquiryForm");
const selectedProduct = document.getElementById("selectedProduct");
const enquiryStatus = document.getElementById("enquiryStatus");

let currentProduct = "";

// Open popup from product image or Enquire Now button
document.querySelectorAll(".enquire-trigger").forEach((button) => {
    button.addEventListener("click", () => {
        currentProduct = button.dataset.product || "Product Enquiry";

        selectedProduct.textContent = currentProduct;
        enquiryStatus.textContent = "";

        enquiryModal.classList.add("is-open");
        enquiryModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("enquiry-open");

        document.getElementById("customerName").focus();
    });
});

// Close popup
function closeEnquiryModal() {
    enquiryModal.classList.remove("is-open");
    enquiryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("enquiry-open");
}

document.querySelectorAll("[data-close-enquiry]").forEach((button) => {
    button.addEventListener("click", closeEnquiryModal);
});

// Close popup using Escape key
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        enquiryModal.classList.contains("is-open")
    ) {
        closeEnquiryModal();
    }
});


/* ---------------------------------
   4. SAVE ENQUIRY & SHARE WHATSAPP
---------------------------------- */

// Replace this with the actual business WhatsApp number.
// Country code included, digits only. Example format: 919876543210
const BUSINESS_WHATSAPP_NUMBER = "918739801711";

enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
        return;
    }
    const acceptTerms = document.getElementById("acceptTerms");

    if (!acceptTerms.checked) {
        acceptTerms.focus();

        document.querySelector(".terms-required").style.display = "block";
        return;
    }

    document.querySelector(".terms-required").style.display = "none";

    const formData = new FormData(enquiryForm);

    const enquiry = {
        id: `ENQ-${Date.now()}`,
        product: currentProduct,
        name: formData.get("name").trim(),
        city: formData.get("city").trim(),
        address: formData.get("address").trim(),
        pincode: formData.get("pincode").trim(),
        mobile: formData.get("mobile").trim(),
        email: formData.get("email").trim(),
        quantity: Number(formData.get("quantity")),
        description: formData.get("description").trim(),
        createdAt: new Date().toISOString()
    };

    // Save enquiry in this browser
    try {
        const savedEnquiries = JSON.parse(
            localStorage.getItem("mooljiEnquiries") || "[]"
        );

        if (!Array.isArray(savedEnquiries)) {
            throw new Error("Invalid saved enquiry data");
        }

        savedEnquiries.push(enquiry);

        localStorage.setItem(
            "mooljiEnquiries",
            JSON.stringify(savedEnquiries)
        );
    } catch (error) {
        enquiryStatus.textContent =
            "Could not save locally. Please check browser storage settings.";

        return;
    }

    // Prepare a readable, pre-filled WhatsApp message
    const message = [
        "Namaste Moolji Sweet!",
        "",
        "I would like to enquire about a product.",
        "",
        `Enquiry ID: ${enquiry.id}`,
        `Product: ${enquiry.product}`,
        `Name: ${enquiry.name}`,
        `City: ${enquiry.city}`,
        `Address: ${enquiry.address || "Not provided"}`,
        `Pincode: ${enquiry.pincode}`,
        `Mobile: ${enquiry.mobile}`,
        `Email: ${enquiry.email}`,
        `Quantity: ${enquiry.quantity}`,
        `Requirements: ${enquiry.description || "Not specified"}`,
        "",
        "Please share the price, availability and order details.",
        "Thank you!"
    ].join("\n");

    const whatsappNumber = BUSINESS_WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!/^91[6-9]\d{9}$/.test(whatsappNumber)) {
        enquiryStatus.textContent =
            "Enquiry saved in this browser. Set your business WhatsApp number in script.js to enable sharing.";
        return;
    }

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the prepared enquiry
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
        whatsappWindow.opener = null;
    }

    enquiryStatus.textContent =
        "Enquiry saved. WhatsApp is opening with your message.";
});



/* ---------------------------------
   5. MITHAI MAKING INFINITE SLIDER
---------------------------------- */


/* 5. MITHAI MAKING AUTO-LOOP SLIDER */

const makingSwiper = new Swiper(".making-slider", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    speed: 3500,

    loop: true,
    rewind: false,
    watchOverflow: false,
    grabCursor: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    freeMode: {
        enabled: true,
        momentum: false
    },

    navigation: {
        nextEl: ".making-next",
        prevEl: ".making-prev"
    },

    breakpoints: {
        480: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 14
        },
        768: {
            slidesPerView: 2.5,
            slidesPerGroup: 1,
            spaceBetween: 18
        },
        1100: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20
        }
    }
});




/* FAQ accordion: keep only one item open */
document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
        if (item.open) {
            document.querySelectorAll(".faq-item").forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        }
    });
});




/* Footer copyright year */
document.getElementById("footerYear").textContent =
    new Date().getFullYear();

/* Newsletter demo handler */
const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newsletterStatus.textContent =
        "Thanks for your interest! Newsletter subscription is not connected yet.";
});



/* Responsive Navbar Hamburger */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
}

hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

/* Close menu after clicking any navigation link */
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

/* Close menu with Escape key */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

/* Close menu when switching back to desktop */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});
