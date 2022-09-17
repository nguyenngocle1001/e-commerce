import React, { useRef } from "react";
import PropTypes from "prop-types";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { AUTH } from "constants/props";
import Avatar from "components/common/Avatar";
import shortNameGenerate from "utils/shortNameGenerate";

import "./style.scss";
import UserAction from "../UserAction";
import useToggle from "hooks/layouts/useToggle";
import useOnClickOutside from "hooks/layouts/useOnClickOutside";

function User() {
  const {
    data: { data },
  } = useAuthSelector(AUTH.login);

  const [isShow, onChangeIsShow] = useToggle();
  const ref = useRef();

  useOnClickOutside(ref, onChangeIsShow);

  return (
    <div className="user">
      <button className="user__btn" onClick={onChangeIsShow}>
        <Avatar
          image={data.user.photo}
          text={shortNameGenerate(data.user.name)}
          width={24}
        />
      </button>

      {isShow && (
        <div className="user__dropdown" ref={ref}>
          <UserAction user={data.user} onClick={onChangeIsShow} />
        </div>
      )}
    </div>
  );
}

User.propTypes = {};

export default User;
