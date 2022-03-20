import React from 'react'
import { Link, useLocation,useHistory } from "react-router-dom";

  

const Navbar = () => {

    let history=useHistory()
    const onHandleOut=()=>{
        localStorage.removeItem('token')
        history.push('/login')    
    }

    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    { !localStorage.getItem('token')? <form className="d-flex"> 
                    <Link className="btn btn-outline-success mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-outline-danger" to="/signup" role="button">Signup</Link>
                    </form>: <form className="d-flex"> 
                    <Link className="btn btn-outline-success mx-2" onClick={onHandleOut} to="#" role="button">Logout</Link>
                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar