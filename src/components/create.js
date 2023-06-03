import React, { useState } from 'react';
import axios from "axios";
import {BASE_URL} from "../constant";
import {Link, useNavigate} from "react-router-dom";
export const Create = () => {
    const [order, setOrder] = useState({
        food_items: [{ name: '', quantity: '', unit_price: '' }],
        total_price: ''
    });

    const navigate = useNavigate()

    const handleAddForm = () => {
        setOrder(prevOrder => ({
            ...prevOrder,
            food_items: [...prevOrder.food_items, { name: '', quantity: '', unit_price: '' }]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(
            `${BASE_URL}/order`,
            order,
            {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }})
            .then(() =>{
                navigate('/read')
            })
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        if (name.startsWith('food_items')) {
            const foodItems = [...order.food_items];
            foodItems[index] = {
                ...foodItems[index],
                [name.split('.')[1]]: value
            };
            setOrder(prevOrder => ({
                ...prevOrder,
                food_items: foodItems
            }));
        } else {
            setOrder(prevOrder => ({
                ...prevOrder,
                [name]: value
            }));
        }
    };

    return (
        <div className="container">
            <h2 className="m-4">Create New</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Food Items:</label>
                    <ul className="list-group">
                        {order.food_items.map((food, index) => (
                            <li key={index} className="list-group-item">
                                <input
                                    placeholder="Food Name"
                                    type="text"
                                    name={`food_items[${index}].name`}
                                    value={food.name}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className="form-control m-2"
                                />
                                <input
                                    placeholder="Food Quantity"
                                    type="number"
                                    name={`food_items[${index}].quantity`}
                                    value={food.quantity}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className="form-control m-2"
                                />
                                <input
                                    placeholder="Food price"
                                    type="number"
                                    name={`food_items[${index}].unit_price`}
                                    value={food.unit_price}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className="form-control m-2"
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        onClick={handleAddForm}>
                        Add Item
                    </button>
                </div>
                <div className="form-group">
                    <label>Total Price:</label>
                    <input
                        placeholder="Total Price"
                        type="number"
                        name="total_price"
                        value={order.total_price}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-between m-4">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/read">
                        <button className="btn btn-primary"> Back </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
