import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "antd";

import { DETAIL } from "constants/props";
import { PRODUCT_DETAIL_API } from "constants/apiPath";
import useDetailSelector from "hooks/selectors/useDetailSelector";

import BreadcrumbCustom from "components/layouts/BreadcrumbCustom";
import breadcrumbs from "constants/breadcrumb";

import Images from "./Images";
import Information from "./Information";
import Group from "components/layouts/Group";

import "./style.scss";
import Description from "./Description";
import Loading from "components/common/Loading";

function DetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, onGetDetail, onClear } = useDetailSelector(DETAIL.product);

  useEffect(() => {
    onGetDetail({ url: `${PRODUCT_DETAIL_API}/${slug}` });
  }, [slug]);

  useEffect(() => {
    if (data.status === "failure") navigate("/404");
  }, [data.status]);

  useEffect(() => {
    return () => onClear();
  }, []);
  
  useEffect(()=>{
    document.title = `Lexe Store | ${data.data.doc?.name || 'Loading'}`
  }, [data.data]);

  if (!data.data.doc) return <Loading />;

  return (
    <>
      <BreadcrumbCustom data={breadcrumbs.detailProduct(data.data.doc.name)} />

      <div className="container">
        <div className="detail-page">
          <Group>
            <Row>
              <Col xl={12}>
                <Images images={data.data.doc.images} />
              </Col>
              <Col xl={12}>
                <Information product={data.data.doc} />
              </Col>
            </Row>
          </Group>

          <Group title="Description">
            <Description value={data.data.doc.description} />
          </Group>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
