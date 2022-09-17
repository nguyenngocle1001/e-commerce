import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Group from "components/layouts/Group";
import { Col, Row } from "antd";
import useProductSelector from "hooks/selectors/useProduct";
import Product from "components/common/Product";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function GroupProduct({ prop, url, title }) {
  const { products, onGetProducts } = useProductSelector(prop);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/products");
  };

  useEffect(() => {
    onGetProducts({ url, params: { limit: 8 } });
  }, []);

  return (
    <Group title={title} buttonText="View All" onClick={handleOnClick}>
      {products.status === "fetching" && (
        <Skeleton count={5} direction="column" />
      )}
      <Row gutter={12} style={{ rowGap: 12 }}>
        {products.data.docs &&
          products.data.docs.map((product) => (
            <Col key={product.id} xl={6} md={8} sm={12} xs={24}>
              <Product image={product.imageCover} {...product} />
            </Col>
          ))}
      </Row>
    </Group>
  );
}

GroupProduct.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
};

export default GroupProduct;
