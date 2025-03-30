from pydantic import BaseModel
from typing import List
from backend.database.server import insert_one, find_one, find_all

COLLECTION_NAME = "medical_data"


class MedicalData(BaseModel):
    patient_id: str
    diseases: List[str]
    allergies: List[str]

    class Config:
        arbitrary_types_allowed = True


def insert_medical_data(medical: MedicalData):
    """
    Inserts medical data into the 'medical_data' collection using custom patient_id.
    """
    return insert_one(COLLECTION_NAME, medical.dict())


def get_medical_data_by_patient_id(patient_id: str):
    """
    Retrieves medical data by custom 6-digit patient_id.
    """
    return find_one(COLLECTION_NAME, {"patient_id": patient_id})


def get_all_medical_data():
    """
    Retrieves all medical data documents.
    """
    return find_all(COLLECTION_NAME)
