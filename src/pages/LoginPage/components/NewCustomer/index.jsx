import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/common/Button";
import Heading from "components/common/Heading";

import "./style.scss";

function NewCustomer() {
  const navigate = useNavigate();

  const handleToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <div className="login-new-customer">
      <Heading
        heading="New Customers"
        desc="Creating an account has many benefits: check out faster, keep more than one address, track orders and more."
      />

      <Button onClick={handleToSignUpPage}>CREATE AN ACCOUNT</Button>
    </div>
  );
}

export default NewCustomer;
