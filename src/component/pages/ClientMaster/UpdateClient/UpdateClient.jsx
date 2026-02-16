import { Button, Col, Form, Input, Row, Select } from "antd";

const UpdateClient = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const handleNumberWheel = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    if (event?.target && typeof event.target.blur === "function") {
      event.target.blur();
    }
  };
  
  return (
    <>
      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            // style={{ marginTop: "35px" }}
          >
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Update Client
            </div>
            {/* <div className="show_btn">
              <button>Show</button>
              <button onClick={handleBackClick}>Back</button>
            </div> */}
          </div>
        </div>
        <Form
          className="form_data"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <div>
            <Row className="super_agent update_agent">
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  required
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your username!",
                  //   },
                  // ]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="Reference"
                  name="reference"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please specify reference!",
                    },
                  ]}>
                  <Input placeholder="Enter Reference" />
                </Form.Item>
                <Form.Item
                  label="Contact No."
                  name="number"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Invalid Contact NO!",
                    },
                  ]}>
                  <Input
                    type="number"
                    placeholder="Enter Reference"
                    onWheel={handleNumberWheel}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="Password"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password!",
                    },
                  ]}>
                  <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="Status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Select
                    // placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    defaultValue="Active"
                    allowClear>
                    <Option value="active">Active</Option>
                    <Option value="inactive">InActive</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="mobileCharge"
                  name="Client Mobile Charge"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password!",
                    },
                  ]}>
                  <Input type="password" placeholder="Password" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} xs={24}></Col>
            </Row>
            <div className="update_agent">
              <h2 className="match_share">Match Share and Comm</h2>
            </div>
            <Row className="super_agent update_agent">
              <Col lg={12} md={12} xs={24}>
                <Form.Item name="AgentCommType" label="AGENT comm type">
                  <Select disabled allowClear>
                    <Option value="NoComm">No Comm</Option>
                    <Option value="Betbybet">Bet by bet</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  required
                  name="SupperCommType"
                  label="CLIENT comm type">
                  <Select allowClear>
                    <Option value="NoComm">No Comm</Option>
                    {/* <Option value="Betbybet">Bet by bet</Option> */}
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item label="AGENT casino comm(%)" name="casinoComm">
                  <Input
                    type="number"
                    placeholder="0"
                    disabled
                    onWheel={handleNumberWheel}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label="CLIENT casino comm(%)"
                  name="ClientcasinoComm"
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid Casino commission",
                    },
                  ]}>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value="0.0"
                    onWheel={handleNumberWheel}
                  />
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

export default UpdateClient;
