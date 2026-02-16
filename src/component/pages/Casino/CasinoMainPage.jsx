import { Card, Col, Row, Table } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import VideoSection from "./VideoSection";
import LastResult from "./LastResult";
import "./style.scss";
import { useOdds } from "./UseOdds";
import { tableIdtoUrl, titleById } from "./Constant";
import { useNavigate, useParams } from "react-router-dom";
import TeenPatti from "./TeenPatti";
import AAA from "./AAA";
import DT20 from "./DT20";
import Lucky7B from "./Lucky7B";
import TeenPattiOneDay from "./TeenPattiOneDay";
import NonDeclare from "./NonDeclare";
import Result from "./Result";
import { useGetCasinoBetListQuery } from "../../../store/service/CasinoServices";

const CasinoMainPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { odds } = useOdds(tableIdtoUrl[id]);
  const today = new Date().toISOString().slice(0, 10);
  const { data: casinoBetsData } = useGetCasinoBetListQuery(
    {
      tableId: id,
      fromDate: today,
      toDate: today,
      userId: "",
      isGameCompleted: false,
      sportId: 5015,
    },
    { skip: !id }
  );

  const casinoBetColumns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => text || record?.userId || "-",
    },
    {
      title: "Runner Name",
      dataIndex: "selectionName",
      key: "selectionName",
      render: (text) => text || "-",
    },
    {
      title: "Bet Price",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) =>
        text ?? record?.betPrice ?? record?.price ?? "-",
    },
    {
      title: "Bet Value",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) =>
        text ?? record?.betValue ?? record?.stake ?? "-",
    },
    {
      title: "Bet Amount",
      dataIndex: "profit",
      key: "profit",
      render: (text, record) => text ?? record?.betAmount ?? "-",
    },
  ];

  return (
    <div className="match_slip casino_oddsss">
      <Card
        className="sport_detail team_name"
        style={{ margin: 0, width: "100%" }}>
        <Card bordered>
          <Row className="casino_main_row" gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <div className="gx-news-itemgnn">
                <div className="">
                  <div className="casino_subheader">
                    <span className="casino_subheader-title">
                      <span className="casino_subheader-title-text">
                        {titleById[id]}
                      </span>
                      <span className="casino_subheader-title-round">
                        Round ID: {odds?.t1?.[0]?.mid || "-"}
                      </span>
                    </span>

                    <span className="casino_round">
                      <span className="casino_round-badge">
                        <ClockCircleOutlined />
                        {odds?.t1?.[0]?.autotime || "--"}
                      </span>
                    </span>
                  </div>
                  <div className="gx-news-content">
                    <VideoSection
                      t3={odds && odds?.length !== 0 && odds.t3}
                      t1={odds && odds?.length !== 0 && odds?.t1?.[0]}
                      t2={odds && odds?.t1}
                      time={odds?.time}
                    />
                    <LastResult />
                    <div className="casino_odds_section">
                      {id === "51" && <TeenPatti odds={odds?.t2} id="51" />}
                      {id === "57" && <TeenPatti odds={odds?.t1} id="57" />}
                      {id === "56" && <AAA odds={odds?.t2} />}
                      {id === "52" || (id === "62" && <DT20 odds={odds?.t2} />)}
                      {id === "53" && <Lucky7B odds={odds?.t2} t1={odds?.t1?.[0]} />}
                      {id === "61" && <TeenPattiOneDay odds={odds} />}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Card className="casino_bets_card" title="CASINO BETS">
                <Table
                  className="casino_bets_table"
                  bordered
                  size="small"
                  columns={casinoBetColumns}
                  pagination={false}
                  dataSource={casinoBetsData?.data || []}
                  rowKey={(record, index) => record?.id || record?.betId || index}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        {/* <NonDeclare /> */}
        {/* <Result name={titleById[id]} /> */}
      </Card>
    </div>
  );
};

export default CasinoMainPage;
