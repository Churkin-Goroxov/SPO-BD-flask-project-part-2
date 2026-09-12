document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE 4 — SPECIALIST
       ===================================================== */

    const specialistPage = document.querySelector(".specialist-page");

    if (specialistPage) {
        const favoriteButton =
            specialistPage.querySelector("[data-favorite]");

        const serviceOptions =
            specialistPage.querySelectorAll("[data-service-id]");

        const bookingButton =
            specialistPage.querySelector("[data-specialist-booking]");

        const selectedServiceName =
            specialistPage.querySelector("[data-selected-service-name]");

        const selectedServicePrice =
            specialistPage.querySelector("[data-selected-service-price]");

        let selectedServiceId = null;

        if (serviceOptions.length) {
            const firstService = serviceOptions[0];

            selectService(firstService);

            serviceOptions.forEach((service) => {
                service.addEventListener("click", () => {
                    selectService(service);
                });
            });
        }

        function selectService(service) {
            serviceOptions.forEach((item) => {
                item.classList.remove("is-selected");
            });

            service.classList.add("is-selected");

            selectedServiceId = service.dataset.serviceId;

            if (selectedServiceName) {
                selectedServiceName.textContent =
                    service.dataset.serviceName;
            }

            if (selectedServicePrice) {
                selectedServicePrice.textContent =
                    service.dataset.servicePrice;
            }
        }

        if (favoriteButton) {
            favoriteButton.addEventListener("click", () => {
                favoriteButton.classList.toggle("is-active");

                const isActive =
                    favoriteButton.classList.contains("is-active");

                favoriteButton.textContent =
                    isActive ? "♥" : "♡";

                showToast(
                    isActive
                        ? "Специалист добавлен в избранное"
                        : "Специалист удалён из избранного"
                );
            });
        }

        if (bookingButton) {
            bookingButton.addEventListener("click", () => {
                if (!selectedServiceId) {
                    showToast("Выберите услугу");
                    return;
                }

                window.location.href =
                    `/schedule?specialist=1&service=${selectedServiceId}`;
            });
        }
    }


    /* =====================================================
       PAGE 5 — SCHEDULE
       ===================================================== */

    const schedulePage = document.querySelector(".schedule-page");

    if (schedulePage) {
        const scheduleDataElement =
            schedulePage.querySelector("[data-schedule]");

        let scheduleData = [];

        if (scheduleDataElement) {
            try {
                scheduleData =
                    JSON.parse(scheduleDataElement.dataset.schedule);
            } catch (error) {
                scheduleData = [];
            }
        }

        const dateButtons =
            schedulePage.querySelectorAll("[data-schedule-date]");

        const timeContainer =
            schedulePage.querySelector("[data-schedule-times]");

        const serviceOptions =
            schedulePage.querySelectorAll("[data-schedule-service]");

        const selectedDateElement =
            schedulePage.querySelector("[data-selected-date]");

        const selectedTimeElement =
            schedulePage.querySelector("[data-selected-time]");

        const selectedServiceElement =
            schedulePage.querySelector("[data-selected-service]");

        const selectedPriceElement =
            schedulePage.querySelector("[data-selected-price]");

        const continueButton =
            schedulePage.querySelector("[data-schedule-continue]");

        let selectedDate = null;
        let selectedTime = null;
        let selectedService = null;

        if (serviceOptions.length) {
            selectScheduleService(serviceOptions[0]);

            serviceOptions.forEach((service) => {
                service.addEventListener("click", () => {
                    selectScheduleService(service);
                });
            });
        }

        function selectScheduleService(service) {
            serviceOptions.forEach((item) => {
                item.classList.remove("is-selected");
            });

            service.classList.add("is-selected");

            selectedService = {
                id: service.dataset.serviceId,
                name: service.dataset.serviceName,
                price: service.dataset.servicePrice
            };

            if (selectedServiceElement) {
                selectedServiceElement.textContent =
                    selectedService.name;
            }

            if (selectedPriceElement) {
                selectedPriceElement.textContent =
                    selectedService.price;
            }
        }

        if (dateButtons.length) {
            selectDate(dateButtons[0]);

            dateButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    selectDate(button);
                });
            });
        }

        function selectDate(button) {
            dateButtons.forEach((item) => {
                item.classList.remove("is-selected");
            });

            button.classList.add("is-selected");

            selectedDate =
                button.dataset.scheduleDate;

            selectedTime = null;

            if (selectedDateElement) {
                selectedDateElement.textContent =
                    selectedDate;
            }

            if (selectedTimeElement) {
                selectedTimeElement.textContent =
                    "Не выбрано";
            }

            renderTimes(selectedDate);
        }

        function renderTimes(date) {
            if (!timeContainer) return;

            const day = scheduleData.find(
                (item) => item.date === date
            );

            timeContainer.innerHTML = "";

            if (!day || !day.times || !day.times.length) {
                const empty = document.createElement("div");
                empty.className = "schedule-empty";
                empty.textContent =
                    "На этот день свободного времени нет.";
                timeContainer.appendChild(empty);
                return;
            }

            day.times.forEach((timeItem) => {
                const button =
                    document.createElement("button");

                button.type = "button";
                button.className = "schedule-time";
                button.textContent =
                    typeof timeItem === "string"
                        ? timeItem
                        : timeItem.time;

                const occupied =
                    typeof timeItem !== "string" &&
                    timeItem.available === false;

                if (occupied) {
                    button.classList.add("is-occupied");
                    button.disabled = true;
                }

                button.addEventListener("click", () => {
                    timeContainer
                        .querySelectorAll(".schedule-time")
                        .forEach((item) => {
                            item.classList.remove("is-selected");
                        });

                    button.classList.add("is-selected");

                    selectedTime = button.textContent;

                    if (selectedTimeElement) {
                        selectedTimeElement.textContent =
                            selectedTime;
                    }
                });

                timeContainer.appendChild(button);
            });
        }

        if (continueButton) {
            continueButton.addEventListener("click", () => {
                if (!selectedService) {
                    showToast("Выберите услугу");
                    return;
                }

                if (!selectedDate) {
                    showToast("Выберите дату");
                    return;
                }

                if (!selectedTime) {
                    showToast("Выберите время");
                    return;
                }

                const params = new URLSearchParams({
                    specialist: "1",
                    service: selectedService.id,
                    date: selectedDate,
                    time: selectedTime
                });

                window.location.href =
                    `/booking?${params.toString()}`;
            });
        }
    }


    /* =====================================================
       PAGE 6 — BOOKING
       ===================================================== */

    const bookingPage =
        document.querySelector(".booking-page");

    if (bookingPage) {
        const form =
            bookingPage.querySelector("[data-booking-form]");

        const paymentButton =
            bookingPage.querySelector("[data-booking-payment]");

        if (paymentButton && form) {
            paymentButton.addEventListener("click", () => {

                const name =
                    form.querySelector('[name="name"]');

                const email =
                    form.querySelector('[name="email"]');

                const phone =
                    form.querySelector('[name="phone"]');

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

                if (!phone.value.trim()) {
                    showToast("Введите номер телефона");
                    phone.focus();
                    return;
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
                        ),

                        name: name.value.trim(),

                        email: email.value.trim(),

                        phone: phone.value.trim()
                    });

                window.location.href =
                    `/payment?${params.toString()}`;
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
