import { Card, Table } from "antd";
import "./MyLedger.scss";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyLedgerQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import TablePagination from "../../../common/TablePagination";

const userTypeLabelMap = {
  7: "SuperAdmin",
  6: "Admin",
  5: "Mini Admin",
  4: "Master",
  3: "Super",
  2: "Agent",
  1: "Client",
};
const currentUserTypeLabel =
  userTypeLabelMap[Number(localStorage.getItem("userType"))] || "User";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>,
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
  {
    title: "DR",
    dataIndex: "debit",
    key: "debit",
    align: "right",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
    render: (text) => <span className="text_danger">{text}</span>,
  },
  {
    title: "CR",
    dataIndex: "credit",
    key: "credit",
    align: "right",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
    render: (text) => <span className="text_success">{text}</span>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    width: 280,
    render: (text, record) => {
      const amount = Number(record?.balance || 0);
      const label = amount >= 0 ? "LENA" : "DENA";

      return (
        <span>
          {Math.abs(amount).toFixed(2)} {label}
        </span>
      );
    },
  },
  {
    title: "Payment Type",
    dataIndex: "collectionName",
    key: "collectionName",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
    render: (text) => <span>{text?.toString().toUpperCase()}</span>,
  },
  {
    title: "Remark",
    dataIndex: "description",
    key: "description",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
    render: (_, record) => {
      const credit = Number(record?.credit || 0);
      const debit = Number(record?.debit || 0);
      const label = currentUserTypeLabel.toString().toUpperCase();
      const signText = credit > 0 ? "PLUS" : debit > 0 ? "MINUS" : "";

      return <span>{signText ? `${label} ${signText}` : label}</span>;
    },
  },
];

const MyLedger = () => {
  const nav = useNavigate();
  const handleBackbtn = () => {
    nav(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const currentYear = moment().year();
  const timeBefore = moment(`2025-01-01`).format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const {
    data: ledgerData,
    isLoading,
    isFetching,
  } = useGetMyLedgerQuery({
    ledgerType: "ALL",
    fromDate: timeBefore,
    toDate: time,
  });

  const totalCreadit =
    ledgerData?.data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  const totalDebit =
    ledgerData?.data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  // const totalBalance =
  //   ledgerData?.data?.reduce(
  //     (acc, item) => acc + Number(item.balance || 0),
  //     0
  //   ) || 0;

  // const totalBalance = totalCreadit - totalDebit;
  const totalBalance = totalDebit - totalCreadit;
  const balanceLabel = totalBalance > 0 ? "LENA" : "DENA";
  const balanceValue = Math.abs(totalBalance?.toFixed(2));
  const paginatedData = ledgerData?.data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}
      <Card
        className="sport_detail ledger_data"
        title="MY LEDGER"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="my_ledger">
          <div className="ledger_summary lena">
            <span className="summary_label">LENA</span>
            <span className="summary_value">
              <ArrowUpOutlined className="summary_icon" />
              {totalDebit?.toFixed(2)}
            </span>
          </div>
          <div className="ledger_summary dena">
            <span className="summary_label">DENA</span>
            <span className="summary_value">
              <ArrowDownOutlined className="summary_icon" />
              {totalCreadit?.toFixed(2)}
            </span>
          </div>
          <div className={`ledger_summary balance ${totalBalance < 0 ? "dena" : "lena"}`}>
            <span className="summary_label">BALANCE</span>
            <span className="summary_value">
              {balanceValue} {balanceLabel}
            </span>
          </div>
        </div>
        <div className="table_section">
          <Table
            className="live_table limit_update"
            bordered
            columns={columns}
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            pagination={false}
            dataSource={paginatedData}
          />
          <div className="pagination_cus" style={{ margin: "12px 0" }}>
            <TablePagination
              className="pagination_main ledger_pagination"
              total={ledgerData?.data?.length}
              pageSize={pageSize}
              current={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default MyLedger;
