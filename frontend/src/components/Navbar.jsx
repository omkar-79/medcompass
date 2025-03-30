import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-12">
      <div className="flex gap-20 px-20">
        <h1>NARAD</h1>
        <Link to="#" className="">
          Dashboard
        </Link>
      </div>
      <div className="flex justify-between items-center gap-10 px-20">
        <a href="#">Team</a>
        <Link to="#" className="bg-[#20cc5c] py-2 rounded-2xl px-4">
          Devpost
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
