import { useNavigate } from "react-router-dom";
import "./CreateSuperAgent.scss";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  useCreateUserMutation,
  useLazyCreateUserDataQuery,
} from "../../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../../App";

const CreateSuperAgent = ({ createName }) => {
  const [userData, setUserData] = useState({});
  const [commiType, setCommiType] = useState("nocomm");
  const [LuPassword, setLuPassword] = useState("");
  const [createUserId, setCreateUserID] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const currentUsername = localStorage.getItem("username") || "";

  const commissionType = (value) => {
    setCommiType(value);
  };

  const handleLupassword = (e) => {
    setLuPassword(e.target.value);
  };


  const userId = localStorage.getItem("userId");
  const [state, setState] = useState({
    isAuraAllowed: "",
    isSuperNovaAllowed: "",
    isQTechAllowed: "",
    isVirtualAllowed: "",
    isSportBookAllowed: "",
  });

  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;
  var mobileNum = /^[6-9][0-9]{9}$/;

  const handelUseId = (e) => {
    setCreateUserID(e.target.value);
  };

  const [createUser, { data: UserList, error, isLoading }] =
    useCreateUserMutation();
  const [trigger, { data }] = useLazyCreateUserDataQuery();

  useEffect(() => {
    trigger();
  }, [data?.data]);

  const hostname = window.location.pathname;

  const onFinish = (values) => {
    setLuPassword("");
    const userData = {
      userId: hostname.includes("create-super")
        ? "S" + createUserId?.trim()
        : hostname.includes("create-agent")
        ? "M" + createUserId?.trim()
        : hostname.includes("create-dealer")
        ? "A" + createUserId?.trim()
        : "C" + createUserId?.trim(),
      username: values?.Name,
      mobile: values?.mobile,
      city: "",
      userRole: window.location.pathname.includes("create-client") ? 2 : 1,
      password: values?.password,
      sportPartnership: values?.MyMatchShare - values?.matchShare || 0,
      oddLossCommission: commiType === "nocomm" ? "0" : values?.Match_comm,
      lupassword: values?.lupassword,
      liveCasinoLock: false,
      casinoPartnership: values?.casino_Share || 0,
      fancyLossCommission: commiType === "nocomm" ? "0" : values?.sess_comm,
      casinoCommission: values?.cassino_Comm || 0,
      commType: values?.Commtype,
      appId: 1,
      amount: values?.Coins,
      reference: values?.reference,
      isAuraAllowed: state?.isAuraAllowed,
      isSuperNovaAllowed: state?.isSuperNovaAllowed,
      isQTechAllowed: state?.isQTechAllowed,
      isVirtualAllowed: state?.isVirtualAllowed,
      isSportBookAllowed: state?.isSportBookAllowed,
    };
    createUser(userData);
  };

  useEffect(() => {
    if (UserList?.status === true) {
      openNotification(UserList?.message);
      form?.resetFields();
      trigger();
    } else if (UserList?.status === false || error?.data?.message) {
      openNotificationError(UserList?.message || error?.data?.message);
    }
  }, [UserList, error]);

  const { Option } = Select;

  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  useEffect(() => {
    setUserData(data?.data);
  }, [data?.data, UserList?.status]);

  useEffect(() => {
    if (currentUsername) {
      form.setFieldsValue({ reference: currentUsername });
    }
  }, [currentUsername, form]);

  return (
    <>
      {contextHolder}
      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Create {createName}/
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <div className="ant-spin-nested-loading">
          {isLoading ? (
            <div className="spin_icon">
              <Spin size="large" />
            </div>
          ) : (
            ""
          )}
          <Form
            className="form_data"
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            fields={[
              {
                name: "My Coins",
                value: data?.data?.myBalance,
              },
              {
                name: "MyMatchShare",
                value: data?.data?.myShare,
              },
              {
                name: "MyCasinoShare",
                value: data?.data?.myCasinoShare,
              },
              {
                name: "MyCommtype",
                value:
                  data?.data?.mySessionCommission === 0 &&
                  data?.data?.myMatchCommission
                    ? "No Comm"
                    : "Bet by Bet",
              },
              {
                name: "cassinoComm",
                value: data?.data?.myCasinoCommission,
              },
              {
                name: "My_Match_comm",
                value: data?.data?.myMatchCommission,
              },
              {
                name: "My_sess_comm",
                value: data?.data?.mySessionCommission,
              },
            ]}>
            <div>
              <Row className="super_agent">
                <Col xl={12} lg={12} md={24} xs={24}>
                  <Form.Item
                    label="User ID"
                    name="code"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter UserID",
                      },
                      // {
                      //   validator: async (rules, value) => {
                      //     try {
                      //       const results = await axios.post(
                      //         "user/is-userid-available",
                      //         {
                      //           userId: hostname.includes("create-super")
                      //             ? "S" + value
                      //             : hostname.includes("create-agent")
                      //             ? "M" + value
                      //             : hostname.includes("create-dealer")
                      //             ? "A" + value
                      //             : "C" + value,
                      //         },
                      //         {
                      //           headers: {
                      //             Authorization: `Bearer ${localStorage.getItem(
                      //               "token"
                      //             )}`,
                      //           },
                      //           baseURL: import.meta.env.VITE_BASE_URL,
                      //         }
                      //       );

                      //       if (results?.data.status === false) {
                      //         return Promise.reject(
                      //           new Error(results?.data.message)
                      //         );
                      //       }
                      //     } catch (err) {
                      //       console.log(err);
                      //     }
                      //   },
                      // },
                    ]}>
                    <Input
                      type="text"
                      placeholder="Enter user id"
                      onChange={(e) => handelUseId(e)}
                      onKeyDown={(e) => {
                        if (
                          !e.key.match(/^[a-zA-Z0-9]$/) &&
                          e.key.length === 1
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={24} xs={24}>
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
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      onKeyDown={(e) => {
                        if (!e.key.match(/^[a-zA-Z ]$/) && e.key.length === 1) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Contact No."
                    name="mobile"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (
                            !mobileNum.test(names) &&
                            names != "" &&
                            names != null
                          ) {
                            return Promise.reject(
                              new Error("Please Enter Valid Mobile Number")
                            );
                          }
                        },
                      },
                    ]}>
                    <InputNumber
                      className="number_field"
                      min={0}
                      type="number"
                      onKeyDown={(e) => {
                        if (!e.key.match(/^[0-9]$/) && e.key.length === 1) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={24} xs={24}>
                  <Form.Item label="Reference" name="reference">
                    <Input type="text" placeholder="Enter Reference" />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="My Coins" name="My Coins" required={false}>
                    <Input type="number" disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Coins"
                    name="Coins"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid Coins",
                      },
                      {
                        validator: async (_, values) => {
                          if (
                            data?.data?.myBalance < values &&
                            values != "" &&
                            values != null
                          ) {
                            return Promise.reject(
                              new Error("Please enter valid Coins")
                            );
                          }
                        },
                      },
                    ]}>
                    <InputNumber
                      className="number_field"
                      min={0}
                      type="number"
                      placeholder="Enter Coins"
                      onKeyDown={(e) => {
                        if (e.key == ".") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Password",
                      },
                      {
                        validator: async (_, names) => {
                          if (
                            !passw.test(names) &&
                            names != "" &&
                            names != null
                          ) {
                            return Promise.reject(
                              new Error(
                                "Minimun 6 character, must contain letters and numbers"
                              )
                            );
                          }
                        },
                      },
                    ]}>
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
              <div>
                <h2 className="match_share">
                 Match Share and Commission
                </h2>
              </div>
              <Row className="super_agent sub_super">
                {window.location.pathname.includes("create-client") ? (
                  <></>
                ) : (
                  <>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="My MATCH SHARE"
                        name="MyMatchShare"
                        required={false}>
                        <InputNumber
                          className="number_field"
                          min={0}
                          defaultChecked={
                            userData && userData?.myMatchCommission
                          }
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="MATCH SHARE"
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

                <Col lg={12} xs={24}>
                  <Form.Item
                    label="My Commission Type"
                    name="MyCommtype"
                    required={false}>
                    <Input type="text" disabled />
                  </Form.Item>
                </Col>

                <Col lg={12} xs={24}>
                  <Form.Item
                    name="Commtype"
                    label="Comm type"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please select commission type",
                      },
                    ]}>
                    <Select
                      onChange={commissionType}
                      defaultValue="Commision Type"
                      allowClear>
                      <Option value="nocomm">No Comm</Option>
                      <Option value="bbb">Bet by bet</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {commiType === "bbb" && (
                  <>
                    <Col lg={12} xs={24}>
                      <Form.Item name="My_Match_comm" label="My Match comm(%)">
                        <InputNumber
                          className="number_field"
                          min={0}
                          step="0.1"
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        name="Match_comm"
                        required
                        label="Match comm(%)"
                        rules={[
                          {
                            required: true,
                            message: "Please select odds commission",
                          },
                        ]}>
                        <Select
                          defaultValue="Select Match comm(%)"
                          options={[
                            {
                              value: "0.00",
                              label: "0.00",
                            },
                            {
                              value: "0.25",
                              label: "0.25",
                            },
                            {
                              value: "0.50",
                              label: "0.50",
                            },
                            {
                              value: "0.75",
                              label: "0.75",
                            },
                            {
                              value: "1.00",
                              label: "1.00",
                            },
                            {
                              value: "1.25",
                              label: "1.25",
                            },
                            {
                              value: "1.50",
                              label: "1.50",
                            },
                            {
                              value: "1.75",
                              label: "1.75",
                            },
                            {
                              value: "2.00",
                              label: "2.00",
                            },
                            // {
                            //   value: '2.25',
                            //   label: '2.25',
                            // },
                            // {
                            //   value: '2.50',
                            //   label: '2.50',
                            // },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={12} xs={24}>
                      <Form.Item name="My_sess_comm" label="My Sess comm(%)">
                        <InputNumber
                          className="number_field"
                          min={0}
                          step="0.1"
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        name="sess_comm"
                        required
                        label="Sess Comm(%)"
                        rules={[
                          {
                            required: true,
                            message: "Please select session commission",
                          },
                        ]}>
                        <Select
                          defaultValue="Select Sess Comm(%)"
                          options={[
                            {
                              value: "0.00",
                              label: "0.00",
                            },
                            {
                              value: "0.25",
                              label: "0.25",
                            },
                            {
                              value: "0.50",
                              label: "0.50",
                            },
                            {
                              value: "0.75",
                              label: "0.75",
                            },
                            {
                              value: "1.00",
                              label: "1.00",
                            },
                            {
                              value: "1.25",
                              label: "1.25",
                            },
                            {
                              value: "1.50",
                              label: "1.50",
                            },
                            {
                              value: "1.75",
                              label: "1.75",
                            },
                            {
                              value: "2.00",
                              label: "2.00",
                            },
                            {
                              value: "2.25",
                              label: "2.25",
                            },
                            {
                              value: "2.50",
                              label: "2.50",
                            },
                            {
                              value: "2.75",
                              label: "2.75",
                            },
                            {
                              value: "3.00",
                              label: "3.00",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>

              {/* {commiType === "bbb" && (
                <div>
                  <h2 className="match_share">
                    {createName} Casino Commission
                  </h2>
                </div>
              )}

              <Row className="super_agent sub_super">
                {commiType === "bbb" && (
                  <>
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
                        <Select
                          defaultValue="Select CASINO COMM"
                          options={[
                            {
                              value: "0.00",
                              label: "0.00",
                            },
                            {
                              value: "0.25",
                              label: "0.25",
                            },
                            {
                              value: "0.50",
                              label: "0.50",
                            },
                            {
                              value: "0.75",
                              label: "0.75",
                            },
                            {
                              value: "1.00",
                              label: "1.00",
                            },
                            // {
                            //   value: "1.25",
                            //   label: "1.25",
                            // },
                            // {
                            //   value: "1.50",
                            //   label: "1.50",
                            // },
                            // {
                            //   value: "1.75",
                            //   label: "1.75",
                            // },
                            // {
                            //   value: "2.00",
                            //   label: "2.00",
                            // },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row> */}

              {/* {casinoDetalisData?.data?.length != 0 && (
                <div>
                  <h2 className="match_share">Casino Details</h2>
                </div>
              )} */}

              <div className="casino_details">
                {/* {casinoDetalisData?.data?.map((item, id) => {
                  return (
                    <div key={id}>
                      <div className="casino_name">{item?.name}</div>
                      <div className="casino_switch">
                        <Switch
                          defaultChecked={item?.active}
                          disabled
                          // onChange={() => onChange(item?.casinoId)}
                        />
                      </div>
                    </div>
                  );
                })} */}
              </div>

              <Row className="super_agent sub_super">
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Transaction Password"
                    name="lupassword"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Transaction Password",
                      },
                    ]}>
                    <Input
                      value={LuPassword}
                      type="password"
                      onChange={(e) => handleLupassword(e)}
                      placeholder="Transaction Password"
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item wrapperCol={{ offset: 19, span: 24 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateSuperAgent;
