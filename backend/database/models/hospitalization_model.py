from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import random
from backend.database.server import insert_one, find_one, find_all, get_collection

COLLECTION_NAME = "hospitalizations"


# Pydantic model
class Hospitalization(BaseModel):
    hospitalization_id: Optional[str] = None
    patient_id: str
    date: datetime
    reason: str
    follow_up_call_date: datetime

    class Config:
        arbitrary_types_allowed = True


def generate_unique_hospitalization_id():
    """
    Generate a unique 6-digit hospitalization ID that does not exist in the collection.
    """
    hosp_col = get_collection(COLLECTION_NAME)
    while True:
        new_id = str(random.randint(100000, 999999))
        if not hosp_col.find_one({"hospitalization_id": new_id}):
            return new_id


def insert_hospitalization(hosp: Hospitalization):
    """
    Inserts a hospitalization record with a unique 6-digit hospitalization_id.
    References patient by custom 6-digit patient_id.
    """
    document = hosp.dict()

    # Generate hospitalization_id if not present
    if not document.get("hospitalization_id"):
        document["hospitalization_id"] = generate_unique_hospitalization_id()

    return insert_one(COLLECTION_NAME, document)


def get_hospitalization_by_id(hospitalization_id: str):
    """
    Retrieves a hospitalization record by custom hospitalization_id.
    """
    return find_one(COLLECTION_NAME, {"hospitalization_id": hospitalization_id})


def get_all_hospitalizations():
    """
    Retrieves all hospitalization records.
    """
    return find_all(COLLECTION_NAME)
