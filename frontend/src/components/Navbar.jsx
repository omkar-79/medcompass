import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-12">
      <div className="flex gap-20 px-10">
        <h1>NARAD</h1>
        <Link to="/report" className="hover:text-[#20cc5c]">
          Dashboard
        </Link>
      </div>
      <div className="flex justify-between items-center gap-10 px-10">
        <Link to='/addPatient'
            className="bg-[#20cc5c] hover:bg-[#149c47] text-white font-bold py-2 px-4 rounded">
          Add Patient
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
