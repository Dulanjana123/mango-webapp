import React from "react";
import OrderCards from "./OrderCards";
import SummaryStats from "./SummaryStats";
import SalesChart from "./SalesChart";
import { withAuth } from "../../hoc";

const Dashboard: React.FC = () => {

  return (
    <div className="dashboard-container">
      {/* Summary Section  */}
      <div className="summary-section">
        <SummaryStats />
      </div>

      {/* Weekly Chart  */}
      <div className="chart-section">
        <SalesChart />
      </div>

      {/* Recent Orders */}
      <div className="orders-section">
        <h2>Recent Orders</h2>
        <OrderCards />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
