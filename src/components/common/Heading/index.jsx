import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Heading({ heading, desc, className }) {
  return (
    <>
      <div className={`heading ${className}`}>
        {heading && <h3 className="heading__value">{heading}</h3>}
        {desc && <span className="heading__desc">{desc}</span>}
      </div>
    </>
  );
}

Heading.propTypes = {
  heading: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: "",
};

export default Heading;
