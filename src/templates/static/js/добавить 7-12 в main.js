/* =========================================================
   PAGES 7–12
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE 7 — PAYMENT
       ===================================================== */

    const paymentPage =
        document.querySelector(".payment-page");

    if (paymentPage) {

        const paymentMethods =
            paymentPage.querySelectorAll("[data-payment-method]");

        const cardForm =
            paymentPage.querySelector("[data-card-form]");

        const submitButton =
            paymentPage.querySelector("[data-payment-submit]");

        let selectedMethod = "card";

        paymentMethods.forEach((method) => {

            method.addEventListener("click", () => {

                paymentMethods.forEach((item) => {
                    item.classList.remove("is-selected");
                });

                method.classList.add("is-selected");

                selectedMethod =
                    method.dataset.paymentMethod;

                if (cardForm) {
                    cardForm.style.display =
                        selectedMethod === "card"
                            ? "block"
                            : "none";
                }
            });

        });

        if (submitButton) {

            submitButton.addEventListener("click", () => {

                if (selectedMethod === "card") {

                    const cardNumber =
                        paymentPage.querySelector(
                            '[name="card_number"]'
                        );

                    const expiry =
                        paymentPage.querySelector(
                            '[name="card_expiry"]'
                        );

                    const cvc =
                        paymentPage.querySelector(
                            '[name="card_cvc"]'
                        );

                    if (!cardNumber.value.trim()) {
                        showToast("Введите номер карты");
                        cardNumber.focus();
                        return;
                    }

                    if (!expiry.value.trim()) {
                        showToast("Введите срок действия");
                        expiry.focus();
                        return;
                    }

                    if (!cvc.value.trim()) {
                        showToast("Введите CVC");
                        cvc.focus();
                        return;
                    }
                }

                const params =
                    new URLSearchParams({
                        specialist: getQueryParameter(
                            "specialist",
                            "1"
                        ),

                        service: getQueryParameter(
                            "service",
                            "1"
                        ),

                        date: getQueryParameter(
                            "date",
                            "12 сентября"
                        ),

                        time: getQueryParameter(
                            "time",
                            "16:30"
                        )
                    });

                window.location.href =
                    `/success?${params.toString()}`;
            });
        }
    }


    /* =====================================================
       PAGE 10 — LOGIN
       ===================================================== */

    const loginForm =
        document.querySelector("[data-login-form]");

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email =
                loginForm.querySelector('[name="email"]');

            const password =
                loginForm.querySelector('[name="password"]');

            if (!email.value.trim()) {
                showToast("Введите email");
                email.focus();
                return;
            }

            if (!isValidEmail(email.value)) {
                showToast("Проверьте email");
                email.focus();
                return;
            }

            if (!password.value.trim()) {
                showToast("Введите пароль");
                password.focus();
                return;
            }

            showToast("Вход выполнен");

            setTimeout(() => {
                window.location.href = "/profile";
            }, 700);
        });
    }


    /* =====================================================
       PAGE 11 — REGISTER
       ===================================================== */

    const registerForm =
        document.querySelector("[data-register-form]");

    if (registerForm) {

        registerForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                registerForm.querySelector('[name="name"]');

            const email =
                registerForm.querySelector('[name="email"]');

            const password =
                registerForm.querySelector('[name="password"]');

            const passwordConfirm =
                registerForm.querySelector(
                    '[name="password_confirm"]'
                );

            const terms =
                registerForm.querySelector('[name="terms"]');

            if (!name.value.trim()) {
                showToast("Введите имя");
                name.focus();
                return;
            }

            if (!email.value.trim()) {
                showToast("Введите email");
                email.focus();
                return;
            }

            if (!isValidEmail(email.value)) {
                showToast("Проверьте email");
                email.focus();
                return;
            }

            if (!password.value.trim()) {
                showToast("Введите пароль");
                password.focus();
                return;
            }

            if (password.value.length < 6) {
                showToast(
                    "Пароль должен содержать минимум 6 символов"
                );
                password.focus();
                return;
            }

            if (password.value !== passwordConfirm.value) {
                showToast("Пароли не совпадают");
                passwordConfirm.focus();
                return;
            }

            if (!terms.checked) {
                showToast("Примите правила сервиса");
                return;
            }

            showToast("Аккаунт создан");

            setTimeout(() => {
                window.location.href = "/profile";
            }, 700);
        });
    }


    /* =====================================================
       PAGE 12 — PROFILE
       ===================================================== */

    const profilePage =
        document.querySelector(".profile-page");

    if (profilePage) {

        const editButton =
            profilePage.querySelector("[data-edit-profile]");

        if (editButton) {

            editButton.addEventListener("click", () => {
                showToast(
                    "Редактирование профиля будет доступно позже"
                );
            });
        }
    }


    /* =====================================================
       COMMON FUNCTIONS
       ===================================================== */

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }


    function getQueryParameter(name, fallback) {

        const params =
            new URLSearchParams(window.location.search);

        return params.get(name) || fallback;
    }


    function showToast(message) {

        const toast =
            document.querySelector("[data-toast]");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("is-visible");

        clearTimeout(showToast.timeout);

        showToast.timeout =
            setTimeout(() => {
                toast.classList.remove("is-visible");
            }, 2500);
    }

});
