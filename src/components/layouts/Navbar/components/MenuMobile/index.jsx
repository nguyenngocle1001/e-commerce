import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function MenuMobile({ data, onClick, itemActive }) {
  const handleOnClick = (item) => {
    if (onClick) onClick(item);
  };

  return (
    <div className="navbar-menu-mobile">
      {data.map((item) => (
        <button
          className="navbar-menu-mobile__item"
          key={item.id}
          onClick={() => handleOnClick(item)}
        >
          {item.label}
        </button>
      ))}

      <span
        className="navbar-menu-mobile__line-active"
        style={{
          transform: `translateX(${itemActive.id * 100}%)`,
          width: `${100 / data.length}%`,
        }}
      ></span>
    </div>
  );
}

MenuMobile.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  itemActive: PropTypes.object.isRequired,
};

export default MenuMobile;
