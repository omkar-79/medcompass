import os
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Twilio Credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
PATIENT_PHONE_NUMBER = os.getenv("PATIENT_PHONE_NUMBER")

# Initialize Twilio Client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Function to initiate a call
def make_call():
    call = client.calls.create(
        to=PATIENT_PHONE_NUMBER,
        from_=TWILIO_PHONE_NUMBER,
        url="https://de46-192-112-253-19.ngrok-free.app/voice"  # Replace with your actual public server URL
    )
    print(f"Call initiated: {call.sid}")

if __name__ == "__main__":
    make_call()
