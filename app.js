// =========================
// MOBILE MENU
// =========================

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// =========================
// CLOSE MOBILE MENU
// =========================

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("active");
    });
});


// =========================
// BUTTON ANIMATION
// =========================

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        button.style.transform = "scale(0.96)";

        setTimeout(() => {
            button.style.transform = "";
        }, 120);
    });
});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        alert(`Thanks ${name}! Your message has been received.`);

        contactForm.reset();
    });
}


// =========================
// CURRENT YEAR
// =========================

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(".card, .section-title, .section-subtitle");

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight - 100;

        if (position < screenPosition) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
