import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";

import TransactionTable from "../TransactionTable";
import {
  useCreateLedgerMutation,
  useGetLedgerDetailsMutation,
  useLazyFilterbyClientQuery,
} from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode, convertCodeReverse } from "../../../../store/constant";
import { openNotification, openNotificationError } from "../../../../App";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";

const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const AgentTransactions = () => {
  const { name, id, userId } = useParams();
  const { pathname } = useLocation();
  const nav = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [isPolling, setIsPolling] = useState(false);

  const [getClient, result] = useLazyFilterbyClientQuery();
  const [trigger, { data: ledgerDetails }] = useGetLedgerDetailsMutation();
  const [createTran, { data: createTranstions, error, isLoading }] =
    useCreateLedgerMutation();

  /** Handlers */
  const handleBackbtn = () => nav(-1);

  const onSelectDate = (_, dateString) => setStartDate(dateString);

  const onFinish = (values) => {
    const payload = {
      userId: convertCodeReverse(values?.client),
      collection: values?.collection,
      amount: Number(values?.amount),
      paymentType: values?.payment_type,
      remark: values?.remark,
    };

    createTran(payload);
    form.resetFields();
  };

  /** Effects */
  useEffect(() => {
    getClient({ userType: id });
  }, [id, getClient]);

  useEffect(() => {
    if (createTranstions?.status) {
      openNotification(createTranstions?.message);
      setIsPolling(true);

      const timeoutId = setTimeout(async () => {
        await trigger({
          userId: userId
            ? convertCodeReverse(userId)
            : convertCodeReverse(clientId),
          transactiontype: "All",
        });
        setIsPolling(false);
      }, 2000);

      form.resetFields();

      return () => clearTimeout(timeoutId);
    } else if (createTranstions?.status === false || error?.data?.message) {
      openNotificationError(createTranstions?.message || error?.data?.message);
    }
  }, [createTranstions, error, trigger, form]);

  useEffect(() => {
    if (userId) {
      trigger({ userId: convertCodeReverse(userId), transactiontype: "All" });
    }
  }, [userId, trigger]);

  useEffect(() => {
    form.resetFields();
    setClientId("");
  }, [pathname, form]);

  useEffect(() => {
    if (result?.data?.data?.length && userId) {
      const matchedClient = result.data.data.find(
        (user) => String(user.userId) === String(userId)
      );

      if (matchedClient) {
        form.setFieldsValue({ client: convertCode(matchedClient.userId) });
        setClientId(matchedClient.userId);
        trigger({
          userId: matchedClient.userId,
          transactiontype: "All",
        });
      }
    }
  }, [result, userId, trigger, form]);

  return (
    <div className="agent_transactions" style={{ position: "relative" }}>
      {isPolling && <CustomLoading />}
      {contextHolder}
      <Card
        className="sport_detail ledger_data cash_data"
        title={`${name?.replace("-", " ")} Transactions`}
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="" style={{ padding: "12px"}}>
          <Form
            className="form_data mt-16 cash_data"
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              collection: "CA1 CASH",
              ledger_type: "All",
            }}
            autoComplete="off">
            <Row gutter={[16, 16]}>
              {/* Client */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="client"
                  name="client"
                  rules={[{ required: true, message: "Please select Client" }]}>
                  <Select
                    placeholder="Select Client"
                    showSearch
                    value={clientId}
                    allowClear
                    onClear={() => {
                      setClientId("");
                      nav(`/client/txn-super/${name}/${id}`);
                    }}
                    onSearch={(value) => value && getClient({ userType: id })}
                    onSelect={(value) => {
                      setClientId(value);
                      nav(`/client/txn-super/${name}/${id}/${value}`);
                      trigger({
                        userId: convertCodeReverse(value),
                        transactiontype: "All",
                      });
                    }}
                    options={
                      result?.data?.data?.map((user) => ({
                        label: `${user.userName} (${convertCode(user.userId)})`,
                        value: convertCode(user.userId),
                      })) || []
                    }
                  />
                </Form.Item>
              </Col>

              {/* Collection */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="Collection"
                  name="collection"
                  initialValue="CA1 CASH"
                  rules={[
                    { required: true, message: "Please select Collection" },
                  ]}>
                  <Select defaultValue="CA1 CASH" allowClear>
                    <Option value="CA1 CASH">Cash A/C</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Date */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item label="Date" name="Date">
                  <DatePicker
                    required
                    onChange={onSelectDate}
                    className="transations_date"
                    format={dateFormat}
                    defaultValue={dayjs(startDate)}
                  />
                </Form.Item>
              </Col>

              {/* Amount */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: "Enter Amount" }]}>
                  <Input type="number" placeholder="Enter Amount" />
                </Form.Item>
              </Col>

              {/* Payment Type */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="Payment Type"
                  name="payment_type"
                  rules={[{ required: true, message: "Please Select One" }]}>
                  <Select placeholder="Payment Type" allowClear>
                    <Option value="payment - dena">PAYMENT - DIYA</Option>
                    <Option value="payment - lena">PAYMENT - LIYA</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Remark */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="Remark"
                  name="remark"
                  rules={[{ required: true, message: "Enter Remark" }]}>
                  <Input type="text" placeholder="Remarks" />
                </Form.Item>
              </Col>

              {/* Ledger Type */}
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <Form.Item
                  label="Ledger Type"
                  name="ledger_type"
                  rules={[{ required: true, message: "Please Select One" }]}>
                  <Select placeholder="All" allowClear>
                    <Option value="All">All</Option>
                    <Option value="Diamond">Diamond Casino</Option>
                    <Option value="International">International Casino</Option>
                    <Option value="Settle">Settle</Option>
                    <Option value="Cricket">Cricket</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button loading={isLoading} type="primary" htmlType="submit" style={{ borderRadius: "8px"}}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div
        aria-hidden="true"
        style={{ height: 24, backgroundColor: "#eeeeef" }}
      />
      <Card className="sport_detail ledger_data">
        {ledgerDetails && (
          <TransactionTable
            trigger={trigger}
            clientId={clientId}
            data={ledgerDetails?.data}
          />
        )}
      </Card>
    </div>
  );
};

export default AgentTransactions;
