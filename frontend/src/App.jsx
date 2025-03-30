import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom"
import PatientForm from "./pages/PatientForm";
import ScriptReport from "./pages/ScriptReport";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addPatient' element={<PatientForm />} />
        <Route path='/report' element={<ScriptReport />} />
      </Routes>
    </div>
  );
}

export default App;
