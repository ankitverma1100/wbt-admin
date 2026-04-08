import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  notification,
} from "antd";
import "./Deposit.scss";
import { useBlockBettingMutation } from "../../store/service/supermasteAccountStatementServices";
import { openNotification, openNotificationError } from "../../App";

const BetlockModal = ({
  betStatus,
  userIdData,
  handleClose,
  accStatus,
  paginationTotal,
  index,
  id,
  userType,
  getData,
}) => {
  const [form] = Form.useForm();

  console.log(betStatus,accStatus, "dfsddas")

  const [trigger, { data, error, isLoading }] = useBlockBettingMutation();

  const onFinish = (values) => {
    const bettingPayload = {
      userId: userIdData,
      betLock: values?.type == "bet" ? !betStatus : betStatus,
      accountLock: values?.type == "acc" ? !accStatus : accStatus,
      isactive: true,
      liveCasinoLock: false,
      virtualCasinoLock: false,
      lupassword: values?.password,
    };
    trigger(bettingPayload);
  };

  useEffect(() => {
    if (data?.status === true) {
      getData({
        userType: userType,
        parentUserId: id || null,
        noOfRecords: paginationTotal,
        index: index,
        userId: "",
      });
      openNotification(data?.message);
      form?.resetFields();
      handleClose();
    } else if (data?.status === false || error?.data?.message) {
      openNotificationError(data?.message || error?.data?.message);
      handleClose();
    }
  }, [data?.status, error]);

  return (
    <>
      <div className="ant-spin-nested-loading">
        {isLoading && (
          <>
            <Spin
              className="spin_icon betting_icon comp_spin"
              size="large"></Spin>
          </>
        )}
        <div className="form_modals">
          <Form onFinish={onFinish} form={form} autoComplete="off">
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Select List",
                },
              ]}>
              <Select
                defaultValue="Select Betting"
                options={[
                  {
                    value: "bet",
                    label: (
                      <div>
                        {betStatus ? "UnBlock Betting" : "Block Betting"}
                      </div>
                    ),
                  },
                  // {
                  //   value: "acc",
                  //   label: (
                  //     <div>
                  //       {accStatus ? "UnBlock Account" : "Account Block"}
                  //     </div>
                  //   ),
                  // },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}>
              <Input placeholder="Enter Current Password" type="password" />
            </Form.Item>

            <div className="deposit_btn">
              <Form.Item>
                <Button
                  style={{ backgroundColor: "rgb(115, 118, 111)" }}
                  onClick={() => handleClose()}>
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default BetlockModal;
