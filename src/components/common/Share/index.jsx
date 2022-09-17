import React from "react";
import { AiOutlineShareAlt } from "react-icons/ai";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

import "./style.scss";

function Share() {
  return (
    <div className="share">
      <span className="share__btn">
        <AiOutlineShareAlt />
        Share
      </span>

      <div className="share__list">
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <LinkedinShareButton url={window.location.href}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton url={window.location.href}>
          <EmailIcon size={32} round />
        </EmailShareButton>

        <TelegramShareButton url={window.location.href}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}

export default Share;
