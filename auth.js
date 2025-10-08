function register() {
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("Пользователь с таким email уже зарегистрирован!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация успешна! Теперь войдите в аккаунт.");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Неправильный email или пароль!");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Вы успешно вошли!");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    updateUserUI();
});

function updateUserUI() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (user) {
        document.getElementById("login-button").style.display = "none";
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-name").style.display = "inline";
        document.getElementById("logout-button").style.display = "inline";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Вы вышли из аккаунта!");
    window.location.reload();
}

document.querySelector(".login-btn").addEventListener("click", function () {
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Проверяем пользователя из localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => (u.email === email || u.phone === email) && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Вход выполнен успешно!");
        window.location.href = "profile.html"; // 🔁 Переход в ЛК
    } else {
        alert("Неверный email или пароль!");
    }
});

