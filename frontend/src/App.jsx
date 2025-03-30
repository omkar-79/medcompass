import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom"
import PatientForm from "./pages/PatientForm";
import MedicalForm from "./pages/MedicalForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addPatient' element={<PatientForm />} />
        <Route path='/medicalDetails' element={<MedicalForm />} />
      </Routes>
    </div>
  );
}

export default App;
