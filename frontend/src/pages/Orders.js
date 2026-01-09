import React, { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Error loading orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <p className="font-semibold">
                Order ID: {order._id}
              </p>
              <p>Total: ₹{order.totalAmount}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
