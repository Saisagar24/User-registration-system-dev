import React from "react";
import { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import  validation from  './LoginValidation';

function Login() {

      const [values, setVales] = useState({ email: "", password: "" });
      const [errors, setErros] = useState({})
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErros(validation(values))
        try {
          await axios.post("http://localhost:5000/login", values);
          alert("Registration successful!");
        } catch (err) {
          alert("Registration failed");
        }
      };
      const handleInput = (e) => {
        setVales(prev=> ({...prev, [e.target.name]: [e.target.value]}))
          };

    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder="Enter Email" onChange={handleInput} className="form-control rounded-0"/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder="Enter Password" onChange={handleInput} className="form-control rounded-0"/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                 <button type="submit" className="btn btn-success w-100">Login</button>  
                  <Link to="/Register"className="btn btn-default border w-100 bg-light text-decoration-none" >Register</Link>       
            </form>
        </div>
        </div>
    )
}

export default Login;