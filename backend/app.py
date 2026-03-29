from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS

from config import Config
from models import Application, User, db

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)


def now_string():
    return datetime.now().strftime("%d/%m/%Y, %I:%M:%S %p")


def seed_demo_user():
    demo_email = "hire-me@anshumat.org"

    existing_user = User.query.filter_by(email=demo_email).first()
    if existing_user:
        existing_application = Application.query.filter_by(user_id=existing_user.id).first()
        if not existing_application:
            application = Application(
                user_id=existing_user.id,
                full_name=existing_user.name,
                dob=existing_user.dob,
                mobile=existing_user.phone,
                email=existing_user.email,
                status="Draft",
                last_saved_at=now_string(),
            )
            db.session.add(application)
            db.session.commit()
        return

    demo_user = User(
        name="Demo User",
        email=demo_email,
        phone="9999999999",
        dob="2000-01-01",
        city="Bengaluru",
        password="HireMe@2025!",
    )
    db.session.add(demo_user)
    db.session.commit()

    demo_application = Application(
        user_id=demo_user.id,
        full_name=demo_user.name,
        dob=demo_user.dob,
        mobile=demo_user.phone,
        email=demo_user.email,
        gender="",
        birth_city="",
        birth_state="",
        birth_country="India",
        father_name="",
        mother_name="",
        guardian_name="",
        marital_status="",
        spouse_name="",
        status="Draft",
        last_saved_at=now_string(),
    )
    db.session.add(demo_application)
    db.session.commit()


with app.app_context():
    db.create_all()
    seed_demo_user()


@app.route("/")
def home():
    return "Flask backend is running"


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    phone = (data.get("phone") or "").strip()
    dob = (data.get("dob") or "").strip()
    city = (data.get("city") or "").strip()
    password = data.get("password") or ""

    if not name or not email or not phone or not dob or not password:
        return jsonify({"error": "Please fill all required fields."}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    user = User(
        name=name,
        email=email,
        phone=phone,
        dob=dob,
        city=city,
        password=password,
    )
    db.session.add(user)
    db.session.commit()

    application = Application(
        user_id=user.id,
        full_name=name,
        dob=dob,
        mobile=phone,
        email=email,
        status="Draft",
        last_saved_at=now_string(),
    )
    db.session.add(application)
    db.session.commit()

    return jsonify(
        {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "dob": user.dob,
                "city": user.city,
            },
        }
    ), 201


@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.get_json() or {}

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify(
        {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "dob": user.dob,
                "city": user.city,
            },
        }
    ), 200


@app.route("/api/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "dob": user.dob,
            "city": user.city,
        }
    )


@app.route("/api/application/<int:user_id>", methods=["GET"])
def get_application(user_id):
    application = Application.query.filter_by(user_id=user_id).first()

    if not application:
        return jsonify({"error": "Application not found"}), 404

    return jsonify(
        {
            "personal": {
                "fullName": application.full_name or "",
                "dob": application.dob or "",
                "gender": application.gender or "",
                "mobile": application.mobile or "",
                "email": application.email or "",
                "birthCity": application.birth_city or "",
                "birthState": application.birth_state or "",
                "birthCountry": application.birth_country or "",
                "fatherName": application.father_name or "",
                "motherName": application.mother_name or "",
                "guardianName": application.guardian_name or "",
                "maritalStatus": application.marital_status or "",
                "spouseName": application.spouse_name or "",
            },
            "address": {
                "addressLine1": application.address_line1 or "",
                "addressLine2": application.address_line2 or "",
                "city": application.city or "",
                "state": application.state or "",
                "pincode": application.pincode or "",
            },
            "identity": {
                "aadhaar": application.aadhaar or "",
                "pan": application.pan or "",
                "passportType": application.passport_type or "",
                "reason": application.reason or "",
            },
            "appointment": {
                "center": application.appointment_center or "",
                "date": application.appointment_date or "",
                "slot": application.appointment_slot or "",
            },
            "status": application.status or "Draft",
            "applicationId": application.application_id or "",
            "submittedAt": application.submitted_at or "",
            "lastSavedAt": application.last_saved_at or "",
        }
    )


@app.route("/api/application/<int:user_id>", methods=["PUT"])
def update_application(user_id):
    application = Application.query.filter_by(user_id=user_id).first()

    if not application:
        return jsonify({"error": "Application not found"}), 404

    data = request.get_json() or {}

    personal = data.get("personal", {}) or {}
    address = data.get("address", {}) or {}
    identity = data.get("identity", {}) or {}
    appointment = data.get("appointment", {}) or {}

    application.full_name = personal.get("fullName", application.full_name)
    application.dob = personal.get("dob", application.dob)
    application.gender = personal.get("gender", application.gender)
    application.mobile = personal.get("mobile", application.mobile)
    application.email = personal.get("email", application.email)

    application.birth_city = personal.get("birthCity", application.birth_city)
    application.birth_state = personal.get("birthState", application.birth_state)
    application.birth_country = personal.get("birthCountry", application.birth_country)
    application.father_name = personal.get("fatherName", application.father_name)
    application.mother_name = personal.get("motherName", application.mother_name)
    application.guardian_name = personal.get("guardianName", application.guardian_name)
    application.marital_status = personal.get("maritalStatus", application.marital_status)
    application.spouse_name = personal.get("spouseName", application.spouse_name)

    application.address_line1 = address.get("addressLine1", application.address_line1)
    application.address_line2 = address.get("addressLine2", application.address_line2)
    application.city = address.get("city", application.city)
    application.state = address.get("state", application.state)
    application.pincode = address.get("pincode", application.pincode)

    application.aadhaar = identity.get("aadhaar", application.aadhaar)
    application.pan = identity.get("pan", application.pan)
    application.passport_type = identity.get("passportType", application.passport_type)
    application.reason = identity.get("reason", application.reason)

    application.appointment_center = appointment.get("center", application.appointment_center)
    application.appointment_date = appointment.get("date", application.appointment_date)
    application.appointment_slot = appointment.get("slot", application.appointment_slot)

    application.last_saved_at = now_string()

    db.session.commit()

    return jsonify(
        {
            "message": "Application updated successfully",
            "lastSavedAt": application.last_saved_at,
        }
    )


@app.route("/api/application/<int:user_id>/submit", methods=["POST"])
def submit_application(user_id):
    application = Application.query.filter_by(user_id=user_id).first()

    if not application:
        return jsonify({"error": "Application not found"}), 404

    application.status = "Submitted"
    application.application_id = f"PASS-{int(datetime.now().timestamp())}"
    application.submitted_at = now_string()
    application.last_saved_at = now_string()

    db.session.commit()

    return jsonify(
        {
            "message": "Application submitted successfully",
            "applicationId": application.application_id,
            "submittedAt": application.submitted_at,
            "lastSavedAt": application.last_saved_at,
        }
    )