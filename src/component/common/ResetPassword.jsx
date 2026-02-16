import { Button, Form, Input, Modal, message } from "antd";
import { useEffect } from "react";
import { useGetUpdatePasswordMutation } from "../../store/service/userlistService";
import { useParams } from "react-router-dom";
import { convertCode } from "../../store/constant";

const ResetPassword = ({
  isDepositeModalOpen,
  setOpenResetPass,
  data,
  userId,
  userType,
}) => {
  const [form] = Form.useForm();
  const subdomain = window.location.hostname.split(".")[1];
  const sub = window.location.hostname.split(".")[2];
  const domainLink = {
    1: `${subdomain}.${sub}`,
    2: `agent.${subdomain}.${sub}`,
    3: `super.${subdomain}.${sub}`,
    4: `master.${subdomain}.${sub}`,
    5: `madmin.${subdomain}.${sub}`,
    6: `admin.${subdomain}.${sub}`,
  };

  const [trigger, { isLoading }] = useGetUpdatePasswordMutation();
  const { userTyep } = useParams(); // Not used, but kept if you need later

  const handleDepositeCancel = () => {
    form.resetFields();
    setOpenResetPass(false);
  };

  // Fallback for iOS / Safari
  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      message.success("Copied using fallback method!");
    } catch (err) {
      message.error("Copy not supported on this browser.");
    }
    document.body.removeChild(textarea);
  };

  const handleDepositeOk = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (err) {
      return;
    }

    const newPassword = values?.password || data?.password;
    const payload = {
      userId,
      newPassword,
      otp: data?.otp,
    };

    let passwordText = `New Password
LINK : ${domainLink[Number(userType)]}
ID   : ${convertCode(userId)}
PW   : ${newPassword}`;

    if (Number(userType) !== 1) {
      passwordText += `\nOTP  : ${data?.otp}`;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(passwordText);
      } else {
        fallbackCopy(passwordText);
      }
      message.success("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      fallbackCopy(passwordText);
    }

    // Call API after copy
    try {
      const res = await trigger(payload).unwrap();
      if (res?.status) {
        // message.success("Password updated!");
        setOpenResetPass(false);
      } else {
        message.error(res?.message || "Failed to update password");
      }
    } catch (err) {
      console.error("API error:", err);
      message.error("Something went wrong while updating password.");
    }
  };

  useEffect(() => {
    if (!isDepositeModalOpen) return;
    const nextPassword = data?.password || "";
    form.setFieldsValue({
      password: nextPassword,
      confirmPassword: nextPassword,
    });
  }, [data?.password, form, isDepositeModalOpen]);

  return (
    <Modal
      className="modal_reset_pass"
      destroyOnClose
      title={
        <h1>
          <span>Reset Password for {convertCode(userId)}</span>
        </h1>
      }
      open={isDepositeModalOpen}
      onOk={handleDepositeOk}
      onCancel={handleDepositeCancel}
      confirmLoading={isLoading}
      footer={[
        <Button
          key="cancel"
          className="pri_button reset_cancel_button"
          onClick={handleDepositeCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          className="pri_button"
          type="primary"
          onClick={handleDepositeOk}
          loading={isLoading}>
          Submit & Copy
        </Button>,
      ]}>
      <Form className="reset_pass_form" form={form} layout="vertical">
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter a password" },
            { min: 4, message: "Password must be at least 4 characters" },
          ]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm the password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm Password does not match")
                );
              },
            }),
          ]}>
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => (
            <div className="reset_pass_info">
              <div className="reset_pass_info_title">New Password</div>
              <div className="reset_pass_info_item">
                <span>Link :</span> {domainLink[Number(userType)]}
              </div>
              <div className="reset_pass_info_item">
                <span>Username :</span> {convertCode(userId)}
              </div>
              <div className="reset_pass_info_item">
                <span>Password :</span> {getFieldValue("password")}
              </div>
              {Number(userType) !== 1 && (
                <div className="reset_pass_info_item">
                  <span>OTP :</span> {data?.otp}
                </div>
              )}
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPassword;
