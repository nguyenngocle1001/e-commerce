import React from "react";
import { Col, Row } from "antd";
import paymentImage from 'assets/images/payment.png'

import Information from "./components/Information";
import NewsLetter from "./components/NewsLetter";

import "./style.scss";
import NeedHelp from "./components/NeedHelp";

const data = [
  {
    xl: 6,
    title: "Looking For Store?",
    data: [
      {
        type: "text",
        label:
          "38 West Temple Drive Ashburn, East Hartford VA 208686, California, USA.",
      },
    ],
  },
  {
    xl: 6,
    md: 16,
    title: "need help?",
    data: [
      {
        type: "component",
        component: <NeedHelp />,
      },
      {
        type: "text",
        label: "Opening Hours: Monday – Friday: 9:00-20:00",
      },
      {
        type: "text",
        label: "Saturday: 11:00 – 17:00",
      },
      {
        type: "divider",
      },
      {
        type: "email",
        label: "Email Support: contact@example.com",
      },
    ],
  },
  {
    title: "My Account",
    data: [
      {
        type: "link",
        label: "Product Support",
        href: "/",
      },
      {
        type: "link",
        label: "Checkout",
        href: "/checkout",
      },
      {
        type: "link",
        label: "Shopping Cart",
        href: "/cart",
      },
      {
        type: "link",
        label: "Wishlist",
        href: "/wishlist",
      },
    ],
  },
  {
    title: "Quick Link",
    data: [
      {
        type: "link",
        label: "Store Location",
        href: "/",
      },
      {
        type: "link",
        label: "My account",
        href: "/checkout",
      },
      {
        type: "link",
        label: "orders tracking",
        href: "/cart",
      },
      {
        type: "link",
        label: "FAQs",
        href: "/wishlist",
      },
    ],
  },
  {
    title: "customer service",
    data: [
      {
        type: "link",
        label: "Help center",
        href: "/",
      },
      {
        type: "link",
        label: "contact us",
        href: "/checkout",
      },
      {
        type: "link",
        label: "report abuse",
        href: "/cart",
      },
      {
        type: "link",
        label: "submit a dispute",
        href: "/wishlist",
      },
      {
        type: "link",
        label: "policies & rules",
        href: "/wishlist",
      },
      {
        type: "link",
        label: "online returns policy",
        href: "/wishlist",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <NewsLetter />

        <Row gutter={16}>
          {data.map((item, index) => (
            <Col key={index} xl={item.xl || 4} md={item.md || 8} sm={12}>
              <Information title={item.title} data={item.data} />
            </Col>
          ))}
        </Row>

        <div className="footer__bottom">
          <p className="footer__bottom__text">
            Copyright © Lexe. All Rights Reserved. Powered by Blueskytechco.
          </p>

          <img
            src={paymentImage}
            alt="payment"
            className="footer__bottom__payment"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
