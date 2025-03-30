import React from 'react'
import { Link } from 'react-router-dom'
import PatientTable from '../components/PatientTable'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-end pt-10 px-30">
        <Link to='/addPatient'
            className="bg-blue-500 text-white px-10 py-3 rounded-md hover:bg-blue-600">
          Add Patient
        </Link>
      </div>
      <PatientTable />
    </div>
  )
}

export default Dashboard