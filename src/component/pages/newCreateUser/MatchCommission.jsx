import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const MatchCommission = ({ commissionType, commiType, data, createName }) => {
  const { id } = useParams();
  const labelPrefix = `${(createName || "User").toUpperCase()} `;

  return (
    <>
      <div>
        <h2 className="match_share">Match and Share info</h2>
      </div>
      <Row className="super_agent sub_super" gutter={[18, 14]}>
        {id === "2" ? (
          <></>
        ) : (
          <>
            <Col lg={12} md={12} xs={12}>
              <Form.Item
                label="MY MATCH SHARE"
                name="MyMatchShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  value={data?.myPartnership}
                  // defaultChecked={userData && userData?.myMatchCommission}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={12}>
              <Form.Item
                label={`${labelPrefix}MATCH SHARE(%)`}
                name="matchShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Match Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Match share can not be more than" +
                              " " +
                              `${data?.data?.myShare}`
                          )
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Col lg={12} md={12} xs={12}>
          <Form.Item
            label="MY COMM TYPE"
            name="MyCommtype"
            required={false}>
            <Input type="text" disabled />
          </Form.Item>
        </Col>

        <Col lg={12} md={12} xs={12}>
          <Form.Item
            name="Commtype"
            label={`${labelPrefix}COMM TYPE`}
            required
            rules={[
              {
                required: true,
                message: "Please select commission type",
              },
            ]}>
            <Select
              onChange={commissionType}
              allowClear
              options={[
                { value: "nocomm", label: "No Comm" },
                { value: "bbb", label: "Bet by bet" },
              ]}
            />
          </Form.Item>
        </Col>
        {commiType === "bbb" && (
          <>
            <Col lg={12} md={12} xs={12}>
              <Form.Item
                name="My_Match_comm"
                label="MY MATCH COMM(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={12}>
              <Form.Item
                name="Match_comm"
                required
                label={`${labelPrefix}MATCH COMM(%)`}
                rules={[
                  {
                    required: true,
                    message: "Please input your match Commission!",
                  },
                ]}>
                <Input placeholder="master Match Commission" />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} xs={12}>
              <Form.Item
                name="My_sess_comm"
                label="MY SESS COMM(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={12}>
              <Form.Item
                name="sess_comm"
                required
                label={`${labelPrefix}SESS COMM(%)`}
                rules={[
                  {
                    required: true,
                    message: "Please input your Sess Commission!",
                  },
                ]}>
                <Input placeholder="master Session Commission" />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      {/* <div>
        {
          window.location.pathname.includes("create-client") ? null : <h2 className="match_share">{createName} Casino Share </h2>
        }
       
        <Row className="super_agent sub_super">
        {window.location.pathname.includes("create-client") ? (
          <></>
        ) : (
          <>
            <Col lg={12} xs={12}>
              <Form.Item
                label="My Casino Share(%)"
                name="MyCasinoShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  defaultChecked={userData && userData?.myCasinoShare}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Form.Item
                label="Casino Share(%)"
                name="casinoShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Casino Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myCasinoShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Casino share can not be more than" +
                              " " +
                              `${data?.data?.myCasinoShare}`
                          )
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
      </div> */}
    </>
  );
};

export default MatchCommission;
