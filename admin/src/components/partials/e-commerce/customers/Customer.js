import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalCustomerChart } from "../../charts/e-commerce/EcomCharts";

const Customer = ({ ordersData }) => {
  console.log(ordersData);

  const uniqueCustomerIds = new Set();

  // Iterate through ordersData to extract unique customer IDs
  ordersData.forEach((order) => {
    uniqueCustomerIds.add(order.customerInfo._id);
  });

  // Convert the Set to an array to get the count of unique customers
  const uniqueCustomerCount = uniqueCustomerIds.size;
  return (
    <Card>
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Customers</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{uniqueCustomerCount}</div>
            </div>
          </div>
        </div>
        <div className="nk-ecwg3-ck">
          <TotalCustomerChart />
        </div>
      </div>
    </Card>
  );
};
export default Customer;
