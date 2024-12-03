import React, { useEffect, useState } from "react";
import axios from "axios";
import  "../../shared-components/styles/OrderCard.scss";

interface OrderDto {
  orderHeaderId: number;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  user: any | null;
  orderTotal: number;
  orderDate: string;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
}

const OrderCards: React.FC = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const token = localStorage.getItem("token"); 
          if (!token) {
            throw new Error("No authentication token found"); 
          }
          
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

        const response = await axios.get("http://localhost:3000/api/order", config); 
        setOrders(response.data.result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-card-container">
      {orders.map((order) => (
        <div className="order-card" key={order.orderHeaderId}>
          <div className="order-header">Order #{order.orderHeaderId}</div>
          <div className="order-info">
            <div>
              <span className="info-label">Name:</span>{" "}
              <span className="info-value">{order.pickupName}</span>
            </div>
            <div>
              <span className="info-label">Phone:</span>{" "}
              <span className="info-value">{order.pickupPhoneNumber}</span>
            </div>
            <div>
              <span className="info-label">Email:</span>{" "}
              <span className="info-value">{order.pickupEmail}</span>
            </div>
            <div>
              <span className="info-label">Total Items:</span>{" "}
              <span className="info-value">{order.totalItems}</span>
            </div>
            <div>
              <span className="info-label">Order Date:</span>{" "}
              <span className="info-value">{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="order-total">Total: ${order.orderTotal.toFixed(2)}</div>
          <div className={`status ${order.status.toLowerCase()}`}>{order.status}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
