import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  validation from  './RegisterValidation';

const Register = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleInput = (e) => {
    setValues(prev=> ({...prev, [e.target.name]: [e.target.value]}))
      };

  const [errors, setErros] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErros(validation(values))
    if (errors.name === "" && errors.email==="" &&  errors.password==="") {
      axios.post("http://localhost:5000/register", values)
      .then(res => console.log(res))
    .catch(err=> console.log(err));
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder="Enter Name" onChange={handleInput} name="name" className="form-control rounded-0"/>
                {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email" onChange={handleInput}  name="email" className="form-control rounded-0"/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password" onChange={handleInput} name = "password" className="form-control rounded-0"/>
                {errors.password && <span className="text-danger">{errors.password}</span>}
            </div> 
            <button type="submit" className="btn btn-success w-100">Register</button>       
        </form>
    </div>
    </div>
  );
};

export default Register;