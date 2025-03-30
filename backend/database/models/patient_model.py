from pydantic import BaseModel, EmailStr
from datetime import datetime
import random

from backend.database.server import insert_one, find_one, find_all, get_collection

COLLECTION_NAME = "patients"


class Patient(BaseModel):
    patient_id: str = None
    name: str
    dob: datetime
    phone: str
    gender: str
    language: str
    email: EmailStr
    address: str
    preferred_call_time: str

    class Config:
        arbitrary_types_allowed = True


def generate_unique_patient_id():
    """
    Generate a unique 6-digit patient ID that does not exist in the collection.
    """
    patients_col = get_collection(COLLECTION_NAME)
    while True:
        new_id = str(random.randint(100000, 999999))
        if not patients_col.find_one({"patient_id": new_id}):
            return new_id


def insert_patient(patient: Patient):
    """
    Inserts a new patient document into the 'patients' collection.
    Automatically generates a unique 6-digit patient_id if not provided.
    """
    patient_dict = patient.dict()

    # Generate patient_id if not provided
    if not patient_dict.get("patient_id"):
        patient_dict["patient_id"] = generate_unique_patient_id()

    return insert_one(COLLECTION_NAME, patient_dict)


def get_patient_by_patient_id(patient_id: str):
    """
    Retrieves a patient document by custom 6-digit patient_id.
    """
    return find_one(COLLECTION_NAME, {"patient_id": patient_id})


def get_all_patients():
    """
    Retrieves all patient documents from the 'patients' collection.
    """
    return find_all(COLLECTION_NAME)
