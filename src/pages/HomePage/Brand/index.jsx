import React from "react";
import PropTypes from "prop-types";

import "./style.scss";
import { Link } from "react-router-dom";

function Brand({ name }) {
  return (
    <div className="brand">
      <Link to={`/products?brand=${name}`} className="brand__name">
        {name}
      </Link>
    </div>
  );
}

Brand.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Brand;
