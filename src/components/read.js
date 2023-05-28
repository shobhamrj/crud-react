import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../constant";

export const Read = () => {
    const [orders, setOrders] = useState([])
    const history = useNavigate();

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios
            .get(
                `${BASE_URL}/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            .then((res) => {
                setOrders(res.data)
            })
    }

    const handleDelete = (id) => {
        axios
            .delete(`${BASE_URL}/order/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            .then(() => {
                getData()
            })
    }

    const handleUpdate = (orderId) => {
        localStorage.setItem('updateOrderId', orderId)
        history(`/update`);

    };

    return (
        <div>
            <div className="d-flex justify-content-between m-4">
                <h2> View </h2>
                <Link to="/create">
                    <button className="btn btn-primary"> Create </button>
                </Link>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Food Items</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>
                            <ul>
                                {order.food_items.map((food, index) => (
                                    <li key={index}>
                                        {food.name} (Quantity: {food.quantity}, Unit Price: {food.unit_price})
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>{order.total_price}</td>
                        <td>
                            <button className="btn btn-primary m-2" onClick={() => handleUpdate(order.order_id)}>
                                Update
                            </button>
                            <button className="btn btn-danger m-2" onClick={() => handleDelete(order.order_id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

