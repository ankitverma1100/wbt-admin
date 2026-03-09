import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const CasinoCommission = ({ createName, commiType }) => {
  const { id } = useParams();
  const labelPrefix = `${(createName || "User").toUpperCase()} `;
  return (
    <>
      <Row className="super_agent sub_super" gutter={[18, 14]}>
        {/* {id !== "2" && (
          <Col lg={12} md={12} xs={12}>
            <Form.Item
              label="MY CASINO SHARE (%)"
              name="cassinoShare"
              required={false}>
              <Input type="number" value={2} disabled />
            </Form.Item>
          </Col>
        )} */}
        {/* {id !== "2" && (
          <Col lg={12} md={12} xs={12}>
            <Form.Item
              label={`${labelPrefix}CASINO SHARE (%)`}
              name="cassino_Share"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your casino share!",
                },
              ]}>
              <Input placeholder="casino share" />
            </Form.Item>
          </Col>
        )} */}
        <Col lg={12} md={12} xs={12}>
          <Form.Item
            label="MY CASINO COMM"
            name="cassinoComm"
            required={false}>
            <Input type="number" value={2} disabled />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} xs={12}>
          <Form.Item
            label={`${labelPrefix}CASINO COMM`}
            name="cassino_Comm"
            required
            rules={[
              {
                required: true,
                message: "Please enter valid Casino commission",
              },
            ]}>
            <Input
              placeholder="casino commition"
              disabled={commiType !== "bbb"}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CasinoCommission;
