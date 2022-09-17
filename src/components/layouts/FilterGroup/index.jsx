import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function FilterGroup({ children, title }) {
  return (
    <div className="filter-group">
      <h3 className="filter-group__name">{title}</h3>

      <div className="filter-group__body">{children}</div>
    </div>
  );
}

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterGroup;
