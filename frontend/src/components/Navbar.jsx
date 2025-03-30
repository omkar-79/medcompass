import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-12">
      <div className="flex gap-20 px-20">
        <h1>NARAD</h1>
        <a href="#">Dashboard</a>
      </div>
      <div className="flex gap-10 px-20">
        <a href="#">Team</a>
        <Link to="#"
            className="bg-[#1adb5d]"
            >
            Devpost</Link>
      </div>
    </nav>
  );
};

export default Navbar;
