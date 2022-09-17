import { Col, Row } from "antd";
import commitment from "constants/commitment";
import React from "react";

import Group from "../Group";

import "./style.scss";

function Commitment() {
  return (
    <Group>
      <div className="commitment">
        <Row style={{ rowGap: "24px" }}>
          {commitment.map((item) => (
            <Col
              className="commitment__col"
              key={item.id}
              xl={6}
              md={12}
              sm={24}
            >
              <div className="commitment__item">
                <span className="commitment__icon">{item.icon}</span>
                <h3 className="commitment__title">{item.title}</h3>
                <span className="commitment__desc">{item.desc}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Group>
  );
}

export default Commitment;
