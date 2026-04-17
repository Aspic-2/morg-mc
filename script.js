document.addEventListener("DOMContentLoaded", () => {

    const typingText = document.getElementById("typing-text");
    const textToType = "MORG NETWORK";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 150); 
        } else {
            setTimeout(() => {
                document.getElementById("main-header").classList.add("show");
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 500);

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

function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("active");
}

document.addEventListener("click", (event) => {
    const dots = document.querySelector(".menu-dots");
    const menu = document.getElementById("dropdown-menu");
    if (!dots.contains(event.target)) {
        menu.classList.remove("active");
    }
});

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';

    if (currentLang === 'ar') {
        document.body.classList.add("ar");
        document.body.setAttribute("dir", "rtl");
    } else {
        document.body.classList.remove("ar");
        document.body.setAttribute("dir", "ltr");
    }

    const elements = document.querySelectorAll("[data-en][data-ar]");
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
}