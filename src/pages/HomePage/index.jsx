import CallMe from "components/common/CallMe";
import Commitment from "components/layouts/Commitment";
import Group from "components/layouts/Group";
import GroupProduct from "components/layouts/GroupProduct";
import { PRODUCT_API } from "constants/apiPath";
import { PRODUCT } from "constants/props";
import React, { useEffect } from "react";

import Banner from "./Banner";
import BrandListing from "./BrandListing";
import CategoryListing from "./CategoryListing";

import "./style.scss";

function HomePage() {

  useEffect(()=>{
    document.title = "Lexe Store | Home"
  }, []);

  return (
    <div className="container">
      <div className="home-page">
        <Banner />

        <CategoryListing />

        <BrandListing />

        <GroupProduct
          title="Hot Products"
          url={`${PRODUCT_API}/hot`}
          prop={PRODUCT.hotProduct}
        />

        <CallMe />

        <GroupProduct
          title="Popular Products"
          url={`${PRODUCT_API}/popular`}
          prop={PRODUCT.popularProduct}
        />

        <Commitment />
      </div>
    </div>
  );
}

export default HomePage;
