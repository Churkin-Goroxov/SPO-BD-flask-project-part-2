from flask import Flask, render_template

app = Flask(__name__)


SPECIALIST = {
    "id": 1,
    "name": "Анна Петрова",
    "title": "Преподаватель английского языка",
    "format": "Онлайн",
    "location": "Москва",
    "rating": 4.9,
    "review_count": 27,
    "experience": 6,
    "price_from": 1500,
    "description": "Преподаватель английского языка с опытом индивидуальных занятий.",
    "verifications": ["Паспорт", "Диплом", "Видео"],
    "stats": [
        {"value": "6 лет", "label": "опыта"},
        {"value": "120+", "label": "учеников"},
        {"value": "98%", "label": "положительных отзывов"}
    ]
}

SERVICES = [
    {
        "name": "Индивидуальное занятие",
        "duration": 60,
        "price": 1500
    },
    {
        "name": "Пробное занятие",
        "duration": 30,
        "price": 0
    }
]

SCHEDULE = [
    {
        "weekday": "Пн",
        "date": "12 сентября",
        "day": 12,
        "slots": [
            {"time": "10:00", "available": True},
            {"time": "12:00", "available": True},
            {"time": "16:30", "available": True},
            {"time": "18:00", "available": False}
        ]
    },
    {
        "weekday": "Вт",
        "date": "13 сентября",
        "day": 13,
        "slots": [
            {"time": "11:00", "available": True},
            {"time": "15:00", "available": True}
        ]
    }
]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/search")
def search():
    return render_template("search.html")


@app.route("/how-it-works")
def how_it_works():
    return render_template("how_it_works.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/specialist/<int:specialist_id>")
def specialist(specialist_id):
    return render_template(
        "specialist.html",
        specialist=SPECIALIST,
        services=SERVICES,
        schedule=SCHEDULE
    )


@app.route("/schedule/<int:specialist_id>")
def schedule(specialist_id):
    return render_template(
        "schedule.html",
        specialist=SPECIALIST,
        services=SERVICES,
        schedule=SCHEDULE
    )


@app.route("/booking")
def booking():
    specialist = SPECIALIST
    service = SERVICES[0]

    return render_template(
        "booking.html",
        specialist=specialist,
        service=service,
        booking_date="12 сентября",
        booking_time="16:30"
    )


@app.route("/payment")
def payment():
    service = SERVICES[0]

    return render_template(
        "payment.html",
        service=service,
        booking_date="12 сентября",
        booking_time="16:30"
    )


@app.route("/success")
def success():
    return render_template("success.html")


if __name__ == "__main__":
    app.run(debug=True)
