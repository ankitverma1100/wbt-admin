import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Popconfirm, Select, Space, notification } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useGetDeletedTranstionMutation } from "../../../store/service/SportDetailServices";
import { convertCodeReverse } from "../../../store/constant";
import { openNotification, openNotificationError } from "../../../App";

const TransactionTable = ({ data, clientId, trigger: triggerTran }) => {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  const { Option } = Select;

  const [trigger, { error }] = useGetDeletedTranstionMutation();
  const [selectedId, setSelectedId] = useState(null); // store clicked transaction ID

  const fetchDeletedTran = () => {
    nav(`/client/deletedlenden/${clientId}`);
  };



  const handleDelete = async () => {
    try {
      if (!selectedId) return;
      await trigger({
        transactionId: selectedId,
        userId: clientId,
      }).unwrap();
      triggerTran({
        userId: convertCodeReverse(clientId),
        transactiontype: "All",
      });
      openNotification("Transaction deleted successfully");
    } catch (error) {
      // openNotificationError("Failed to delete transaction");
    } finally {
      setSelectedId(null); // clear after action
    }
  };

  useEffect(() => {
    if (!error?.data?.status && error?.data?.message) {
      openNotificationError(error?.data?.message);
    }
  }, [error]);

  const totalCreadit = data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  const totalDebit = data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  const totalBalance = totalCreadit - totalDebit;

  const items = (id) => [
    {
      label: (
        <Popconfirm
          description="Are you sure to delete?"
          onConfirm={handleDelete} // Call delete using stored ID
          className="ant-btn-default_no"
          okText="Yes"
          cancelText="No">
          <p
            onClick={(e) => {
              e.preventDefault();
              setSelectedId(id); // store the clicked transaction ID
            }}>
            DELETE
          </p>
        </Popconfirm>
      ),
      key: "0",
    },
  ];

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
           padding: "12px 15px", margin: "0 0 24px 0"
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: 600 }}>
            PAYMENT TYPE <span style={{ color: "red" }}>*</span>
          </label>
          <Select defaultValue="All" style={{ width: "220px" }}>
            <Option value="All">All</Option>
            <Option value="payment - dena">PAYMENT - DIYA</Option>
            <Option value="payment - lena">PAYMENT - LIYA</Option>
          </Select>
        </div>
        <div className="deleted_sec">
          <Button style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: '#78152B',
            fontWeight: '500',
          }} onClick={fetchDeletedTran}>DELETED</Button>
        </div>
      </div>
      <div className="my_ledger" style={{ padding: "12px 15px", margin: "24px 0" }}>
        <div>
          <h3 style={{ color: "red" }}>
            Dena : {totalDebit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3 style={{ color: "rgb(51, 181, 28)" }}>
            Lena : {totalCreadit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3
            style={{  }}
            className={totalBalance >= 0 ? "text_success" : "text_danger"}>
            Balance: {Math.abs(totalBalance)?.toFixed(2)}{" "}
            {totalBalance >= 0 ? "(Lena)" : "(Dena)"}
          </h3>
        </div>
      </div>
      <div className="table_section" style={{ paddingBottom: "20px" }}>
        <table>
          <thead>
            <tr>
              <th
                style={{ whiteSpace: "nowrap", padding: "10px" }}
                className="text-right">
                
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>Date</th>
              <th>DESCRIPTION</th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                DR
              </th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                CR
              </th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                Balance
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>
                REMARK
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>Done By</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((res, idx) => (
                <tr
                  key={res._id || idx}
                  className={res?.paymentType ? "gx-bg-yellow" : ""}>
                  <td>
                    {res?.id && (
                      <Dropdown
                        className="table_dropdown sport_droupdown"
                        menu={{ items: items(res.id), className: "trans" }}
                        trigger={["click", "contextMenu"]}>
                        <p onClick={(e) => e.preventDefault()}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </p>
                      </Dropdown>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {moment(res?.date).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td>
                    {res?.collectionName === "CA1 CASH" ? "CASH" : res?.ledgerType}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {res?.credit}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {res?.debit}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {Math.abs(res?.balance || 0)?.toFixed(2)} (
                    {res?.balance >= 0 ? "Lena" : "Dena"})
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{res?.remark}</td>
                  <td>{res?.performedBy ? res?.performedBy : "SYSTEM"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
