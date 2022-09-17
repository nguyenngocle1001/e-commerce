import React from "react";
import { NavLink } from "react-router-dom";

import shortNameGenerate from "utils/shortNameGenerate";

import Avatar from "components/common/Avatar";
import Divider from "components/common/Divider";
import MenuListing from "components/common/MenuListing";

import "./style.scss";

const data = [
  [
    {
      href: "/me",
      label: "Profile",
    },
    {
      href: "/history-orders",
      label: "History Orders",
    },
  ],
  "divider",
  [
    {
      label: "Logout",
      href: "/logout",
    },
  ],
];

function UserAction({ user, onClick }) {
  return (
    <div className="user-action">
      <div className="user-action__header">
        <Avatar
          image={user.photo}
          text={shortNameGenerate(user.name)}
          width={42}
        />

        <div className="user-action__header__desc">
          <span className="user-action__header__name">{user.name}</span>
          <span className="user-action__header__type">{user.provideId}</span>
        </div>
      </div>

      <Divider margin="10px 0 0" />

      {data.map((item, index) => {
        if (typeof item === "string") return <Divider key={index} margin="0" />;
        return <MenuListing onClick={onClick} data={item} key={index} />;
      })}
    </div>
  );
}

export default UserAction;
