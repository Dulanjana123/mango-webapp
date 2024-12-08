import React, { useEffect, useState } from "react";
import { orderHeader } from "../../types/interfaces";
import { useGetAllOrdersQuery } from "../../app/services/api/orderService";
import { MainLoader } from "../../app/layout/Page/ProductItems/Common";

const OrderCards: React.FC = () => {

  const {data, isLoading, error} = useGetAllOrdersQuery({pageSize : 6})
  const [orders, setOrders] = useState<orderHeader[]>([]);

  useEffect(() => {
        if(data?.result){
          setOrders(data.result);
        }
  }, [data]);

  if(isLoading) return <MainLoader/>
  if(error) return <div>Error loading orders</div>

  return (
    <div className="order-card-container">

      {orders?.length > 0 ? (orders.map((order) => (
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
      ))) : (
        <div>No data to dispaly</div>
      ) }

      
    </div>
  );
};

export default OrderCards;
