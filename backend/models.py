from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    dob = db.Column(db.String(20))
    city = db.Column(db.String(100))
    password = db.Column(db.String(200), nullable=False)


class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    full_name = db.Column(db.String(120))
    dob = db.Column(db.String(20))
    gender = db.Column(db.String(20))
    mobile = db.Column(db.String(20))
    email = db.Column(db.String(120))

    birth_city = db.Column(db.String(100))
    birth_state = db.Column(db.String(100))
    birth_country = db.Column(db.String(100))
    father_name = db.Column(db.String(120))
    mother_name = db.Column(db.String(120))
    guardian_name = db.Column(db.String(120))
    marital_status = db.Column(db.String(50))
    spouse_name = db.Column(db.String(120))

    address_line1 = db.Column(db.String(200))
    address_line2 = db.Column(db.String(200))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    pincode = db.Column(db.String(20))

    aadhaar = db.Column(db.String(30))
    pan = db.Column(db.String(30))
    passport_type = db.Column(db.String(50))
    reason = db.Column(db.String(200))

    appointment_center = db.Column(db.String(200))
    appointment_date = db.Column(db.String(50))
    appointment_slot = db.Column(db.String(50))

    status = db.Column(db.String(50), default="Draft")
    application_id = db.Column(db.String(50))
    submitted_at = db.Column(db.String(50))
    last_saved_at = db.Column(db.String(50))