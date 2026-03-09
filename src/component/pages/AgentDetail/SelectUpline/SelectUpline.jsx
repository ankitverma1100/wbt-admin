import { useNavigate } from "react-router-dom";
import "./SelectUpline.scss";
import { Button, Col, Form, Input, Row, Select } from "antd";
// import { DownOutlined } from "@ant-design/icons";

const SelectUpline = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  const items = [
    {
      label: <p>1st menu item</p>,
      key: "0",
    },
    {
      label: <p>2nd menu item</p>,
      key: "1",
    },

    {
      label: <p>3nd menu item</p>,
      key: "2",
    },
    {
      label: <p>4nd menu item</p>,
      key: "3",
    },
    {
      label: <p>5nd menu item</p>,
      key: "4",
    },
    {
      label: <p>5nd menu item</p>,
      key: "5",
    },
    {
      label: <p>6nd menu item</p>,
      key: "6",
    },
  ];

  return (
    <>
      <div className="select_upline">
        <div className="sub_select_upline">
          <div
            className="sub_live_section live_report"
            // style={{ marginTop: "35px" }}
          >
            <div
              style={{ padding: "19px 26px", fontSize: "22px" }}
              className="team_name">
              Select Upline
            </div>
          </div>
        </div>
        <div className="main_selecte_upline_list">
          <div className="select_upline_list">
            <Select
              defaultValue="lucy"
              className="select_upline_option"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                  className: "option_upline",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            // style={{ marginTop: "35px" }}
          >
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Create Agent
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <Form
          className="form_data mt-16"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <div>
            <Row className="super_agent">
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="Name"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}>
                  <Input type="text" placeholder="Enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Reference"
                  name="Reference"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please specify reference",
                    },
                  ]}>
                  <Input type="text" placeholder="Enter Reference" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="My Coins" name="My Coins" required={false}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Coins"
                  name="Coins"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid Coins",
                    },
                  ]}>
                  <Input type="number" placeholder="Super Agent Coins" />
                </Form.Item>
                {/* <Form.Item
                  label="Password"
                  name="Password"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password",
                    },
                  ]}>
                  <Input type="text" placeholder="Password" />
                </Form.Item> */}
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Contact No."
                  name="matchcomm"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please contact number",
                    },
                  ]}>
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="Password"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password",
                    },
                  ]}>
                  <Input type="text" placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Share Type"
                  label="Share Type"
                  className="share_type"
                  rules={[
                    {
                      required: true,
                      message: "agent_type is required",
                    },
                  ]}>
                  <Select
                    placeholder="Select Share type"
                    // onChange={onGenderChange}
                    allowClear>
                    <Option value="Fixed">Fixed</Option>
                    <Option value="Change">Change</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div>
              <h2 className="match_share">Agent Match Share and Commission</h2>
            </div>
            <Row className="super_agent sub_super">
              <Col span={12}>
                <Form.Item
                  label="My MATCH SHARE"
                  name="My MATCH SHARE"
                  required={false}>
                  <Input type="number" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="MATCH SHARE"
                  name="matchShare"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Invalid Match Share",
                    },
                  ]}>
                  <Input type="number" placeholder="Super Agent Match Share" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="My Mobile Share(%)"
                  name="MobileShare"
                  required={false}>
                  <Input type="number" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile Share(%)"
                  name="agentMobileShare"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Invalid Mobile Share",
                    },
                  ]}>
                  <Input type="number" placeholder="Super Agent Mobile Share" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="My Commission Type"
                  name="MyCommtype"
                  required={false}>
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Commtype"
                  label="Comm type"
                  className="no_comm"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please select commission type",
                    },
                  ]}>
                  <Select
                    placeholder="Commission Type"
                    // onChange={onGenderChange}
                    allowClear>
                    <Option value="Fixed">No Comm</Option>
                    <Option value="Change">Bet by bet</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div>
              <h2 className="match_share">Agent Casino Share and Commission</h2>
            </div>
            <Row className="super_agent sub_super">
              <Col span={12}>
                <Form.Item
                  label="My Casino Share(%)"
                  name="casinoShare"
                  required={false}>
                  <Input type="number" disabled />
                </Form.Item>
                {/* <Form.Item
                  label="My CASINO COMM"
                  name="cassinoComm"
                  required={false}>
                  <Input type="number" disabled />
                </Form.Item> */}
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Casino Share(%)"
                  name="casino_Share"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Invalid Casino Share",
                    },
                  ]}>
                  <Input type="number" placeholder="Super Agent Casino Share" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="My CASINO COMM"
                  name="cassinoComm"
                  required={false}>
                  <Input type="number" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="CASINO COMM"
                  name="cassino_Comm"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid Casino commission",
                    },
                  ]}>
                  <Input type="number" placeholder="Casino Copmmission" />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 19,
                    span: 24,
                  }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SelectUpline;
