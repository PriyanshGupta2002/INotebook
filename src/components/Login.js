import React, { useState,useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";


const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const {showAlert}=props
    useEffect(() => {
        showAlert("Welcome to login page","primary")
        // eslint-disable-next-line
    }, [])
    let history = useHistory();
    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:80/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            showAlert("LoggedIn successfully","success")
            history.push("/");
        }
        else {
            showAlert("Error:Invalid Credentials Please check your Password or Email","danger")
        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 >Login To Use Inotebook</h1>
            <form onSubmit={handelSubmit} className="mx-2" style={{marginTop:"22px"}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}   name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password}   name="password" required />
                </div>
                <button type="submit" className="btn btn-outline-success" >Login</button>
                <div className="my-2">Don't have a account! <strong><Link to="/signup"> SignUp </Link></strong></div>
            </form>
        </div>
    )
}

export default Login
