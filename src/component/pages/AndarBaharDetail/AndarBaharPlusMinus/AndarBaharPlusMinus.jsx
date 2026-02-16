import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Table } from "antd";
import { useGetCompletedPlusMinusQuery } from "../../../../store/service/SportDetailServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import "./AndarBaharPlusMinus.scss";

const AndarBaharPlusMinus = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };
  const { date, id } = useParams();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const {
    data: casino,
    isLoading,
    isFetching,
  } = useGetCompletedPlusMinusQuery(
    {
      userId: userId,
      date: date,
      casinoId: id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const formatNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => {
        const label = record?.userId
          ? `${text || "-"} (${record.userId})`
          : text || "-";
        return (
          <span
            className="casino_username"
            onClick={() => {
              !record?.userId?.startsWith("C") && setUserId(record?.userId);
            }}>
            {label}
          </span>
        );
      },
    },
    {
      title: "Casino Amt.",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text) => (
        <span className={text > 0 ? "green" : text < 0 ? "red" : ""}>
          {formatNumber(text)}
        </span>
      ),
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "total",
      align: "center",
      render: (text) => (
        <span className={text > 0 ? "green" : text < 0 ? "red" : ""}>
          {formatNumber(text)}
        </span>
      ),
    },
    {
      title: "Casino Comm",
      dataIndex: "commission",
      key: "commission",
      align: "center",
      render: (text) => (
        <span className={text > 0 ? "green" : text < 0 ? "red" : ""}>
          {formatNumber(text)}
        </span>
      ),
    },
    {
      title: "Total Comm",
      dataIndex: "commission",
      key: "totalComm",
      align: "center",
      render: (text) => (
        <span className={text > 0 ? "green" : text < 0 ? "red" : ""}>
          {formatNumber(text)}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "totalAmount",
      align: "center",
      render: (text, record) => {
        const total = Number(record?.total ?? record?.amount) || 0;
        const commission = Number(record?.commission) || 0;
        const totalAmount = total - commission;
        return (
          <span
            className={
              totalAmount > 0 ? "green" : totalAmount < 0 ? "red" : ""
            }>
            {formatNumber(totalAmount)}
          </span>
        );
      },
    },
    {
      title: "My Share",
      dataIndex: "myShare",
      key: "myShare",
      align: "center",
      render: (text) => (
        <span className={text > 0 ? "green" : text < 0 ? "red" : ""}>
          {formatNumber(text)}
        </span>
      ),
    },
    {
      title: "Net PL",
      dataIndex: "netAmount",
      key: "netAmount",
      align: "center",
      render: (text, record) => {
        const total = Number(record?.total ?? record?.amount) || 0;
        const commission = Number(record?.commission) || 0;
        const fallback = total - commission;
        const netAmount = Number(text);
        const value = Number.isFinite(netAmount) ? netAmount : fallback;
        return (
          <span className={value > 0 ? "green" : value < 0 ? "red" : ""}>
            {formatNumber(value)}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div className="main_live_section list_supers company_resport_casi andar_bahar_plus_minus">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              <p>Company Report</p>
            </div>
            <div className="show_btn">
              {/* <button>Show</button> */}
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <div className="table_section">
          <Table
            className="roulette_table"
            bordered
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            columns={columns}
            dataSource={casino?.data || []}
            pagination={false}
            summary={(pageData) => {
              let totalAmount = 0;
              let totalTotal = 0;
              let totalCommission = 0;
              let totalTotalCommission = 0;
              let totalTotalAmount = 0;
              let totalMyShare = 0;
              let totalNetAmount = 0;

              pageData.forEach(({ amount, commission, total, myShare, netAmount }) => {
                const safeAmount = Number(amount) || 0;
                const safeCommission = Number(commission) || 0;
                const safeTotal = Number(total) || safeAmount;
                const safeMyShare = Number(myShare) || 0;
                const safeNetAmount = Number(netAmount) || 0;
                const safeTotalAmount = safeTotal - safeCommission;

                totalAmount += safeAmount;
                totalTotal += safeTotal;
                totalCommission += safeCommission;
                totalTotalCommission += safeCommission;
                totalTotalAmount += safeTotalAmount;
                totalMyShare += safeMyShare;
                totalNetAmount += safeNetAmount || safeTotalAmount;
              });

              return (
                <Table.Summary.Row className="dateHiglight">
                  <Table.Summary.Cell index={0} style={{ fontWeight: "bold" }}>
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={1}
                    className={totalAmount > 0 ? "green" : totalAmount < 0 ? "red" : ""}>
                    {formatNumber(totalAmount)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    className={totalTotal > 0 ? "green" : totalTotal < 0 ? "red" : ""}>
                    {formatNumber(totalTotal)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={3}
                    className={
                      totalCommission > 0 ? "green" : totalCommission < 0 ? "red" : ""
                    }>
                    {formatNumber(totalCommission)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={4}
                    className={
                      totalTotalCommission > 0
                        ? "green"
                        : totalTotalCommission < 0
                        ? "red"
                        : ""
                    }>
                    {formatNumber(totalTotalCommission)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={5}
                    className={
                      totalTotalAmount > 0 ? "green" : totalTotalAmount < 0 ? "red" : ""
                    }>
                    {formatNumber(totalTotalAmount)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={6}
                    className={totalMyShare > 0 ? "green" : totalMyShare < 0 ? "red" : ""}>
                    {formatNumber(totalMyShare)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={7}
                    className={
                      totalNetAmount > 0 ? "green" : totalNetAmount < 0 ? "red" : ""
                    }>
                    {formatNumber(totalNetAmount)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AndarBaharPlusMinus;
