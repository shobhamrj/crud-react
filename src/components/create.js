import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const header = {"Access-Control-Allow_origin": "*"}

export const Create = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigation = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
            'https://6470ff4d3de51400f72537cc.mockapi.io/api/v1/react-crud',
            {
                'name': name,
                'email': email,
                header
            })
            .then(() => {
                navigation("/read")
            })
    }

    return (
        <div>
            <div className="d-flex justify-content-between m-4">
                <h2> Create </h2>
                <Link to="/read">
                    <button className="btn btn-primary"> Show Data </button>
                </Link>
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}