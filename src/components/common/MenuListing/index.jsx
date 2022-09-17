import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

import "./style.scss";

function MenuListing({ data, isNavLink, className, onClick }) {
  const handleOnClick = (item) => {
    if (onClick) onClick(item);
  };

  return (
    <ul className={`menu-listing ${className}`}>
      {data.map((item, index) => (
        <li
          className="menu-listing__item"
          key={index}
          onClick={() => handleOnClick(item)}
        >
          {item.render ? (
            item.render(item)
          ) : isNavLink ? (
            <NavLink className="menu-listing__link" to={item.href}>
              {item.label}
            </NavLink>
          ) : (
            <Link className="menu-listing__link" to={item.href}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

MenuListing.propTypes = {
  data: PropTypes.array.isRequired,
  isNavLink: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

MenuListing.defaultProps = {
  isNavLink: true,
  className: "",
  onClick: () => {},
};

export default MenuListing;
