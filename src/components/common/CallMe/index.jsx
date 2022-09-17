import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function CallMe(props) {
  return (
    <marquee behavior="alternate">
      <div className="callme">
        <span className="callme__text">
          If you have any questions, please give us a call
        </span>
        <span className="callme__phone">0919823185</span>
      </div>
    </marquee>
  );
}

CallMe.propTypes = {};

export default CallMe;
