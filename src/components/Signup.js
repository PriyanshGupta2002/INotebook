import React,{useState,useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setcredentials] = useState({name:"",email:"",password:""})
    const {showAlert}=props
    useEffect(() => {
        showAlert("Welcome to SignUp Page","warning")
        // eslint-disable-next-line
    }, [])
    let history = useHistory();
const handelSubmit=async(e)=>{
    e.preventDefault();
            const response = await fetch("http://localhost:80/api/auth/createuser", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            });
            const json=await response.json()
            console.log( json)  
            if (json.success) {
                showAlert("Account Created Successfully","success")
                localStorage.setItem('token',json.authToken)
                history.push("/");
            } 
            else{
                showAlert("Sorry a user with same email already exists! Try signing in with a different email","warning")
            }
    
}
const onChange=(e)=>{
setcredentials({...credentials,[e.target.name]:e.target.value})
}
    return (
        <div>
            <h1 style={{marginLeft:"18px"}}>SignUp To Use Inotebook</h1>
        <div className="container " style={{marginTop:"18px"}}>
            <form onSubmit={handelSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" id="name"  onChange={onChange} value={credentials.name} minLength={2} name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}   name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange}  value={credentials.password} minLength={5} name="password" required />
                </div>
                <div className="d-flex flex-row justify-content-start">
                <button type="submit"  className="btn btn-outline-danger" >SignUp</button>
                </div>
                <div className="my-2">Already have an account? <strong><Link to="/login">Login</Link></strong></div>
            </form>
        </div>
        </div>
    )
}

export default Signup
