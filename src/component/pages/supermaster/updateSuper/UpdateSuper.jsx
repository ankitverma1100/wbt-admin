import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import "./UpdateSuper.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useAppDetailsAllowedForChangeQuery,
  useAppDetailsQuery,
  useUpdateUserMutation,
} from "../../../../store/service/userlistService";
import { convertCode } from "../../../../store/constant";

const updateName = {
  admin: "Admin",
  subAdmin: "Mini Admin",
  superMaster: "Master",
  master: "Super",
  dealer: "Agent",
  client: "Client",
};

const getRoleKeyFromUserId = (value = "") => {
  const userId = value.toUpperCase();
  if (userId.includes("AD")) return "admin";
  if (userId.includes("SUB")) return "subAdmin";
  if (userId.includes("M")) return "superMaster";
  if (userId.includes("SA")) return "master";
  if (userId.includes("A")) return "dealer";
  return "client";
};

const getUpperRoleKey = (roleKey) => {
  switch (roleKey) {
    case "client":
      return "dealer";
    case "dealer":
      return "master";
    case "master":
      return "superMaster";
    case "superMaster":
      return "subAdmin";
    case "subAdmin":
      return "admin";
    case "admin":
      return "my";
    default:
      return "my";
  }
};

const getFieldValue = (data, roleKey, suffix, fallback = 0) => {
  if (!data) return fallback;
  if (!roleKey || roleKey === "client") {
    const baseKey = `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`;
    return data?.[baseKey] ?? fallback;
  }
  const key = `${roleKey}${suffix}`;
  return data?.[key] ?? fallback;
};

