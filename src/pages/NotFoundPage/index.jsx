import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import image from "assets/images/404page.png";
import Button from "components/common/Button";

import "./style.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  useEffect(()=>{
    document.title = "Lexe Store | 404 😢😢😢"
  }, []);

  return (
    <div className="not-found-page">
      <img src={image} alt="404 not found" className="not-found-page__image" />

      <h1 className="not-found-page__heading">Page Not Found</h1>
      <span className="not-found-page__desc">
        Sorry for the inconvenience. Go to our homepage or check out our latest
        collections for Fashion.
      </span>

      <Button className="not-found-page__btn" onClick={handleReturnHome}>
        RETURN TO HOME
      </Button>
    </div>
  );
}

export default NotFoundPage;
