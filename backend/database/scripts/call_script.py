from backend.database.server import get_collection


def get_call_scripts():
    """
    Returns a full call script combining:
    - patient_number
    - call time
    - list of questions for that patient's category

    Example output:
    [
        {
            "patient_number": "+1234567890",
            "time": "2025-03-30 02:00",
            "questions": [ ... ]
        },
        ...
    ]
    """
    patients_col = get_collection("patients")
    medical_col = get_collection("medical_data")
    discharge_col = get_collection("post_discharge_calls")
    questions_col = get_collection("questions")

    result = []

    # Get all patients with their IDs and phone numbers
    patients = patients_col.find({}, {"patient_id": 1, "phone": 1, "_id": 0})

    for patient in patients:
        patient_id = patient.get("patient_id")
        phone = patient.get("phone")

        # Get hospitalization_id from medical_data
        medical_doc = medical_col.find_one({"patient_id": patient_id})
        if not medical_doc:
            continue
        hospitalization_id = medical_doc.get("hospitalization_id")
        if not hospitalization_id:
            continue

        # Get call_date and category from discharge calls
        discharge_doc = discharge_col.find_one(
            {"hospitalization_id": hospitalization_id}
        )
        if not discharge_doc:
            continue
        call_date = discharge_doc.get("call_date", "")
        category = discharge_doc.get("category", "")

        # Get questions from the category
        question_doc = questions_col.find_one({"category": category})
        questions = question_doc.get("questions", []) if question_doc else []

        # Combine into result
        result.append(
            {"patient_number": phone, "time": call_date, "questions": questions}
        )

    return result


if __name__ == "__main__":
    call_script = get_call_scripts()
    print("📞 Call Script:")
    for entry in call_script:
        print(f"\nPatient: {entry['patient_number']}")
        print(f"Time: {entry['time']}")
        print("Questions:")
        for q in entry["questions"]:
            print(f" - {q}")
