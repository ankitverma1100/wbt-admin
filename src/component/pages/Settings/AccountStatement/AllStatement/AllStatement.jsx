import { useState } from "react";
import { Modal, Table, Spin } from "antd";
import AccountModals from "../AccountModals";
import moment from "moment";
import { convertCode } from "../../../../../store/constant";
import { useLazyGetBetByMarketUserIdQuery } from "../../../../../store/service/userlistService";

const AllStatement = ({ dateData, isLoading, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betModalOpen, setBetModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [triggerBets, { data: betData, isFetching: betFetching }] =
    useLazyGetBetByMarketUserIdQuery();

  const handleDescriptionClick = (record) => {
    if (!record?.marketId) return;
    setSelectedDescription(record?.description || "");
    triggerBets({ marketId: record.marketId, userId: userId || "" });
    setBetModalOpen(true);
  };

  const betColumns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Nation", dataIndex: "selectionName", key: "selectionName" },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Run", dataIndex: "run", key: "run" },
    { title: "Mode", dataIndex: "mode", key: "mode" },
    {
      title: "P&L",
      dataIndex: "netPnl",
      key: "netPnl",
      render: (text) => (
        <span className={text > 0 ? "text_success" : "text_danger"}>
          {typeof text === "number" ? text.toFixed(2) : text}
        </span>
      ),
    },
    { title: "Date", dataIndex: "time", key: "time" },
  ];
  const formatNumber = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
      return value ?? 0;
    }
    return numberValue;
  };

  const columns = [
    {
      title: "Date ",
      dataIndex: "date",
      key: "date",
      render: (value) =>
        moment(value).format("DD-MMM-YYYY hh:mm A").toUpperCase(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const output = text.replace(/\((.*?)\)/g, (match, code) => {
          return `(${convertCode(code)})`;
        });
        if (record?.marketId) {
          return (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleDescriptionClick(record)}
            >
              {output}
            </span>
          );
        }
        return <span>{output}</span>;
      },
    },
    {
      title: "OLD.BAL",
      dataIndex: "oldBalance",
      key: "oldBalance",
      render: (_, record) => {
        const value =
          record?.oldBalance ??
          record?.oldBal ??
          record?.opening ??
          record?.openingBalance ??
          0;
        return <p>{formatNumber(value)}</p>;
      },
    },

    {
      title: "CR",
      dataIndex: "credit",
      key: "credit",
      render: (text) => <p className="text_success">{text}</p>,
    },

    {
      title: "DR",
      dataIndex: "debit",
      key: "debit",
      render: (text) => <p className="text_danger">{text}</p>,
    },
    {
      title: "COMM+",
      dataIndex: "commPlus",
      key: "commPlus",
      render: (_, record) => {
        const value =
          record?.commPlus ??
          record?.commissionPlus ??
          record?.commissionCredit ??
          0;
        return <p className="text_success">{formatNumber(value)}</p>;
      },
    },
    {
      title: "COMM-",
      dataIndex: "commMinus",
      key: "commMinus",
      render: (_, record) => {
        const value =
          record?.commMinus ??
          record?.commissionMinus ??
          record?.commissionDebit ??
          0;
        return <p className="text_danger">{formatNumber(value)}</p>;
      },
    },

    {
      title: "Balance",
      dataIndex: "closing",
      key: "closing",
      render: (text) => <p>{text?.toFixed(2)}</p>,
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}

      <div className="table_section statement_tabs_data">
        <div className="table_section">
          <Table
            className="live_table statemt_account agent_master1"
            bordered
            rowKey={(record, index) => record?.id ?? record?.txnId ?? index}
            rowClassName="c_pointer"
            loading={isLoading}
            columns={columns}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={dateData || []}></Table>
        </div>
      </div>

      <Modal
        title={
          <span
            style={{
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "24px",
            }}
          >
            {selectedDescription || "Bet List"}
          </span>
        }
        open={betModalOpen}
        onCancel={() => setBetModalOpen(false)}
        footer={null}
        width={900}
      >
        {betFetching ? (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <Spin />
          </div>
        ) : (
          <Table
            className="live_table acc_tabel"
            bordered
            rowClassName={(record) => (record?.isback ? "back" : "lay")}
            columns={betColumns}
            dataSource={betData?.data || []}
            rowKey={(record, index) => record?.id ?? index}
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default AllStatement;