const UpdateSuper = () => {
  const { userId } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [data, setData] = useState();

  const [trigger, { data: updateData, isLoading }] = useUpdateUserMutation();
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUserRoleKey = getRoleKeyFromUserId(currentUserId);
  const { data: resuilt } = useGetUserQuery(
    { userId },
    { refetchOnMountOrArgChange: true }
  );

  const editUserId = resuilt?.data?.userId || userId || "";
  const roleKey = getRoleKeyFromUserId(editUserId);
  const upperRoleKey = getUpperRoleKey(roleKey);
  const isAdminRole = roleKey === "admin";
  const isSubAdminOrSuperMaster =
    roleKey === "subAdmin" || roleKey === "superMaster";
  const isClient = roleKey === "client";
  const isDirectChild = currentUserRoleKey === upperRoleKey;
  const parentLabel =
    upperRoleKey === "my"
      ? "My"
      : updateName?.[upperRoleKey] || "Parent";
  const userTypeLabel = updateName?.[roleKey] || "User";

  const getUserField = (fieldSuffix) =>
    getFieldValue(resuilt?.data, roleKey, fieldSuffix, 0);
  const getUserUpper = (fieldSuffix) =>
    getFieldValue(resuilt?.data, upperRoleKey, fieldSuffix, 0);
  const getMyField = (fieldSuffix, myKey) =>
    isDirectChild
      ? resuilt?.data?.[myKey] ?? 0
      : getUserUpper(fieldSuffix);
  const appIdChangeAllowedByUpline = Boolean(
    resuilt?.data?.appIdChangeAllowed
  );
  const { data: appDetails } = useAppDetailsQuery(undefined, {
    skip: !isAdminRole,
  });
  const { data: appDetailsAllowedForChange } =
    useAppDetailsAllowedForChangeQuery(undefined, {
      skip: !isSubAdminOrSuperMaster,
    });
  const appOptions = isAdminRole
    ? appDetails?.data
    : appDetailsAllowedForChange?.data;
  const showAppUrl =
    isAdminRole || (isSubAdminOrSuperMaster && appIdChangeAllowedByUpline);

  useEffect(() => {
    if (resuilt?.status) {
      console.log("[UpdateSuper] Debug", {
        currentUserId,
        currentUserRoleKey,
        editUserId,
        roleKey,
        upperRoleKey,
        isDirectChild,
        userTypeLabel,
        parentLabel,
      });
      setData(resuilt?.data);
      const userCom =
        resuilt?.data?.matchCommission > 0 ||
        resuilt?.data?.sessionCommision > 0
          ? "bbb"
          : "no-comm";
      const otherCom =
        getUserUpper("SessionCommision") > 0 ||
        getUserUpper("MatchCommission") > 0
          ? "bbb"
          : "no-comm";
      const isComm = isClient ? userCom : otherCom;
      const myComm =
        getMyField("SessionCommision", "mySessionCommision") > 0 ||
        getMyField("MatchCommission", "myMatchCommission") > 0
          ? "bbb"
          : "no-comm";
      setCommType(isComm);

      // ✅ Set form values after API data load
      form.setFieldsValue({
        userId: convertCode(resuilt?.data?.userId),
        name: resuilt?.data?.userName,
        reference: resuilt?.data?.reference,
        number: resuilt?.data?.contact,
        password: "******",
        comm_type: isComm,
        commType: myComm === "bbb" ? "Bet by Bet" : "No Comm",
        matchcomm: getMyField("MatchCommission", "myMatchCommission"),
        super_match_comm: getUserField("MatchCommission"),
        sesscomm: getMyField("SessionCommision", "mySessionCommision"),
        super_sess_comm: getUserField("SessionCommision"),
        sess_comm: getUserField("CasinoCommission"),
        super_casino_share: getMyField("CasinoPartnership", "myCasinoPartnership"),
        matchShare: getMyField("Partnership", "myPartnership"),
        super_casino_comm: getMyField("CasinoCommission", "myCasinoCommission"),
        supercasinocomm: getUserField("CasinoPartnership"),
        super_matka_share: getMyField("MatkaPartnership", "myMatkaPartnership"),
        matka_share: getUserField("MatkaPartnership"),
        super_matka_comm: getMyField("MatkaCommission", "myMatkaCommission"),
        matka_comm: getUserField("MatkaCommission"),
        share: getUserField("Partnership"),
        match_share: resuilt?.data?.matchShare,
        appId: resuilt?.data?.appId,
        appIdChangeAllowed: Boolean(resuilt?.data?.appIdChangeAllowed),
      });

    }
  }, [resuilt?.data]);

  const onFinish = (values) => {
    const isNoComm = values?.comm_type === "no-comm";

    const userData = {
      userId: userId,
      userName: values?.name,
      reference: values?.reference,
      password: resuilt?.data?.password,
      contact: values.number,
      flatShare: false,
      casinoPlay: true,
      mobileAppCharge: getUserField("MobileAppCharge"),
      commissionType: isNoComm ? 1 : 2,
      partnership: values?.share,
      casinoPartnership: values?.supercasinocomm,
      internationalCasinoPartnership: getUserField("IntlCasinoPartnership"),
      matkaPartnership: values?.matka_share ?? 0,
      matchCommission: isNoComm ? 0 : values?.super_match_comm,
      sessionCommission: isNoComm ? 0 : values?.super_sess_comm,
      casinoCommission:  values?.sess_comm,
      matkaCommission:  values?.matka_comm,
    };
    if (isAdminRole && !appIdChangeAllowedByUpline) {
      userData.appId = values?.appId;
    }
    if (
      (isAdminRole || isSubAdminOrSuperMaster) &&
      appIdChangeAllowedByUpline
    ) {
      userData.appId = values?.appId;
      userData.appIdChangeAllowed = values?.appIdChangeAllowed;
    }
    trigger(userData);
  };

  useEffect(() => {
    if (!updateData) return;

    if (updateData?.status) {
      api.success({
        message: updateData?.message || "User updated successfully",
        placement: "top",
        closeIcon: false,
      });

      setTimeout(() => {
        nav(-1);
      }, 1500);
    } else if (updateData?.message) {
      api.error({
        message: updateData?.message,
        placement: "top",
        closeIcon: false,
      });
    }
  }, [updateData]);

  const onCommissionType = (value) => {
    console.log(value, "valuevalue");
    setCommType(value);
    if (value !== "bbb") {
      form.setFieldsValue({
        super_match_comm: 0,
        super_sess_comm: 0,
        sess_comm: 0,
        matka_comm: 0,
      });
    }
  };

  const { Option } = Select;

  return (
    <>
      {contextHolder}
      <div className="main_live_section update_user update_super">
        <div className="update_super_header">
          <div className="update_super_heading">
            Edit {updateName?.[roleKey]}
          </div>
          <button className="update_super_back" onClick={() => nav(-1)}>
            Back
          </button>
        </div>

        <div className="ant-spin-nested-loading update_super_body">
          {isLoading && (
            <div className="spin_icon">
              <Spin size="large" />
            </div>
          )}

          <Form
            form={form}
            className="form_data update_super_form"
            name="update_super_form"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              userId: convertCode(resuilt?.data?.userId),
              name: resuilt?.data?.userName,
              reference: resuilt?.data?.reference,
              number: resuilt?.data?.contact,
              password: "******",
              comm_type: commType,
            }}>
            <div className="update_super_section">
              <div className="update_super_section_title">User Info</div>
              <Row className="super_agent update_agent update_super_grid" gutter={[18, 14]}>
                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label="Reference"
                    name="reference"
                    rules={[{ required: true }]}>
                    <Input placeholder="Enter Reference" />
                  </Form.Item>
                </Col>
                {showAppUrl && (
                  <Col lg={12} md={12} xs={24}>
                    <Form.Item
                      label="App Url"
                      name="appId"
                      rules={[
                        {
                          required: true,
                          message: "Please select app details",
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
                )}
                {isAdminRole && appIdChangeAllowedByUpline && (
                  <Col lg={12} md={12} xs={24}>
                    <Form.Item
                      label="App Id Change Allowed"
                      name="appIdChangeAllowed"
                      rules={[{ required: true, message: "Please select value" }]}>
                      <Select
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </div>

            <div className="update_super_section">
              <div className="update_super_section_title">
                Match and Share Info
              </div>
              <Row className="super_agent update_agent update_super_grid" gutter={[18, 14]}>
              {!isClient && (
                <>
                  <Col lg={12} md={12} xs={24}>
                    <Form.Item
                      label={`${parentLabel} Match Share (%)`}
                      name="matchShare">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>{" "}
                  <Col lg={12} md={12} xs={24}>
                    <Form.Item
                      label={`${userTypeLabel} Match Share (%)`}
                      name="share"
                      rules={[
                        { required: true, message: "Please enter match comm" },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Comm Type`}
                  name="commType"
                  rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${userTypeLabel} Comm Type`}
                  name="comm_type"
                  rules={[{ required: true }]}>
                  <Select onChange={onCommissionType} value={commType}>
                    <Option value="no-comm">No Comm</Option>
                    <Option value="bbb">Bet by Bet</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Match Comm (%)`}
                  name="matchcomm">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${userTypeLabel} Match Comm (%)`}
                  name="super_match_comm"
                  rules={[
                    {
                      required: commType === "bbb",
                      message: "Please enter match comm",
                    },
                  ]}>
                  <Input disabled={commType !== "bbb"} />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Sess Comm (%)`}
                  name="sesscomm">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${userTypeLabel} Sess Comm (%)`}
                  name="super_sess_comm"
                  rules={[
                    {
                      required: commType === "bbb",
                      message: "Please enter session comm",
                    },
                  ]}>
                  <Input disabled={commType !== "bbb"} />
                </Form.Item>
              </Col>
              </Row>
            </div>

            <div className="update_super_section">

              <Row className="super_agent update_agent update_super_grid" gutter={[18, 14]}>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Casino Share (%)`}
                  name="super_casino_share">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${userTypeLabel} Casino Share (%)`}
                  name="supercasinocomm"
                  rules={[
                    { required: true, message: "Please enter casino share" },
                  ]}>
                  <Input disabled={isClient} />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Casino Comm (%)`}
                  name="super_casino_comm">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  label={`${userTypeLabel} Casino Comm (%)`}
                  name="sess_comm"
                  rules={[
                    { required: true, message: "Please enter casino comm" },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            </div>

            <div className="update_super_section">
              <div className="update_super_section_title">
                Matka Share and Commission
              </div>
              <Row className="super_agent update_agent update_super_grid" gutter={[18, 14]}>
                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label={`${parentLabel} Matka Share (%)`}
                    name="super_matka_share">
                    <Input type="number" disabled />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label={`${userTypeLabel} Matka Share (%)`}
                    name="matka_share"
                    rules={[
                      { required: true, message: "Please enter matka share" },
                    ]}>
                  <Input disabled={isClient} />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label={`${parentLabel} Matka Comm (%)`}
                    name="super_matka_comm">
                    <Input type="number" disabled />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} xs={24}>
                  <Form.Item
                    label={`${userTypeLabel} Matka Comm (%)`}
                    name="matka_comm"
                    rules={[
                      {
                        required: commType === "bbb",
                        message: "Please enter matka commission",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="update_super_actions">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateSuper;
