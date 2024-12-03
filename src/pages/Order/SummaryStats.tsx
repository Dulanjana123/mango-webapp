import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryStats: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get("http://localhost:3000/api/order", config);
      const orders = response.data.result;
      setTotalOrders(orders.length);
      setTotalRevenue(orders.reduce((sum: number, order: any) => sum + order.orderTotal, 0));
    };

    fetchStats();
  }, []);

  return (
    <div className="summary-stats">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>{totalOrders}</p>
      </div>
      <div className="stat-card">
        <h3>Total Revenue</h3>
        <p>${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SummaryStats;


