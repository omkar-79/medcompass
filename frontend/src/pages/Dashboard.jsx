import React from 'react'
import { Link } from 'react-router-dom'
import PatientTable from '../components/PatientTable'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-end px-30">
        <Link to='/addPatient'
            className="bg-[#20cc5c] hover:bg-[#149c47] text-white font-bold py-2 px-4 rounded">
          Add Patient
        </Link>
      </div>
      <PatientTable />
    </div>
  )
}

export default Dashboard
