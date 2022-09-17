import React from "react";
import { Outlet } from "react-router-dom";

import MessengerCustomerChat from "react-messenger-customer-chat";

import Topbar from "components/layouts/Topbar";
import Footer from "components/layouts/Footer";
import ScrollToTop from "components/layouts/ScrollToTop";
import ConnectHeaderWithNav from "components/layouts/ConnectHeaderWithNav";

import HandleToken from "components/layouts/HandleToken";

import "./style.scss";

function MainLayout() {
  return (
    <div className="main-layout">
      <ScrollToTop />
      <HandleToken />

      <Topbar />

      <ConnectHeaderWithNav />

      <Outlet />
      <Footer />
      <MessengerCustomerChat pageId="110122944737415" appId="645105549951324" />
    </div>
  );
}

export default MainLayout;
