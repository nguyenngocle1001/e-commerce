import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import "./style.scss";

function BreacrumbCustom({ data }) {
  return (
    <div className="container">
      <Breadcrumb className="breadcrumb">
        {data.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            className={item.current ? "current" : ""}
          >
            {item.href ? (
              <Link to={item.href}>
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <>
                {item.icon}
                {item.label}
              </>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default BreacrumbCustom;
