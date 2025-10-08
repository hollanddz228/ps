document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
});

function loadUserData() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (!user) {
        alert("Вы не авторизованы!");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-balance").textContent = user.balance || "0₸";

    loadPurchaseHistory();
    loadFavorites();
}

// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Вы вышли из аккаунта!");
    window.location.href = "index.html";
}

// История покупок
function loadPurchaseHistory() {
    const purchases = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const purchaseList = document.getElementById("purchase-history");
    purchaseList.innerHTML = purchases.length ? purchases.map(p => `<li>${p}</li>`).join('') : "<p>Нет покупок</p>";
}

// Избранное
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favList = document.getElementById("favorites");
    favList.innerHTML = "";

    if (favorites.length === 0) {
        favList.innerHTML = "<p>Нет избранного</p>";
        return;
    }

    favorites.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("favorite-item");

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <p style="color: gray;">${item.price}</p>
        `;

        favList.appendChild(div);
    });
}



// Редактирование профиля
function openSettings() {
    document.getElementById("settings-modal").style.display = "block";
}

function closeSettings() {
    document.getElementById("settings-modal").style.display = "none";
}

function saveSettings() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    user.name = document.getElementById("edit-name").value || user.name;
    user.email = document.getElementById("edit-email").value || user.email;
    if (document.getElementById("edit-password").value) {
        user.password = document.getElementById("edit-password").value;
    }
    user.notifications = document.getElementById("notifications").checked;

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Данные сохранены!");
    window.location.reload();
}

// Изменение аватара
document.getElementById("avatar-upload").addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("avatar").src = e.target.result;
        localStorage.setItem("userAvatar", e.target.result);
    };
    reader.readAsDataURL(file);
});

const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
    document.getElementById("avatar").src = savedAvatar;
}

document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
    loadAvatar();  // Загрузим аватар при загрузке страницы
});

function loadAvatar() {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
        document.getElementById("avatar").src = savedAvatar;  // Устанавливаем аватар из localStorage
    }
}

document.getElementById("avatar-upload").addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("avatar").src = e.target.result;
        localStorage.setItem("userAvatar", e.target.result);  // Сохраняем аватар в localStorage
    };
    reader.readAsDataURL(file);
});
