import os
import sys
import sched
import time
import json
from datetime import datetime, timedelta
from twilio.rest import Client
from dotenv import load_dotenv

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from database.scripts.call_script import get_call_scripts

# Load environment variables
load_dotenv()

# Twilio Credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
PUBLIC_SERVER_URL = os.getenv("PUBLIC_SERVER_URL")

# Initialize Twilio Client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Initialize Scheduler
scheduler = sched.scheduler(time.time, time.sleep)

# Call schedule (initial data)
call_schedule = [
    {'R0001': True, 'patient_number': '+18043977703', 'time': '2025-03-30 11:13'},
    {"patient_number": "+0987654321", "time": "2025-03-30 14:30"},
]

# Function to initiate a call
def make_call(patient_number):
    current_number = open("CALLREPORTID", "w")
    current_number.write(patient_number)
    call = client.calls.create(
        to=patient_number,
        from_=TWILIO_PHONE_NUMBER,
        url=f"{PUBLIC_SERVER_URL}/voice"
    )
    print(f"Call made to {patient_number} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - Call SID: {call.sid}")

# Function to update call schedule (dummy function for now)
def update_schedule():
    schedules = get_call_scripts()
    # schedules = json.loads(schedules)
    print(schedules)
    for patient in schedules:
        call_schedule.append({patient["call_report_id"]:True, "patient_number":patient["patient_number"], "time":patient["time"]})
    # Reschedule update task every 10 minutes
    scheduler.enter(600, 1, update_schedule)

# Function to schedule calls
def schedule_calls():
    # Schedule initial calls
    for entry in call_schedule:
        call_time = datetime.strptime(entry["time"], "%Y-%m-%d %H:%M")
        delay = (call_time - datetime.now()).total_seconds()
        
        if delay > 0:
            scheduler.enter(delay, 1, make_call, argument=(entry["patient_number"],))
            print(f"Scheduled call to {entry['patient_number']} at {call_time}")

    # Schedule periodic updates every 10 minutes
    scheduler.enter(10, 1, update_schedule)
    print("Updating schedule every 10 minutes.")

    # Start the scheduler
    scheduler.run()

if __name__ == "__main__":
    schedule_calls()
    # print(get_call_scripts)
