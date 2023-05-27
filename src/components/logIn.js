import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../constant";

const header = {"Access-Control-Allow_origin": "*"}

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios
            .post(
                `${BASE_URL}/login`,
                {
                    'email': email,
                    'password': password,
                    header
                })
            .then((res) => {
                localStorage.setItem('token', res.data.access_token)
                navigation("/read")
            })
    }

    return (
        <div>
            <div className="d-flex justify-content-between m-4">
                <h2> Log In </h2>
                <Link to="/signup">
                    <button className="btn btn-primary"> Sign Up </button>
                </Link>
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}