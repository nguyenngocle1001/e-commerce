import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import useLockBodyScroll from "hooks/layouts/useLockBodyScroll";

function BackDrop({ visible, children, ...rest }) {
  return visible && <BackDropContent {...rest}>{children}</BackDropContent>;
}

function BackDropContent({ children, className, onClickOutSide }) {
  useLockBodyScroll();

  return (
    <>
      {children}
      <div className={`${className} backdrop`} onClick={onClickOutSide} />
    </>
  );
}

BackDrop.propTypes = {
  onClickOutSide: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
};

BackDrop.defaultProps = {
  onClickOutSide: () => {},
  className: "",
  visible: true,
};

export default BackDrop;
