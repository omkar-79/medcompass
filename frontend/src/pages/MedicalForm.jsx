import React, { useState } from "react";

const MedicalForm = () => {
  const [medicalData, setMedicalData] = useState({
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    allergies: "",
    reasonForAdmit: "",
    dischargeInstructions: "",
    followUpDate: "",
    followUpTime: "",
  });

  const handleChange = (e) => {
    setMedicalData({ ...medicalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Medical Data Submitted:", medicalData);
    // Send medicalData to backend here
  };

  return (
    <div className="flex justify-center pt-20">
      <form onSubmit={handleSubmit} className="w-full max-w-1/2 p-6 shadow-md rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-8">Add Medical Data</h2>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Primary Diagnosis
          </label>
          <select
            name="primaryDiagnosis"
            value={medicalData.primaryDiagnosis}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
            required
          >
            <option value="">Select Primary Diagnosis</option>
            <option value="Spinal Cord Injury">Spinal Cord Injury</option>
            <option value="Traumatic Brain Injury (TBI)">Traumatic Brain Injury (TBI)</option>
            <option value="Multiple Sclerosis Flare-ups">Multiple Sclerosis Flare-ups</option>
            <option value="Status Epilepticus">Status Epilepticus</option>
            <option value="Severe Stroke">Severe Stroke</option>
            <option value="Metastasis-related Complications">Metastasis-related Complications</option>
            <option value="Pain Management">Pain Management</option>
            <option value="Surgical Post-Op Recovery">Surgical Post-Op Recovery</option>
            <option value="Chemotherapy or Radiation Therapy Complications">Chemotherapy or Radiation Therapy Complications</option>
            <option value="Acute Respiratory Distress Syndrome (ARDS)">Acute Respiratory Distress Syndrome (ARDS)</option>
            <option value="Asthma Attack">Asthma Attack</option>
            <option value="Pneumonia">Pneumonia</option>
            <option value="Chronic Obstructive Pulmonary Disease (COPD) Exacerbation">Chronic Obstructive Pulmonary Disease (COPD) Exacerbation</option>
            <option value="Diabetic Foot Ulcer Infection">Diabetic Foot Ulcer Infection</option>
            <option value="Severe Hypoglycemia">Severe Hypoglycemia</option>
            <option value="Hyperosmolar Hyperglycemic State (HHS)">Hyperosmolar Hyperglycemic State (HHS)</option>
            <option value="Diabetic Ketoacidosis (DKA)">Diabetic Ketoacidosis (DKA)</option>
            <option value="Hypertensive Crisis">Hypertensive Crisis</option>
            <option value="Stroke (Cerebrovascular Accident)">Stroke (Cerebrovascular Accident)</option>
            <option value="Arrhythmias (e.g., atrial fibrillation)">Arrhythmias (e.g., atrial fibrillation)</option>
            <option value="Congestive Heart Failure (CHF)">Congestive Heart Failure (CHF)</option>
            <option value="Acute Myocardial Infarction (Heart Attack)">Acute Myocardial Infarction (Heart Attack)</option>
            <option value="Knee Replacement Surgery">Knee Replacement Surgery</option>
            <option value="Ligament Repair">Ligament Repair</option>
            <option value="Meniscus Repair">Meniscus Repair</option>
            <option value="Patellar Tendon Repair">Patellar Tendon Repair</option>
            <option value="Cartilage Restoration">Cartilage Restoration</option>
            <option value="Knee Arthroscopy">Knee Arthroscopy</option>
            <option value="Carpal Tunnel Release Surgery">Carpal Tunnel Release Surgery</option>
            <option value="Tendon Repair">Tendon Repair</option>
            <option value="Fracture Repair">Fracture Repair</option>
            <option value="Ganglion Cyst Removal">Ganglion Cyst Removal</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Secondary Diagnosis
          </label>
          <input
            type="text"
            name="secondaryDiagnosis"
            value={medicalData.secondaryDiagnosis}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
          />
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={medicalData.allergies}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
          />
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Reason for Admission
          </label>
          <textarea
            name="reasonForAdmit"
            value={medicalData.reasonForAdmit}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Discharge Instructions
          </label>
          <textarea
            name="dischargeInstructions"
            value={medicalData.dischargeInstructions}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
          />
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Follow-up Appointment Date
          </label>
          <input
            type="date"
            name="followUpDate"
            value={medicalData.followUpDate}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
          />
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Follow-up Appointment Time
          </label>
          <input
            type="time"
            name="followUpTime"
            value={medicalData.followUpTime}
            onChange={handleChange}
            className="appearance-none block w-full bg-[#e1f9e1] text-gray-700 border border-[#1adb5d] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#149c47]"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-[#1adb5d] text-white px-10 py-2 rounded-md hover:bg-[#149c47]"
          >
            Submit Medical Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalForm;
