from datetime import datetime
from backend.database.models.patient_model import Patient, insert_patient
from backend.database.models.medical_model import MedicalData, insert_medical_data
from backend.database.models.hospitalization_model import (
    Hospitalization,
    insert_hospitalization,
)
from backend.database.models.discharge_call_model import (
    DischargeCall,
    insert_discharge_call,
)
from backend.database.models.question_model import (
    QuestionCategory,
    insert_question_category,
    get_questions_by_category,
)
from backend.database.server import get_collection


def test_insert_flow():
    print("\nStarting test insert flow...\n")

    # Insert Patient
    patient = Patient(
        name="Test User",
        dob=datetime(1990, 1, 1),
        phone="+10000000000",
        gender="Other",
        language="English",
        email="testuser@example.com",
        address="456 Test Blvd",
        preferred_call_time="Morning",
    )
    patient_insert_result = insert_patient(patient)

    patient_doc = get_collection("patients").find_one({"_id": patient_insert_result})
    patient_id = patient_doc["patient_id"]
    print(f"Inserted patient with patient_id: {patient_id}")

    # Insert Medical Data
    medical = MedicalData(
        patient_id=patient_id, diseases=["TestDisease"], allergies=["TestAllergy"]
    )
    insert_medical_data(medical)
    print(f"Inserted medical data for patient_id: {patient_id}")

    # Insert Hospitalization
    hospitalization = Hospitalization(
        patient_id=patient_id,
        date=datetime(2024, 4, 1),
        reason="Test Procedure",
        follow_up_call_date=datetime(2024, 4, 15),
    )
    hosp_insert_result = insert_hospitalization(hospitalization)

    hosp_doc = get_collection("hospitalizations").find_one({"_id": hosp_insert_result})
    hospitalization_id = hosp_doc["hospitalization_id"]
    print(f"Inserted hospitalization with ID: {hospitalization_id}")

    # Insert Discharge Call
    discharge = DischargeCall(
        hospitalization_id=hospitalization_id,
        call_date=datetime(2024, 4, 20),
        called=False,
    )
    insert_discharge_call(discharge)
    print(f"Inserted discharge call for hospitalization_id: {hospitalization_id}")

    # Insert Question Category
    question_category = QuestionCategory(
        category="Cardiovascular Conditions",
        questions=[
            "Do you experience chest pain during physical activity?",
            "Do you have a history of high blood pressure?",
            "Are you on any heart medications?",
        ],
    )
    insert_question_category(question_category)
    print(f"Inserted question category: {question_category.category}")

    # Retrieve Questions
    fetched_questions = get_questions_by_category("Cardiovascular Conditions")
    print(f"Retrieved questions for category: {fetched_questions['category']}")
    for q in fetched_questions["questions"]:
        print(f"  - {q}")

    print("\nAll test inserts completed successfully!\n")


if __name__ == "__main__":
    test_insert_flow()
