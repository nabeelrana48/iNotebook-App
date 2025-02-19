import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Navbar() {
  const history = useHistory()
  const handleLogout = ()=>{
    localStorage.removeItem("Token")
    history.push('/login')
  }
  let location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem("Token")?
          <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
          </form>:
          <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  )
}
