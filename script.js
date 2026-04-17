document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typing Animation & Header Dropdown
    const typingText = document.getElementById("typing-text");
    const textToType = "MORG NETWORK";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 150); // Typing speed
        } else {
            // Drop the header after typing finishes
            setTimeout(() => {
                document.getElementById("main-header").classList.add("show");
            }, 500);
        }
    }
    
    // Start typing
    setTimeout(typeWriter, 500);

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach(section => {
        observer.observe(section);
    });

});

// 3. Dropdown Menu Toggle
function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("active");
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    const dots = document.querySelector(".menu-dots");
    const menu = document.getElementById("dropdown-menu");
    if (!dots.contains(event.target)) {
        menu.classList.remove("active");
    }
});

// 4. Language Switcher (English <-> Arabic)
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    
    // Toggle body direction
    if (currentLang === 'ar') {
        document.body.classList.add("ar");
        document.body.setAttribute("dir", "rtl");
    } else {
        document.body.classList.remove("ar");
        document.body.setAttribute("dir", "ltr");
    }

    // Update all elements with data-ar and data-en
    const elements = document.querySelectorAll("[data-en][data-ar]");
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
}