from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import random
from backend.database.server import insert_one, find_one, find_all, get_collection

COLLECTION_NAME = "post_discharge_calls"


class DischargeCall(BaseModel):
    discharge_call_id: Optional[str] = None
    hospitalization_id: str
    call_date: datetime
    called: bool

    class Config:
        arbitrary_types_allowed = True


def generate_unique_discharge_call_id():
    """
    Generate a unique 6-digit discharge_call_id.
    """
    col = get_collection(COLLECTION_NAME)
    while True:
        new_id = str(random.randint(100000, 999999))
        if not col.find_one({"discharge_call_id": new_id}):
            return new_id


def insert_discharge_call(discharge: DischargeCall):
    """
    Inserts a post-discharge call record with a unique discharge_call_id.
    """
    document = discharge.dict()

    if not document.get("discharge_call_id"):
        document["discharge_call_id"] = generate_unique_discharge_call_id()

    return insert_one(COLLECTION_NAME, document)


def get_discharge_call_by_id(discharge_call_id: str):
    """
    Retrieves a discharge call record by its unique discharge_call_id.
    """
    return find_one(COLLECTION_NAME, {"discharge_call_id": discharge_call_id})


def get_all_discharge_calls():
    """
    Retrieves all post-discharge call records.
    """
    return find_all(COLLECTION_NAME)
