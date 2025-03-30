import os
import sched
import time
from datetime import datetime
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Twilio Credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
PUBLIC_SERVER_URL = os.getenv("PUBLIC_SERVER_URL")

# List of call schedules (datetime format: "YYYY-MM-DD HH:MM")
call_schedule = [
    {"patient_number": "+1234567890", "time": "2025-03-30 02:00"},
    {"patient_number": "+0987654321", "time": "2025-03-30 14:30"},
]

# Initialize Twilio Client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Initialize Scheduler
scheduler = sched.scheduler(time.time, time.sleep)

# Function to initiate a call
def make_call(patient_number):
    call = client.calls.create(
        to=patient_number,
        from_=TWILIO_PHONE_NUMBER,
        url=f"{PUBLIC_SERVER_URL}/voice"
    )
    print(f"Call made to {patient_number} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - Call SID: {call.sid}")

# Function to schedule calls
def schedule_calls():
    for entry in call_schedule:
        call_time = datetime.strptime(entry["time"], "%Y-%m-%d %H:%M")
        delay = (call_time - datetime.now()).total_seconds()
        
        if delay > 0:
            scheduler.enter(delay, 1, make_call, argument=(entry["patient_number"],))
            print(f"Scheduled call to {entry['patient_number']} at {call_time}")

    scheduler.run()

if __name__ == "__main__":
    schedule_calls()
