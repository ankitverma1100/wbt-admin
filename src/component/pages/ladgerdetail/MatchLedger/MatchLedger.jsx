import { Card, Col, DatePicker, Row, Select, Table } from "antd";
import "./MatchLedger.scss";
import { useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useGetLedgerProfitLossQuery } from "../../../../store/service/SportDetailServices";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import ActionButton from "../../../common/ActionButton";
import TablePagination from "../../../common/TablePagination";

const MatchLedger = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [appliedDateData, setAppliedDateData] = useState([
    timeBefore,
    time,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const columns = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD MMM YYYY")}</span>,
      width: "20%",
    },
    {
      title: "EVENT NAME",
      dataIndex: "eventName",
      key: "eventName",
      width: "60%",
    },
    {
      title: "WINNER",
      key: "winner",
      render: (_, record) => {
        const winnerValue =
          record?.credit > record?.debit ? -1 : record?.debit > record?.credit ? 1 : 0;

        return <span>{winnerValue}</span>;
      },
    },
    {
      title: "CR",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      render: (text) => (
        <span className="text_success">{text?.toFixed(2)}</span>
      ),
    },
    {
      title: "DR",
      dataIndex: "debit",
      align: "right",
      key: "debit",
      render: (text) => <span className="text_danger">{text?.toFixed(2)}</span>,
    },
  ];

  const handleStartDateChange = (_, dateString) => {
    setDateData((prev) => [dateString || prev[0], prev[1]]);
  };

  const handleEndDateChange = (_, dateString) => {
    setDateData((prev) => [prev[0], dateString || prev[1]]);
  };

  const handleSearch = () => {
    setAppliedDateData([...dateData]);
  };

  const {
    data: ledgerData,
    isLoading,
    isFetching,
  } = useGetLedgerProfitLossQuery(
    {
      startDate: appliedDateData[0],
      endDate: appliedDateData[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  const totals =
    ledgerData?.data?.reduce(
      (acc, item) => {
        acc.credit += item?.credit || 0;
        acc.debit += item?.debit || 0;
        return acc;
      },
      { credit: 0, debit: 0 }
    ) || { credit: 0, debit: 0 };
  const totalNet = totals.credit + totals.debit;
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
        className="sport_detail my_ledger main_match_ledger"
        title="MATCH LEDGER"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <Row className="" gutter={[16, 16]} style={{ padding: "12px 4px" }}>
          <Col sm={4} lg={6} xs={24} className="match_ladger profit_loss_ledger">
            <DatePicker
              style={{
                marginBottom: "10px",
                width: "100%",
                borderRadius: "20px",
              }}
              onChange={handleStartDateChange}
              placeholder="Start date"
            />
          </Col>
          <Col sm={4}  lg={6} xs={24} className="match_ladger profit_loss_ledger">
            <DatePicker
              style={{
                marginBottom: "10px",
                width: "100%",
                borderRadius: "20px",
              }}
              onChange={handleEndDateChange}
              placeholder="End date"
            />
          </Col>
          <Col sm={4}  lg={6} xs={24} className="match_ladger profit_loss_ledger">
            <ActionButton
              style={{
                marginBottom: "10px",
              }}
              onClick={handleSearch}
              loading={isLoading || isFetching}>
              Search
            </ActionButton>
          </Col>
        </Row>
        <Row className="" gutter={[16, 16]} style={{ padding: "0 4px 12px" }}>
          <Col lg={6} xs={24}>
            <div className="matchladger_total">
              <p style={{ fontSize: "20px" }}>
                Total:{" "}
                <span
                  className={totalNet > 0 ? "text_success" : "text_danger"}>
                  {totalNet?.toFixed(2)}
                </span>
              </p>
            </div>
          </Col>
        </Row>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <div className="table_section">
            <Table
              className="live_table acc_tabel limit_update"
              bordered
              columns={columns}
              rowClassName={() => "no-wrap"}
              loading={{
                spinning: isLoading || isFetching,
                indicator: <CustomLoading />,
              }}
              dataSource={paginatedData}
              pagination={false}
            />
          </div>
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

export default MatchLedger;
