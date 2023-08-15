from app import app, bcrypt, db
from flask import session, request, jsonify
from app.models import User, Contestant, Bet
import stripe
import json

stripe.api_key = app.config['STRIPE_SK']

@app.route('/user', methods=['GET'])
def return_user():
    user = User.query.filter_by(id=session['user']).first()
    return user.return_json()

@app.route('/addpay', methods=['POST'])
def create_payment_intent():
    amount = request.json['amount']
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='inr'
        )
        return jsonify({'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route('/addmoney', methods=['POST'])
def addmoney():
    amount = request.json['amount']
    user = User.query.filter_by(id=session['user']).first()
    user.money += float(amount)
    db.session.add(user)
    db.session.commit()
    print(f"{amount} added to balance.")
    return jsonify(200)

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 404
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 403
    session["user"] = user.id
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
    session["user"] = new_user.id
    return jsonify({ "id": new_user.id, "email": new_user.email })

@app.route('/bet', methods=['POST'])
def bet():
    if not session['user']:
        return jsonify(403)
    amount = request.json['amount']
    betfor = request.json['position']
    print(betfor)
    user = User.query.filter_by(id=session['user']).first()
    if int(amount) <= int(user.money):
        user.money -= amount
        bet = Bet(user=session['user'], amount=amount, betFor=betfor)
        db.session.add(bet, user)
        contestant = Contestant.query.filter_by(name=betfor).first()
        print(contestant.id)
        contestant.bets += 1
        db.session.add(contestant)
        db.session.commit()
        print('BET SUCCESS')
        return jsonify(200)
    return jsonify(404)

    

@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.data
    event = None

    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        # Invalid payload
        return jsonify(success=False), 400

    # Handle specific event types
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object
        amount = payment_intent.amount / 100  # Convert from cents to your currency's unit

        # Now you have the 'amount', you can update the user's wallet balance in your database
        # Your wallet update logic here

    # Return a response to acknowledge receipt of the event
    return jsonify(success=True), 200

@app.route('/leaderboard')
def lb():
    contestants = [x.return_json() for x in Contestant.query.all()]
    return contestants

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(200)

if __name__ == "__main__":
    app.run(debug=True)