import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom"
import PatientForm from "./pages/PatientForm";

import PatientProfile from "./pages/PatientProfile"
import ScriptReport from "./components/ScriptReport";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addPatient' element={<PatientForm />} />
        <Route path='/report' element={<ScriptReport />} />
        <Route path='/profile' element={<PatientProfile />} />
      </Routes>
    </div>
  );
}

export default App;
