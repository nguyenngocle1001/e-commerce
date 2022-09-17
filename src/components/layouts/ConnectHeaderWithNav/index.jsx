import BackDrop from "components/common/BackDrop";
import useDelayUnmount from "hooks/layouts/useDelayUnmount";
import useResponsive from "hooks/layouts/useResponsive";
import useToggle from "hooks/layouts/useToggle";
import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import NavbarSide from "../Navbar/NavbarSide";

function ConnectHeaderWithNav() {
  const [isShowNav, onIsShowNavChange] = useToggle();
  const responsive = useResponsive();
  const shouldRender = useDelayUnmount(isShowNav, 200);

  return (
    <>
      <Header onMenuMobileClick={onIsShowNavChange} />
      {responsive === "pc" ? (
        <Navbar />
      ) : (
        <BackDrop visible={shouldRender} onClickOutSide={onIsShowNavChange}>
          <NavbarSide
            onClose={onIsShowNavChange}
            className={!isShowNav ? "unmount" : ""}
          />
        </BackDrop>
      )}
    </>
  );
}

export default ConnectHeaderWithNav;
