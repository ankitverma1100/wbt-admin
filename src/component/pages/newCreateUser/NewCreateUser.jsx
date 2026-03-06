import { useNavigate, useParams } from "react-router-dom";
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
import "./NewCreateUser.scss";

import {
  useGetCreateUserMutation,
  useGetUserDetailsQuery,
  useUserIdForSearchQuery,
} from "../../../store/service/supermasteAccountStatementServices";
import MatchCommission from "./MatchCommission";
import CasinoCommission from "./CasinoCommission";
import SelectUpline from "./SelectUpline";
import { convertCodeReverse } from "../../../store/constant";
import {
  useAppDetailsAllowedForChangeQuery,
  useAppDetailsQuery,
} from "../../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../../App";

const createName = {
  7: "Admin",
  6: "madmin",
  5: "Master",
  4: "Super",
  3: "Agent",
  2: "Client",
};

const NewCreateUser = () => {
  const [userData, setUserData] = useState({});
  const [commiType, setCommiType] = useState("nocomm");
  const [, contextHolder] = notification.useNotification();
  const [parentId, setParentId] = useState(null);
  const [form] = Form.useForm();

  const commissionType = (value) => {
    setCommiType(value);
  };

  const { id } = useParams();
  const handleChange = (value) => {};
  const handleSelect = (value) => {
    setParentId(value);
  };

  var mobileNum = /^[6-9][0-9]{9}$/;

  const { data: appDeatis } = useAppDetailsQuery(undefined, {
    skip: Number(id) !== 7,
  });
  const { data: appDetailsAllowedForChange } =
    useAppDetailsAllowedForChangeQuery(undefined, {
      skip: ![6, 5].includes(Number(id)),
    });

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const currentUsername = localStorage.getItem("username") || "";
  const { data: userDetails } = useGetUserDetailsQuery({
    userId: parentId ? convertCodeReverse(parentId) : userId,
  });
  const { data: downlineData } = useUserIdForSearchQuery({ userType: id });

  const [createUser, { data: UserList, error, isLoading }] =
    useGetCreateUserMutation();
  const appOptions =
    Number(id) === 7 ? appDeatis?.data : appDetailsAllowedForChange?.data;

  const handleNumberWheel = (event) => {
    if (event?.target && typeof event.target.blur === "function") {
      event.target.blur();
    }
  };

  useEffect(() => {
    const handleWheelWhileNumberFocused = (event) => {
      const activeElement = document.activeElement;
      if (!activeElement || activeElement.tagName !== "INPUT") {
        return;
      }
      const inputType = activeElement.getAttribute("type");
      const isNumberInput = inputType === "number";
      const isAntNumberInput = activeElement.classList?.contains(
        "ant-input-number-input"
      );
      if (isNumberInput || isAntNumberInput) {
        event.preventDefault();
        activeElement.blur();
      }
    };

    window.addEventListener("wheel", handleWheelWhileNumberFocused, {
      passive: false,
    });
    return () => {
      window.removeEventListener("wheel", handleWheelWhileNumberFocused, {
        passive: false,
      });
    };
  }, []);

  const onFinish = (values) => {
    const {
      Name,
      reference,
      password,
      mobile,
      matchShare,
      cassino_Share,
      cassino_Comm,
      sess_comm,
      Match_comm,
      matkaShare,
      matkaComm,
      Coins,
      appId,
      appIdChangeAllowed,
      loginOtpDisabled,
    } = values;
    const appIdChangeAllowedByUpline = Boolean(
      userDetails?.data?.appIdChangeAllowed
    );
    const userData = {
      username: Name,
      reference: reference,
      password: password,
      contact: mobile,
      mobileAppCharge: "0",
      partnership: id === "2" ? userDetails?.data?.myPartnership : matchShare,
      casinoPartnership:
        id === "2" ? userDetails?.data?.myCasinoPartnership : cassino_Share,
      internationalCasinoPartnership: 0,
      commissionType: commiType === "bbb" ? "2" : "1",
      matchCommission: commiType === "bbb" ? Match_comm : 0,
      sessionCommission: commiType === "bbb" ? sess_comm : 0,
      casinoCommission: commiType === "bbb" ? cassino_Comm : 0,
      matkaPartnership:
        id === "2" ? userDetails?.data?.myMatkaPartnership : matkaShare ?? 0,
      matkaCommission: commiType === "bbb" ? matkaComm : 0,
      limit: Coins,
      parentIdForUserCreation: convertCodeReverse(parentId),
      ...(Number(id) === 7 && { loginOtpDisabled: loginOtpDisabled }),
    };
    if (Number(id) === 7 && !appIdChangeAllowedByUpline) {
      userData.appId = appId;
    }
    if ([7, 6, 5].includes(Number(id)) && appIdChangeAllowedByUpline) {
      userData.appId = appId;
      userData.appIdChangeAllowed = appIdChangeAllowed;
    }
    createUser(userData);
  };

  useEffect(() => {
    if (UserList?.status) {
      openNotification(UserList?.message);
      form?.resetFields();
      nav(-1);
    } else if (UserList?.status === false || error?.data?.message) {
      openNotificationError(UserList?.message || error?.data?.message);
    }
  }, [UserList, error]);

  const nav = useNavigate();

  return (
    <div className="create_user_section">
      {contextHolder}
      {Number(userType) != Number(id) && (
        <SelectUpline
          data={downlineData?.data}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      )}
      {(parentId?.length > 0 || Number(userType) == Number(id)) && (
        <div className="main_live_section create_user_panel">
          <div className="create_user_header">
            <div className="create_user_heading">
              Create {createName?.[id] ?? "User"}
            </div>
            <button className="create_user_back" onClick={() => nav(-1)}>
              Back
            </button>
          </div>
          <div className="ant-spin-nested-loading create_user_body">
            {isLoading ? (
              <div className="spin_icon">
                <Spin size="large" />
              </div>
            ) : (
              ""
            )}
            <Form
              className="form_data create_user_form"
              form={form}
              name="basic"
              layout="vertical"
              // initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              fields={[
                {
                  name: "My Coins",
                  value: userDetails?.data?.balance,
                },
                {
                  name: "reference",
                  value: currentUsername,
                },
                {
                  name: "code",
                  value: "d0001",
                },
                {
                  name: "MyMatchShare",
                  value: userDetails?.data?.myPartnership,
                },
                {
                  name: "MyMatkaShare",
                  value: userDetails?.data?.myMatkaPartnership,
                },
                {
                  name: "cassinoShare",
                  value: userDetails?.data?.myCasinoPartnership,
                },
                {
                  name: "MyCommtype",
                  value:
                    userDetails?.data?.myPartnership > 0 ||
                    userDetails?.data?.myCasinoPartnership > 0
                      ? "BetByBet"
                      : "NoComm",
                },
                {
                  name: "cassinoComm",
                  value: userDetails?.data?.myCasinoCommission,
                },
                {
                  name: "My_Match_comm",
                  value: userDetails?.data?.myMatchCommission,
                },
                {
                  name: "My_sess_comm",
                  value: userDetails?.data?.mySessionCommision,
                },
                {
                  name: "MyMatkaComm",
                  value:
                    userDetails?.data?.myMatkaCommision ??
                    userDetails?.data?.myMatkaCommission,
                },
                {
                  name: "cassino_Comm",
                  value: commiType !== "bbb" ? 0 : "",
                },
                {
                  name: "matkaComm",
                  value: commiType !== "bbb" ? 0 : "",
                },
                {
                  name: "shareType",
                  value: "Fixed",
                },
                {
                  name: "loginOtpDisabled",
                  value: false,
                },
                {
                  name: "appIdChangeAllowed",
                  value: false,
                },
              ]}>
              <div>
                <div className="create_user_section_block">
                  <div className="create_user_section_title">User Info</div>
                  <Row
                    className="super_agent create_user_grid"
                    gutter={[18, 14]}>
                  <Col xl={12} lg={12} md={12} xs={12}>
                    <Form.Item
                      label="Name"
                      name="Name"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        onKeyDown={(e) => {
                          if (
                            !e.key.match(/^[a-zA-Z ]$/) &&
                            e.key.length === 1
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} xs={12}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your reference!",
                        },
                      ]}
                      label="Reference"
                      name="reference">
                      <Input type="text" placeholder="Enter Reference" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your reference!",
                        },
                      ]}
                      label="My Coins"
                      name="My Coins">
                      <Input type="number" disabled onWheel={handleNumberWheel} />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Item
                      label="Coins"
                      name="Coins"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please input your coins!",
                        },
                        {
                          validator: async (_, values) => {
                            if (
                              userDetails?.data?.balance < values &&
                              values != "" &&
                              values != null
                            ) {
                              return Promise.reject(
                                new Error(
                                  `Coins must be less than ${userDetails?.data?.balance}`
                                )
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
                        onWheel={handleNumberWheel}
                        onKeyDown={(e) => {
                          if (e.key == ".") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Item
                      label="Contact No."
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Contact Number",
                        },
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
                        onWheel={handleNumberWheel}
                        onKeyDown={(e) => {
                          if (!e.key.match(/^[0-9]$/) && e.key.length === 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={12} md={12} xs={12}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password",
                        },
                      ]}>
                      <Input type="password" placeholder="Password" />
                    </Form.Item>
                  </Col>
                  {id !== "2" && (
                    <Col lg={12} md={12} xs={12}>
                      <Form.Item
                        label="Share Type"
                        name="shareType"
                        placeholder="Select share type"
                        rules={[
                          {
                            required: true,
                            message: "Please select your share type!",
                          },
                        ]}>
                        <Select
                          options={[
                            {
                              value: "Fixed",
                              label: "Fixed",
                            },
                            {
                              value: "Change",
                              label: "Change",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {(Number(id) === 7 ||
                    ([6, 5].includes(Number(id)) &&
                      userDetails?.data?.appIdChangeAllowed)) && (
                    <>
                      <Col lg={12} md={12} xs={12}>
                        <Form.Item
                          label="App Url"
                          name="appId"
                          placeholder="Select App Details"
                          rules={[
                            {
                              required: true,
                              message: "Please select your app details!",
                            },
                          ]}>
                          <Select
                            options={appOptions?.map((item) => ({
                              value: item.id ?? item.appId,
                              label: item.appName,
                            }))}
                          />
                        </Form.Item>
                      </Col>
                      {userDetails?.data?.appIdChangeAllowed &&
                        Number(id) === 7 && (
                        <Col lg={12} md={12} xs={12}>
                          <Form.Item
                            label="App Id Change Allowed"
                            name="appIdChangeAllowed"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please select app id change allow status!",
                              },
                            ]}>
                            <Select
                              options={[
                                {
                                  value: true,
                                  label: "Yes",
                                },
                                {
                                  value: false,
                                  label: "No",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        )}
                      {userDetails?.data?.loginOtpDisabled && (
                        <Col lg={12} md={12} xs={12}>
                          <Form.Item
                            label="Login Otp Disabled"
                            name="loginOtpDisabled"
                            rules={[
                              {
                                required: true,
                                message: "Please select login OTP status!",
                              },
                            ]}>
                            <Select
                              options={[
                                {
                                  value: true,
                                  label: "Yes",
                                },
                                {
                                  value: false,
                                  label: "No",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </>
                  )}
                  </Row>
                </div>
                <div className="create_user_section_block">
                  <MatchCommission
                    createName={createName[id]}
                    commissionType={commissionType}
                    commiType={commiType}
                    data={userDetails?.data}
                    userData={userData}
                  />
                </div>
                <div className="create_user_section_block">
                  <CasinoCommission
                    createName={createName[id]}
                    commiType={commiType}
                  />
                </div>
                <div className="create_user_section_block">
                  <div>
                    <h2 className="match_share">
                      {createName[id]} Matka Share and Commission
                    </h2>
                  </div>
                  <Row
                    className="super_agent sub_super create_user_grid"
                    gutter={[18, 14]}>
                    {id !== "2" && (
                      <>
                        <Col lg={12} md={12} xs={12}>
                          <Form.Item
                            label="My Matka Share (%)"
                            name="MyMatkaShare"
                            required={false}>
                            <InputNumber
                              className="number_field"
                              disabled
                              onWheel={handleNumberWheel}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={12} xs={12}>
                          <Form.Item
                            label="Matka Share (%)"
                            name="matkaShare"
                            rules={[
                              {
                                required: true,
                                message: "Please enter matka share",
                              },
                            ]}>
                            <InputNumber
                              className="number_field"
                              min={0}
                              step="1"
                              type="number"
                              placeholder="Enter Matka Share"
                              onWheel={handleNumberWheel}
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
                        label="My Matka Comm (%)"
                        name="MyMatkaComm"
                        required={false}>
                        <InputNumber
                          className="number_field"
                          disabled
                          onWheel={handleNumberWheel}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                      <Form.Item
                        label="Matka Comm (%)"
                        name="matkaComm"
                        rules={[
                          {
                            required: commiType === "bbb",
                            message: "Please enter matka commission",
                          },
                        ]}>
                        <Input
                          placeholder="Matka Commission"
                          disabled={commiType !== "bbb"}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="create_user_actions">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCreateUser;
