from flask import Flask, request, jsonify, render_template
from chatbot_logic import get_response

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")  # Serves the frontend HTML file

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    response = get_response(user_input)
    return jsonify({"response": response})

#Hey 😊<br> 
#This is a simple Chatbot.<br>
# Start a conversation with the bot!

if __name__ == "__main__":
    app.run(debug=True)
