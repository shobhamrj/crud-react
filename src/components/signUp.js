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
            <div className="d-flex justify-content-between m-4">
                <h2> Sign Up </h2>
                <Link to="/">
                    <button className="btn btn-primary"> Log In </button>
                </Link>
            </div>
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