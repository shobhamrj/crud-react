import React, { useState, useEffect } from 'react';
import {BASE_URL} from "../constant";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export const Update = () => {
    const [order, setOrder] = useState(null);

    const navigate = useNavigate()

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
        console.log(order)
        event.preventDefault();
        axios.put(`${BASE_URL}/order/${localStorage.getItem('updateOrderId')}`,
            order,
            { headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
        )
            .then(() => {
                navigate('/read')
            })
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
                                    className="form-control m-2"
                                />
                                <input
                                    type="number"
                                    name={`food_items[${index}].quantity`}
                                    value={food.quantity}
                                    onChange={(e) => handleChange(e)}
                                    className="form-control m-2"
                                />
                                <input
                                    type="number"
                                    name={`food_items[${index}].unit_price`}
                                    value={food.unit_price}
                                    onChange={(e) => handleChange(e)}
                                    className="form-control m-2"
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
                        className="form-control m-2"
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

