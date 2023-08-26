import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalOrderChart } from "../../charts/e-commerce/EcomCharts";
import { orderData } from "../../../table/TableData";

const Orders = ({ ordersData }) => {
  // console.log(ordersData);
  return (
    <Card>
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Orders</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{ordersData.length}</div>
            </div>
          </div>
        </div>
        <div className="nk-ecwg3-ck">
          <TotalOrderChart ordersData={ordersData} />
        </div>
      </div>
    </Card>
  );
};
export default Orders;
