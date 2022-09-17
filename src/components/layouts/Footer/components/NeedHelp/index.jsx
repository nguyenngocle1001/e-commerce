import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as EarphoneIcon } from "assets/icons/earphone.svg";

import "./style.scss";

function NeedHelp(props) {
  return (
    <div className="footer-need-help">
      <EarphoneIcon className="footer-need-help__icon" />

      <div className="footer-need-help__desc">
        <span className="footer-need-help__desc__text">Got Question?</span>
        <span className="footer-need-help__desc__value">+84 919823185</span>
      </div>
    </div>
  );
}

NeedHelp.propTypes = {};

export default NeedHelp;
