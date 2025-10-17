import photoSocialMedia from "./data/photoSocialMedia.js";
import translations from "./translations/translations.js";

let divSocialMedia = document.querySelector(".social-media-left");
let btnPrev = document.querySelector("#prev");
let btnNext = document.querySelector("#next");
let btnMenuTel = document.querySelector("#menu-tel-btn");
let subscriptionForms = document.querySelectorAll(".subscription-form");

btnMenuTel.addEventListener("click", openMenuTel);

subscriptionForms.forEach(subscriptionForm => {
    subscriptionForm.addEventListener("submit", modalSubscriptionForm);
});

let savedLang = JSON.parse(localStorage.getItem("lang")) || navigator.language.slice(0, 2) || "ua";

const activeBtn = document.getElementById("btn-" + savedLang);
activeBtn.classList.add("scaleLang");

["en", "ru", "ua"].forEach(lang => {
    const btn = document.getElementById("btn-" + lang);
    if (btn) {
        btn.addEventListener("click", () => {
            removeActive();
            btn.classList.add("scaleLang");
            savedLang = lang;
            localStorage.setItem("lang", JSON.stringify(savedLang));
            setLanguage(lang);
        });
    }
});

function removeActive() {
    document.getElementById("btn-" + savedLang).classList.remove("scaleLang");
}

function openMenuTel() {
    let modal = document.getElementById("siteMenu");
    if (!modal) {
        const modal = document.createElement("div");
        modal.id = "siteMenu";
        modal.style.display = "flex";

        const content = document.createElement("div");
        content.className = "menu-content";
        content.innerHTML =
            ` <button id="closeBtn" onclick="closeMenuTel()">X</button>
                <a href="/" data-i18n="home">Главная</a>
                <a href="/about" data-i18n="about">О нас</a>
                <a href="/services" data-i18n="services">Услуги</a>
                <a href="/contacts" data-i18n="contacts">Контакты</a>`;
        modal.appendChild(content);
        document.body.appendChild(modal);

        document.getElementById("closeBtn").addEventListener("click", closeMenuTel);
    } else {
        modal.style.display = "flex";
    }
}

function closeMenuTel() {
    document.getElementById("siteMenu").style.display = "none";
}

let currentIndex = 0;
const visibleCount = 3;

function sectionSocialMedia() {
    divSocialMedia.innerHTML = "";

    const visiblePhotos = photoSocialMedia.slice(
        currentIndex,
        currentIndex + visibleCount
    );

    visiblePhotos.forEach(photo => {
        const img = document.createElement("img");

        img.src = photo.imgUrl;
        img.alt = `Фото ${photo.id}`;
        img.className = "photoSocialMedia";

        divSocialMedia.appendChild(img);

    });
}

btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        btnPrev.classList.add("btnPrevSlide");
        setTimeout(() => {
            btnPrev.classList.remove("btnPrevSlide");
        }, 300)
        sectionSocialMedia();
    }
});

btnNext.addEventListener("click", () => {
    if (currentIndex < photoSocialMedia.length - visibleCount) {
        currentIndex++;
        btnNext.classList.add("btnNextSlide");
        setTimeout(() => {
            btnNext.classList.remove("btnNextSlide");
        }, 300)
        sectionSocialMedia();
    }
});

function modalSubscriptionForm(e) {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    if (email) {
        setTimeout(() => {
            let modal = document.createElement("div");
            modal.classList.add("modal");
            modal.textContent = `Спасибо за подписку, ${email}!`;

            let closeBtn = document.createElement("button");
            closeBtn.textContent = "X";
            closeBtn.classList.add("closeBtn")
            closeBtn.onclick = () => modal.remove();

            modal.append(closeBtn);
            document.body.append(modal);

            setInterval(() => {
                    modal.remove()
                }, 5000
            )

        }, 1000);
        e.target.reset();
    }

}

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const translation = translations[lang][key] || key;
        if (translation) {
            el.textContent = translation;
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const translation = translations[lang][key] || key;
        el.setAttribute("placeholder", translation)
    });

    localStorage.setItem("lang", JSON.stringify(lang));

}

sectionSocialMedia();
setLanguage(savedLang);