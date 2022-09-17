import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./style.scss";

function FormLink({ text, href, textAlign }) {
  return (
    <Link to={href} className="form-link" style={{ textAlign }}>
      {text}
    </Link>
  );
}

FormLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  textAlign: PropTypes.string,
};

FormLink.defaultProps = {
  href: "",
  textAlign: "right",
};

export default FormLink;
