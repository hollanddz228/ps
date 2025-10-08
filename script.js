// Переключение меню
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuToggle.textContent = sidebar.classList.contains("open") ? "×" : "☰";
});

document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && event.target !== menuToggle) {
        sidebar.classList.remove("open");
        menuToggle.textContent = "☰";
    }
});

// Переключение темы
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
        themeToggle.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙";
    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "🌞";
    }
}

// Прокрутка товаров
document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    container.querySelector('.scroll-btn.left').addEventListener('click', () => 
        carousel.scrollBy({ left: -200, behavior: 'smooth' }));
    container.querySelector('.scroll-btn.right').addEventListener('click', () => 
        carousel.scrollBy({ left: 200, behavior: 'smooth' }));
});

// Избранное
document.addEventListener("DOMContentLoaded", function () {
    let favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

    function updateFavorites() {
        localStorage.setItem("favorites", JSON.stringify(favoriteItems));
        renderFavorites();
        updateFavoriteButtons();
    }

    function renderFavorites() {
        const favoriteList = document.getElementById("favorites-list");
        if (!favoriteList) return;

        favoriteList.innerHTML = "";

        // Убираем невалидные данные
        favoriteItems = favoriteItems.filter(item => item && item.id && item.name && item.price && item.img);
        localStorage.setItem("favorites", JSON.stringify(favoriteItems));

        favoriteItems.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("favorite-item");
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} - ${item.price}</p>
                <button class="remove-fav" data-id="${item.id}">❌</button>
            `;
            favoriteList.appendChild(div);
        });

        document.querySelectorAll(".remove-fav").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = String(this.dataset.id);
                favoriteItems = favoriteItems.filter(item => item.id !== id);
                updateFavorites();
            });
        });
    }

    function updateFavoriteButtons() {
        document.querySelectorAll(".fav-btn").forEach(btn => {
            const itemId = String(btn.dataset.id);
            const isFavorite = favoriteItems.some(item => item.id === itemId);
            btn.style.color = isFavorite ? "red" : "white";
        });
    }

    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.style.color = "white"; // Делаем все кнопки белыми изначально

        btn.addEventListener("click", function () {
            const itemId = String(this.dataset.id);
            const itemElement = this.closest(".item");

            // Проверяем, существуют ли элементы
            const imgElement = itemElement.querySelector("img");
            const nameElement = itemElement.querySelector(".product-name");
            const priceElement = itemElement.querySelector(".product-price");

            if (!imgElement || !nameElement || !priceElement) return;

            const item = {
                id: itemId,
                img: imgElement.src,
                name: nameElement.textContent.trim(),
                price: priceElement.textContent.trim()
            };

            const existingIndex = favoriteItems.findIndex(fav => fav.id === itemId);
            if (existingIndex === -1) {
                favoriteItems.push(item);
                this.style.color = "red"; // Меняем цвет на красный при добавлении в избранное
            } else {
                favoriteItems.splice(existingIndex, 1);
                this.style.color = "white"; // Возвращаем белый при удалении из избранного
            }

            updateFavorites();
        });
    });

    renderFavorites();
    updateFavoriteButtons();
});

// Открытие карточки
const overlay = document.querySelector(".overlay");
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.add("expanded");

        // Показываем размытие фона
        overlay.style.opacity = "1";
        overlay.style.visibility = "visible";
    });
});

// Закрытие при клике на оверлей
overlay.addEventListener("click", () => {
    document.querySelector(".item.expanded")?.classList.remove("expanded");
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("mousemove", function(event) {
    const ps5Image = document.querySelector(".ps5-image");
    let x = (window.innerWidth / 2 - event.pageX) / 50;
    let y = (window.innerHeight / 2 - event.pageY) / 50;

    ps5Image.style.transform = `translate(${x}px, ${y}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login-btn");
    
    if (localStorage.getItem("isLoggedIn") === "true") {
        loginBtn.textContent = "Выйти";
        loginBtn.onclick = function () {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        };
    }
});
