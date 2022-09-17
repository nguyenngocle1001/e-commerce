import React from "react";
import PropTypes from "prop-types";

import useLockBodyScroll from "hooks/layouts/useLockBodyScroll";

import "./style.scss";

function Modal({ visible, children }) {
  return visible && <ModalContent>{children}</ModalContent>;
}

function ModalContent({ children }) {
  useLockBodyScroll();

  return <div className="modal">{children}</div>;
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  visible: false,
};

export default Modal;
