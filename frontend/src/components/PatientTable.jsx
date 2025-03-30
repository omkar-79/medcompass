import React, { useState } from "react";

const PatientTable = () => {
  const [patients] = useState([
    { id: 1, firstName: "John", lastName: "Doe", phone: "1234567890", primaryDiagnosis: "Hypertension" },
    { id: 2, firstName: "Jane", lastName: "Smith", phone: "9876543210", primaryDiagnosis: "Diabetes" },
    { id: 3, firstName: "Alice", lastName: "Brown", phone: "4561237890", primaryDiagnosis: "Asthma" },
  ]);

  return (
    <div className="flex justify-center pt-10">
      <div className="w-3/4 overflow-x-auto">
        <div className="border border-gray-300 rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#20cc5c] text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-start text-md font-medium uppercase">Patient ID</th>
                <th className="px-6 py-3 text-start text-md font-medium uppercase">Patient Name</th>
                <th className="px-6 py-3 text-start text-md font-medium uppercase">Primary Diagnosis</th>
                <th className="px-6 py-3 text-start text-md font-medium uppercase">Phone</th>
                <th className="px-6 py-3 text-end text-md font-medium uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(patients) && patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id} className="odd:bg-white even:bg-[#e1f9e1] hover:bg-[#b2f5b2]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{patient.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{patient.primaryDiagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{patient.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#1adb5d] hover:bg-[#d0f7d0] hover:text-[#149c47] py-1 px-3"
                      >
                        View Patient
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan="5">
                    No patients available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
