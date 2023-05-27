import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../constant";

const header = {"Access-Control-Allow_origin": "*"}

export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                `${BASE_URL}/signup`,
                {
                    'name': name,
                    'email': email,
                    'password': password,
                    header
                })
            .then(() => {
                navigation("/login")
            })
    }

    return (
        <div>
            <h2 className="m-4"> Sign Up </h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}