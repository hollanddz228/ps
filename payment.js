document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM загружен!");

    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function () {
            const item = this.closest(".item");
            const productName = item.querySelector(".product-name").textContent.trim();
            const productPrice = item.querySelector(".product-price").textContent.trim();

            openPaymentModal(productName, productPrice);
        });
    });
});

function openPaymentModal(productName, productPrice) {
    const modalHTML = `
        <div class="payment-overlay">
            <div class="payment-modal">
                <h2>Вы уверены, что хотите купить <br> "${productName}" за ${productPrice}?</h2>
                <div class="payment-options">
                    <button class="payment-method" data-method="kaspi-gold">Kaspi Gold</button>
                    <button class="payment-method" data-method="kaspi-red">Kaspi Red</button>
                    <button class="payment-method" data-method="kaspi-qr">Kaspi QR</button>
                    <button class="payment-method" data-method="card">Банковская карта</button>
                </div>
                <button class="close-payment">Отмена</button>
                <div class="payment-content"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    
    const paymentOverlay = document.querySelector(".payment-overlay");
    const closeButton = document.querySelector(".close-payment");

    // Закрытие окна
    closeButton.addEventListener("click", () => paymentOverlay.remove());

    // Выбор способа оплаты
    document.querySelectorAll(".payment-method").forEach(button => {
        button.addEventListener("click", function () {
            const method = this.dataset.method;
            handlePaymentMethod(method, productName, productPrice);
        });
    });

    console.log("✅ payment-modal создан:", document.querySelector(".payment-modal"));
}

// 🔍 **Отслеживание появления `.payment-modal`**
const observer = new MutationObserver(() => {
    const modal = document.querySelector(".payment-modal");
    if (modal) {
        console.log("✅ payment-modal появился в DOM:", modal);
        observer.disconnect(); // Останавливаем наблюдение
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function handlePaymentMethod(method, productName, productPrice) {
    const paymentContent = document.querySelector(".payment-content");
    
    if (method === "kaspi-qr") {
        paymentContent.innerHTML = `
            <h3>Сканируйте QR-код Kaspi для оплаты</h3>
            <img src="images/abylll.png" alt="Kaspi QR">
        `;
    } else if (method === "card") {
        paymentContent.innerHTML = `
            <h3>Введите данные карты</h3>
            <input type="text" placeholder="Номер карты" class="card-number">
            <input type="text" placeholder="Срок (MM/YY)" class="card-expiry">
            <input type="text" placeholder="CVC" class="card-cvc">
            <button class="confirm-payment">Оплатить</button>
        `;

        document.querySelector(".confirm-payment").addEventListener("click", () => {
            // Здесь должна быть логика проверки данных карты и оплаты
            alert("Оплата прошла успешно! Спасибо за покупку!");
            document.querySelector(".payment-overlay").remove();
        });
    } else {
        alert(`Оплата через ${method.toUpperCase()} прошла успешно!`);
        document.querySelector(".payment-overlay").remove();
    }
}

console.log("Файл payment.js загружен!");
