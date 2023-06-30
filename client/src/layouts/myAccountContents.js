import React from "react";
import MyAccountLeftContents from "./myAccountLeftContents";
import MyAccountRightContents from "./myAccountRightContents";
const MyAccountContent = () => {
  
  return (
    <div>
      <div>
        <div className="page-section section section-padding">
          <div className="container">
            <div className="row mbn-30">
              {/* My Account Tab Menu Start */}
              <div className="col-lg-3 col-12 mb-30">
                <MyAccountLeftContents />
              </div>
              {/* My Account Tab Menu End */}
              {/* My Account Tab Content Start */}
              <div className="col-lg-9 col-12 mb-30">
                <MyAccountRightContents />
              </div>
              {/* My Account Tab Content End */}
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default MyAccountContent;
