from app import app, bcrypt, db
from flask import session, request, jsonify
from app.models import User

@app.route('/user', methods=['GET'])
def return_user():
    user = User.query.filter_by(id=session['user']).first()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 404
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 403
    session["user_id"] = user.id
    return jsonify({ "id": user.id, "email": user.email })

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    username = request.json['username']
    password = request.json["password"]
    email_exists = User.query.filter_by(email=email).first() is not None
    username_exists = User.query.filter_by(username=username).first() is not None
    if email_exists:
        return jsonify({"error": "User already exists"}), 409
    if username_exists:
        return jsonify({"error": 'Username already exists.'}), 410
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, username=username)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return jsonify({ "id": new_user.id, "email": new_user.email })

@app.route('/logout')
def logout():
    session.pop('user', None)
    return 200

if __name__ == "__main__":
    app.run(debug=True)