import React, { useEffect } from "react";
import { Col, Row } from "antd";

import breadcrumbs from "constants/breadcrumb";

import Divider from "components/common/Divider";
import SearchValue from "components/common/SearchValue";
import SortAccording from "components/common/SortAccording";

import PriceRange from "components/layouts/PriceRange";
import FilterGroup from "components/layouts/FilterGroup";
import FilterBrand from "components/layouts/FitlerBrand";
import FilterRating from "components/layouts/FilterRating";
import BreadcrumbCustom from "components/layouts/BreadcrumbCustom";

import ProductList from "./ProductList";

import "./style.scss";

function ProductPage() {
  useEffect(() => {
    document.title = "Lexe Store | Products";
  }, []);
  return (
    <>
      <BreadcrumbCustom data={breadcrumbs.products} />

      <div className="product-page">
        <div className="container">
          <Row gutter={12}>
            <Col xl={6}>
              <div className="product-page__option">
                <h3 className="product-page__option__heading">
                  Shopping Options
                </h3>

                <Divider margin="0" />

                <FilterGroup title="Price">
                  <PriceRange />
                </FilterGroup>

                <FilterGroup title="Brand">
                  <FilterBrand />
                </FilterGroup>

                <FilterGroup title="Rating">
                  <FilterRating />
                </FilterGroup>
              </div>
            </Col>
            <Col xl={18}>
              <div className="product-page__right">
                <SortAccording />
                <SearchValue />
                <ProductList />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
