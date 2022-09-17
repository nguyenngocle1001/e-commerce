import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./style.scss";

function Information({ title, data }) {
  return (
    <div className="footer-information">
      <h3 className="footer-information__title">{title}</h3>
      <ul className="footer-information__list">
        {data.map((item, index) => (
          <li key={index} className="footer-information__item">
            {item.type === "link" && (
              <Link className="footer-information__link" to={item.href}>
                {item.label}
              </Link>
            )}
            {item.type === "component" && item.component}
            {item.type === "text" && (
              <span className="footer-information__text">{item.label}</span>
            )}
            {item.type === "email" && (
              <span className="footer-information__text no-capitalize">
                {item.label}
              </span>
            )}
            {item.type === "divider" && (
              <hr className="footer-information__divider" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Information.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Information;
