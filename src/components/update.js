// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Link, useNavigate} from "react-router-dom";
//
// export const Update = () => {
//     const [id, setId] = useState(0)
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const history = useNavigate()
    // const handleUpdate = (e) => {
        // e.preventDefault()
        // axios
        //     .put(`https://6470ff4d3de51400f72537cc.mockapi.io/api/v1/react-crud/${id}`, {
        //         name: name,
        //         email: email
        //     })
        //     .then(() => {
        //         history('/read')
        //
        //     })
    // }

    // useEffect(() =>{
        // setId(localStorage.getItem('id'))
        // setName(localStorage.getItem('name'))
        // setEmail(localStorage.getItem('email'))
    // },[])

    // return (
        // <div>
        //     <h2> Update </h2>
        //     <form>
        //         <div className="mb-3">
        //             <label className="form-label">Name</label>
        //             <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}} />
        //         </div>
        //         <div className="mb-3">
        //             <label className="form-label">Email address</label>
        //             <input type="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        //         </div>
        //         <button type="submit" className="btn btn-primary mx-2" onClick={handleUpdate}> Update </button>
        //     </form>
        // </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import {BASE_URL} from "../constant";
import axios from "axios";
import {Link} from "react-router-dom";

export const Update = (props) => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axios
            .get(`${BASE_URL}/order/${localStorage.getItem('updateOrderId')}`,
                { headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
            )
            .then((res) => {
                setOrder(res.data)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update logic here (e.g., make a PUT API call)
        console.log('Updating order:', order);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    if (!order) return <div>Loading...</div>

    return (
        <div className="container">
            <h2 className="m-4">Update</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Order ID:</label>
                    <input
                        type="text"
                        name="order_id"
                        value={order.order_id}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Food Items:</label>
                    <ul className="list-group">
                        {order.food_items.map((food, index) => (
                            <li key={index} className="list-group-item">
                                <input
                                    type="text"
                                    name={`food_items[${index}].name`}
                                    value={food.name}
                                    onChange={(e) => handleChange(e)}
                                    className="form-control"
                                />
                                <input
                                    type="number"
                                    name={`food_items[${index}].quantity`}
                                    value={food.quantity}
                                    onChange={(e) => handleChange(e)}
                                    className="form-control"
                                />
                                <input
                                    type="number"
                                    name={`food_items[${index}].unit_price`}
                                    value={food.unit_price}
                                    onChange={(e) => handleChange(e)}
                                    className="form-control"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form-group">
                    <label>Total Price:</label>
                    <input
                        type="number"
                        name="total_price"
                        value={order.total_price}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-between m-4">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link to="/read">
                        <button className="btn btn-primary"> Back </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

