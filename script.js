
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


/* Diwali Pre-Booking Popup */
const welcomePopup = document.getElementById("welcomePopup");
const welcomeOfferForm = document.getElementById("welcomeOfferForm");
const welcomeFormStatus = document.getElementById("welcomeFormStatus");
const diwaliProductRows = document.getElementById("diwaliProductRows");
const addDiwaliProduct = document.getElementById("addDiwaliProduct");

const WELCOME_WHATSAPP_NUMBER = "918739801711";
const WELCOME_SESSION_KEY = "mooljiWelcomePopupClosed";

function openWelcomePopup() {
    if (sessionStorage.getItem(WELCOME_SESSION_KEY) === "yes") return;

    welcomePopup.classList.add("is-visible");
    welcomePopup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeWelcomePopup() {
    welcomePopup.classList.remove("is-visible");
    welcomePopup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    sessionStorage.setItem(WELCOME_SESSION_KEY, "yes");
}

// Show popup shortly after the page loads
if (document.readyState === "complete") {
    setTimeout(openWelcomePopup, 900);
} else {
    window.addEventListener("load", () => {
        setTimeout(openWelcomePopup, 900);
    }, { once: true });
}

// Close button and backdrop
welcomePopup.querySelectorAll("[data-close-welcome]").forEach((element) => {
    element.addEventListener("click", closeWelcomePopup);
});

// Close with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" &&
        welcomePopup.classList.contains("is-visible")) {
        closeWelcomePopup();
    }
});

// Add another product and quantity row
addDiwaliProduct.addEventListener("click", () => {
    const firstRow = diwaliProductRows.querySelector(".diwali-product-row");
    const newRow = firstRow.cloneNode(true);

    newRow.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0;
    });

    newRow.querySelector(".diwali-remove-product").hidden = false;
    diwaliProductRows.appendChild(newRow);
    updateDiwaliProductRows();
});

// Remove a product row
diwaliProductRows.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".diwali-remove-product");
    if (!removeButton) return;

    removeButton.closest(".diwali-product-row").remove();
    updateDiwaliProductRows();
});

function updateDiwaliProductRows() {
    const rows = diwaliProductRows.querySelectorAll(".diwali-product-row");

    rows.forEach((row) => {
        row.querySelector(".diwali-remove-product").hidden = rows.length === 1;
    });
}

// Submit pre-booking details to WhatsApp
welcomeOfferForm.addEventListener("submit", (event) => {
    event.preventDefault();
    welcomeFormStatus.textContent = "";

    if (!welcomeOfferForm.reportValidity()) return;

    const formData = new FormData(welcomeOfferForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const mobile = formData.get("mobile").trim();

    const products = [...diwaliProductRows.querySelectorAll(".diwali-product-row")]
        .map((row) => ({
            product: row.querySelector('select[name="product[]"]').value,
            quantity: row.querySelector('input[name="quantity[]"]').value
        }))
        .filter((item) => item.product && item.quantity);

    if (products.length === 0) {
        welcomeFormStatus.textContent = "Please select at least one sweet and quantity.";
        return;
    }

    // Prevent the same product from being selected more than once
    const productNames = products.map((item) => item.product);
    if (new Set(productNames).size !== productNames.length) {
        welcomeFormStatus.textContent =
            "A product is selected more than once. Please combine its quantity in one row.";
        return;
    }

    const invalidQuantity = products.some((item) => {
        const quantity = Number(item.quantity);

        return !Number.isFinite(quantity) ||
            quantity < 0.25 ||
            quantity > 1000 ||
            Math.round(quantity * 100) % 25 !== 0;
    });

    if (invalidQuantity) {
        welcomeFormStatus.textContent =
            "Please enter a quantity between 0.25 and 1000 KG in increments of 0.25 KG.";
        return;
    }



    const productLines = products.map((item, index) => {
        const quantity = Number(item.quantity);
        const quantityLabel = quantity < 1
            ? `${quantity * 1000} g`
            : `${quantity} KG`;

        return `${index + 1}. ${item.product} - ${quantityLabel}`;
    });

    const message = [
        "Namaste Moolji Sweets!",
        "",
        "I would like to pre-book sweets for Diwali.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Mobile: ${mobile}`,
        "",
        "Pre-Booking Details:",
        ...productLines,
        "",
        "Please confirm availability, prices and order collection/delivery details.",
        "Thank you!"
    ].join("\n");

    const whatsappNumber = WELCOME_WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!/^91[6-9]\d{9}$/.test(whatsappNumber)) {
        welcomeFormStatus.textContent =
            "Please check the business WhatsApp number in script.js.";
        return;
    }

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp after the customer submits the form
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (!whatsappWindow) {
        welcomeFormStatus.textContent =
            "WhatsApp did not open. Please allow popups and try again.";
        return;
    }

    whatsappWindow.opener = null;
    closeWelcomePopup();
    welcomeOfferForm.reset();

    // Keep only the first product row after submission
    const rows = diwaliProductRows.querySelectorAll(".diwali-product-row");
    rows.forEach((row, index) => {
        if (index > 0) row.remove();
    });
    updateDiwaliProductRows();
});