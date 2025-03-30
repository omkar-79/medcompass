import React from 'react';
import './ScriptReport.css';

const ScriptReport = () => {
  // This would typically come from your API/backend
  const reportData = {
    reportId: "REP123456",
    patientName: "John Doe",
    hospitalizationReason: "Post-surgery recovery - Hip replacement",
    dischargeDate: "2025-03-25",
    questions: [
      {
        question: "How would you rate your pain level today?",
        response: "Mild pain, manageable with prescribed medication"
      },
      {
        question: "Are you able to perform basic movements as instructed?",
        response: "Yes, can perform most movements with minimal assistance"
      },
      {
        question: "Have you experienced any unusual symptoms?",
        response: "No unusual symptoms reported"
      }
    ]
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <h1 className="report-title">Script Report</h1>

        <div className="info-grid">
          <div className="info-section">
            <div className="info-item">
              <label>Report ID</label>
              <span>{reportData.reportId}</span>
            </div>
            <div className="info-item">
              <label>Patient Name</label>
              <span>{reportData.patientName}</span>
            </div>
          </div>
          <div className="info-section">
            <div className="info-item">
              <label>Hospitalization Reason</label>
              <span>{reportData.hospitalizationReason}</span>
            </div>
            <div className="info-item">
              <label>Discharge Date</label>
              <span>{reportData.dischargeDate}</span>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <h2 className="section-title">Patient Responses</h2>

        <div className="questions-list">
          {reportData.questions.map((item, index) => (
            <div key={index} className="question-card">
              <h3>Question {index + 1}:</h3>
              <p className="question-text">{item.question}</p>
              <label>Response:</label>
              <p className="response-text">{item.response}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptReport;