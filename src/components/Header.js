import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="bg-gold py-3">
      <div className="container d-flex justify-content-between">
        <div className="logo">
          <h1 className="text-white">LOGO</h1>
        </div>
        <div>
          <button className="btn btn-dark">Back</button>
        </div>
      </div>
    </header>
  );
}

export default Header;