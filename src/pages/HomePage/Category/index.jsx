import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";

function Category({ image, name, id }) {
  const navigate = useNavigate();

  return (
    <div className="category">
      <Link className="category__link" to={`/products?category=${id}`}>
        {name}
      </Link>
      <img src={image} alt={`iamge of ${name}`} className="category__img" />
    </div>
  );
}

Category.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Category;
