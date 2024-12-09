import React, { useEffect, useState } from "react";
import axios from "axios";
import chalk from 'chalk';
import { useGetAllOrdersQuery, useGetDashboardDetailsQuery } from "../../app/services/api/orderService";

const SummaryStats: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const {data} = useGetDashboardDetailsQuery({});

  useEffect(() => {
      if(data?.result){
        const orders = data?.result;
        setTotalOrders(orders.length);
        setTotalRevenue(orders.reduce((sum: number, order: any) => sum + order.orderTotal, 0));
      }

    console.log(chalk.blue.bgRed.bold('Hello world!'));
  }, [data]);

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


