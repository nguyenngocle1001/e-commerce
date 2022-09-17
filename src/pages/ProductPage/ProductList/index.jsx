import React, { useEffect, useState } from "react";

import { PRODUCT_API } from "constants/apiPath";
import { PRODUCT } from "constants/props";
import useProductSelector from "hooks/selectors/useProduct";
import { Col, Pagination, Row } from "antd";
import Product from "components/common/Product";
import { useSearchParams } from "react-router-dom";
import SearchEmpty from "components/common/SearchEmpty";
import Loading from "components/common/Loading";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
  });
  const { products, onGetProducts } = useProductSelector(PRODUCT.main);

  const handleOnPageChange = (page) => {
    setParams((params) => ({ ...params, page }));
  };

  useEffect(() => {
    const filters = Object.fromEntries([...searchParams]);
    onGetProducts({ url: PRODUCT_API, params: { ...params, ...filters } });

    window.scrollTo(0, 0);
  }, [params, searchParams]);

  if (products.data?.docs?.length === 0) return <SearchEmpty />;

  return (
    <>
      {products.status === "fetching" && <Loading />}
      <Row gutter={12} style={{ rowGap: 12 }}>
        {products.data.docs?.map((product) => (
          <Col key={product.id} xl={6} md={8} sm={12} xs={24}>
            <Product image={product.imageCover} {...product} />
          </Col>
        ))}
      </Row>

      {products.data.docs?.length > 10 && (
        <Pagination
          style={{ margin: "0 auto" }}
          current={params.page}
          total={products.data?.pagination?.totalRows || 0}
          pageSize={params.limit}
          showSizeChanger={false}
          onChange={handleOnPageChange}
        />
      )}
    </>
  );
}

export default ProductList;
