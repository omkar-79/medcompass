import os
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse, Gather
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get public server URL from environment variable
PUBLIC_SERVER_URL = os.getenv("PUBLIC_SERVER_URL")

app = Flask(__name__)

# List of predefined questions
questions = [
    "What is your current health condition?",
    "Are you experiencing any pain or discomfort?",
    "Have you taken your prescribed medication today?"
]
# Store call states
call_sessions = {}

def is_question(response):
    """Simple heuristic to check if the response is a question."""
    question_words = {"who", "what", "where", "when", "why", "how", "is", "can", "does", "do", "are", "could", "would", "should"}
    
    # Convert response to lowercase for case-insensitive matching
    words = response.lower().strip().split()

    # Check if the first word is a question word or if the response ends with "?"
    if words and (words[0] in question_words or response.strip().endswith("?")):
        return True
    return False

@app.route("/voice", methods=["POST"])
def voice():
    """Handles the initial call interaction."""
    response = VoiceResponse()
    gather = Gather(num_digits=1, action="/handle-availability", method="POST")
    gather.say("Hello! Are you available to answer a few questions? Press 1 for yes, 2 for no.")
    response.append(gather)
    response.say("We did not receive any input. Goodbye!")
    return str(response)

@app.route("/handle-availability", methods=["POST"])
def handle_availability():
    """Processes patient's availability response."""
    response = VoiceResponse()
    digits = request.form.get("Digits")

    if digits == "1":
        call_sid = request.form.get("CallSid")
        call_sessions[call_sid] = {"question_index": 0}  # Initialize session
        return ask_question(call_sid)

    elif digits == "2":
        gather = Gather(input="speech", action="/handle-reschedule", method="POST")
        gather.say("Please say a date that works for you.")
        response.append(gather)
        response.say("We did not receive any input. Goodbye!")
        return str(response)

    else:
        response.say("Invalid input. Goodbye!")
        return str(response)

@app.route("/handle-reschedule", methods=["POST"])
def handle_reschedule():
    """Handles rescheduling request."""
    response = VoiceResponse()
    date_response = request.form.get("SpeechResult")
    response.say(f"Thank you! We will call you back on {date_response}. Goodbye!")
    return str(response)

@app.route("/ask-question", methods=["POST"])
def ask_question(call_sid=None):
    """Asks the next question dynamically from the list."""
    response = VoiceResponse()
    call_sid = call_sid or request.form.get("CallSid")

    if call_sid not in call_sessions:
        response.say("Session expired. Goodbye!")
        return str(response)

    session = call_sessions[call_sid]
    index = session["question_index"]

    if index < len(questions):
        gather = Gather(input="speech", action="/record-answer", method="POST")
        gather.say(questions[index])
        response.append(gather)
        response.say("We did not receive any input. Goodbye!")
    else:    
        response.say("Thank you for your responses. Have a great day! 2")
    
    return str(response)

@app.route("/record-answer", methods=["POST"])
def record_answer():
    """Records the answer and proceeds to the next question or handles patient questions."""
    response = VoiceResponse()
    call_sid = request.form.get("CallSid")
    
    if call_sid not in call_sessions:
        response.say("Session expired. Goodbye!")
        return str(response)

    session = call_sessions[call_sid]
    index = session["question_index"]
    answer = request.form.get("SpeechResult")
    
    print(f"Q{index+1}: {questions[index]}")
    print(f"Answer: {answer}")

    # Check if the answer is a question
    user_queries = is_question(answer)
    if user_queries:
        print("User asked a question")
        response.say("Your question has been noted. We will get back to you soon.")
    else:
        session["question_index"] += 1  # Move to the next question

    if session["question_index"] < len(questions):
        return ask_question(call_sid)  # Ask the next question
    else:
        if user_queries:
            response.say("Your questions and queries have been noted. Your healthcare provider will address them as soon as they can. Thank you for your responses, have a great day!")
        else:
            response.say("Thank you for your responses. Have a great day! 1")
        return str(response)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
