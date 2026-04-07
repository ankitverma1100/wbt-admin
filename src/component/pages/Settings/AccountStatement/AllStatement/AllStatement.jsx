import { useState } from "react";
import { Modal, Table } from "antd";
import AccountModals from "../AccountModals";
import moment from "moment";
import { convertCode } from "../../../../../store/constant";

const AllStatement = ({ dateData, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      render: (text) => {
        const output = text.replace(/\((.*?)\)/g, (match, code) => {
          return `(${convertCode(code)})`;
        });
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
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       handelAccountModals(event, record?.marketid, record?.remark);
            //     },
            //   };
            // }}
            loading={isLoading}
            columns={columns}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={dateData || []}></Table>
        </div>
      </div>
      {/* {marketId != "" && (
        <Modal
          title="Bet List"
          className="bet_list"
          open={isModalOpen1}
          onCancel={handleCancel}
          footer={null}>
          <AccountModals marketId={marketId} remark={remark} id={id} />
        </Modal>
      )} */}
    </>
  );
};

export default AllStatement;
