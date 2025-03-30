import React, { useState, useEffect } from 'react';

const PatientProfile = () => {
  // Mock patient data (replace with API call)
  const [patientData, setPatientData] = useState({
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
    gender: "male",
    phoneNumber: "+1 234-567-8900",
    email: "john.doe@example.com",
    preferredTime: "morning"
  });

  const [hospitalizations, setHospitalizations] = useState([
    {
      id: 1,
      diagnosis: "Acute Appendicitis",
      allergies: "Penicillin",
      admitDate: "2025-02-15",
      dischargeDate: "2025-02-20",
      dischargeInstructions: "Rest for 2 weeks"
    }
  ]);

  const [admissionData, setAdmissionData] = useState({
    diagnosis: "",
    allergies: "",
    admitDate: "",
  });

  const [dischargeData, setDischargeData] = useState({
    hospitalizationId: "",
    dischargeDate: "",
    dischargeInstructions: ""
  });

  const [callSchedule, setCallSchedule] = useState([
    {
      id: 1,
      hospitalizationId: 1,
      callDate: "2025-03-01",
      questions: ["pain", "medication"],
      called: true
    }
  ]);

  const [newCall, setNewCall] = useState({
    hospitalizationId: "",
    callDate: "",
    questions: [],
    called: false
  });

  const questionOptions = [
    { value: "pain", label: "Pain Assessment" },
    { value: "medication", label: "Medication Adherence" },
    { value: "symptoms", label: "New Symptoms" },
    { value: "followup", label: "Follow-up Appointments" },
    { value: "activity", label: "Daily Activities" }
  ];

  const handleAdmission = (e) => {
    e.preventDefault();
    const newHospitalization = {
      ...admissionData,
      id: Date.now(),
      dischargeDate: null,
      dischargeInstructions: null
    };
    setHospitalizations([...hospitalizations, newHospitalization]);
    setAdmissionData({ diagnosis: "", allergies: "", admitDate: "" });
  };

  const handleDischarge = (e) => {
    e.preventDefault();
    setHospitalizations(hospitalizations.map(hosp => 
      hosp.id === parseInt(dischargeData.hospitalizationId) 
        ? { ...hosp, ...dischargeData }
        : hosp
    ));
    setDischargeData({ hospitalizationId: "", dischargeDate: "", dischargeInstructions: "" });
  };

  const handleCallStatusUpdate = (callId, newStatus) => {
    setCallSchedule(callSchedule.map(call => 
      call.id === callId ? { ...call, called: newStatus } : call
    ));
  };

  const activeHospitalizations = hospitalizations.filter(h => !h.dischargeDate);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Profile</h1>

        {/* Personal Details Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg">
                {patientData.firstName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg">
                {patientData.lastName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg">
                {patientData.dateOfBirth}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg capitalize">
                {patientData.gender}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg">
                {patientData.phoneNumber}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
              <div className="text-lg text-gray-800 p-2 bg-gray-50 rounded-lg">
                {patientData.email}
              </div>
            </div>
          </div>
        </div>

        {/* Hospitalization History Table */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hospitalization History</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allergies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admit Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discharge Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hospitalizations.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-normal">{entry.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-normal">{entry.allergies}</td>
                    <td className="px-6 py-4">{entry.admitDate}</td>
                    <td className="px-6 py-4">{entry.dischargeDate}</td>
                    <td className="px-6 py-4 whitespace-normal">{entry.dischargeInstructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Admission Form */}
          <form onSubmit={handleAdmission} className="mt-8 space-y-4 border-t pt-6">
            <h3 className="text-xl font-medium text-gray-800 mb-4">New Admission</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Diagnosis</label>
                <input
                  type="text"
                  value={admissionData.diagnosis}
                  onChange={(e) => setAdmissionData({
                    ...admissionData,
                    diagnosis: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Allergies</label>
                <input
                  type="text"
                  value={admissionData.allergies}
                  onChange={(e) => setAdmissionData({
                    ...admissionData,
                    allergies: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Admit Date</label>
                <input
                  type="date"
                  value={admissionData.admitDate}
                  onChange={(e) => setAdmissionData({
                    ...admissionData,
                    admitDate: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Admission
              </button>
            </div>
          </form>

          {/* Discharge Form */}
          <form onSubmit={handleDischarge} className="mt-8 space-y-4 border-t pt-6">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Process Discharge</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Hospitalization</label>
                <select
                  value={dischargeData.hospitalizationId}
                  onChange={(e) => setDischargeData({
                    ...dischargeData,
                    hospitalizationId: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select admission</option>
                  {activeHospitalizations.map(hosp => (
                    <option key={hosp.id} value={hosp.id}>
                      {hosp.admitDate} - {hosp.diagnosis}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Discharge Date</label>
                <input
                  type="date"
                  value={dischargeData.dischargeDate}
                  onChange={(e) => setDischargeData({
                    ...dischargeData,
                    dischargeDate: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">Discharge Instructions</label>
                <textarea
                  value={dischargeData.dischargeInstructions}
                  onChange={(e) => setDischargeData({
                    ...dischargeData,
                    dischargeInstructions: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Process Discharge
              </button>
            </div>
          </form>
        </div>

        {/* Call Schedule Section */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post-Discharge Call Schedule</h2>
          
          {/* Call Schedule History Table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Call Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospitalization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {callSchedule.map((call) => {
                  const hosp = hospitalizations.find(h => h.id === call.hospitalizationId);
                  return (
                    <tr key={call.id}>
                      <td className="px-6 py-4">{call.callDate}</td>
                      <td className="px-6 py-4 whitespace-normal">
                        {hosp ? `${hosp.admitDate} - ${hosp.diagnosis}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        {call.questions.map(q => 
                          questionOptions.find(opt => opt.value === q)?.label
                        ).join(", ")}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleCallStatusUpdate(call.id, !call.called)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            call.called 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          {call.called ? 'Completed' : 'Pending'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Schedule New Call Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const newSchedule = {
              ...newCall,
              id: Date.now()
            };
            setCallSchedule([...callSchedule, newSchedule]);
            setNewCall({
              hospitalizationId: "",
              callDate: "",
              questions: [],
              called: false
            });
          }} className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Schedule New Call</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Hospitalization</label>
                <select
                  value={newCall.hospitalizationId}
                  onChange={(e) => setNewCall({
                    ...newCall,
                    hospitalizationId: parseInt(e.target.value)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select hospitalization</option>
                  {hospitalizations.map(hosp => (
                    <option key={hosp.id} value={hosp.id}>
                      {hosp.admitDate} - {hosp.diagnosis}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Call Date</label>
                <input
                  type="date"
                  value={newCall.callDate}
                  onChange={(e) => setNewCall({
                    ...newCall,
                    callDate: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Questions</label>
                <select
                  multiple
                  value={newCall.questions}
                  onChange={(e) => setNewCall({
                    ...newCall,
                    questions: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {questionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple questions</p>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newCall.called}
                    onChange={(e) => setNewCall({
                      ...newCall,
                      called: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-600">Call Completed</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Schedule Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;