import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientForm from './pages/PatientForm';
import PatientProfile from './pages/PatientProfile';
import ScriptReport from './pages/ScriptReport';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addPatient" element={<PatientForm />} />
      <Route path="/profile/:patientId" element={<PatientProfile />} />
      <Route path="/report" element={<ScriptReport />} />
    </Routes>
  );
}

export default App;
