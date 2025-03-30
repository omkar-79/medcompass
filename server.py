import os
from flask import Flask, request
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Flask route to handle recorded response
@app.route("/handle-recording", methods=["POST"])
def handle_recording():
    recording_url = request.form.get("RecordingUrl")
    print(f"Patient response recorded at: {recording_url}")
    return "Recorded successfully", 200

# Twilio XML Response to handle call
@app.route("/voice", methods=["POST"])
def voice():
    return """<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Say voice="alice">Hello! Please answer the following question after the beep. What is your current health condition?</Say>
        <Record maxLength="30" action="/handle-recording" />
    </Response>"""

if __name__ == "__main__":
    app.run(port=5000, debug=True)