import { Card, Empty, Input, Row, Select } from "antd";
import "./style.scss";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { LuRefreshCw } from "react-icons/lu";
import {
  useGetQueryMatchBetsQuery,
  useGetSessionHavingBetQuery,
  useGetSessionQureyBetQuery,
} from "../../../../../store/service/SportDetailServices";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddDetails from "../../../GameDeatis/AddDetails";
import { convertCode } from "../../../../../store/constant";

const FancyBets = ({ setFancyId, fancyId, setShowMatchBet, showMatchBet }) => {
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [searchTermOdds, setSearchTermOdds] = useState("");
  const [searchTermfancy, setSearchTermfancy] = useState("");
  const [openResponsive, setOpenResponsive] = useState(false);
  const [sessionType, setSessionType] = useState(false);
  const [betsDataShow, setBetsData] = useState(false);

  const [clientId, setClientId] = useState("");
  const { id } = useParams();

  const { data: matchBets } = useGetQueryMatchBetsQuery(
    {
      matchId: id,
      userId: "",
      matchCompleted: false,
      marketType: oddsType,
    },
    { pollingInterval: 1000 }
  );

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: false,
    matchId: id ?? "",
  });
  const { data: sessionData } = useGetSessionQureyBetQuery(
    {
      matchId: id,
      userId: "",
      marketId: fancyId,
      matchCompleted: false,
    },
    { pollingInterval: 1000 }
  );

  const matchBetList =
    matchBets?.data?.betList ?? matchBets?.data?.bookmaker?.betList ?? [];

  const filteredAllOdds =
    matchBetList?.filter(
      (item) =>
        item?.username?.toLowerCase().includes(searchTermOdds.toLowerCase()) ||
        item?.userId?.toString().includes(searchTermOdds)
    ) || [];
  const filteredAllfancy =
    sessionData?.data?.filter(
      (item) =>
        item?.username?.toLowerCase().includes(searchTermfancy.toLowerCase()) ||
        item?.userId?.toString().includes(searchTermfancy)
    ) || [];

  return (
    <>
      <Row
        justify="start"
        align="middle"
        style={{
          backgroundColor: "#000",
          marginTop: "10px",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() => {
              setShowMatchBet(1);
              setBetsData(true);
              setFancyId("");
            }}
            style={{
              background:
                showMatchBet === 1 ? "var(--bg-color)" : "var(--fancy-tab)",
              color: "#fff",
              padding: "12px",
              fontWeight: 600,
              cursor: "pointer",
              marginRight: "3px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}>
            Match Bet ({matchBetList?.length || 0})
          </div>
          <div
            onClick={() => {
              setShowMatchBet(2);
              setBetsData(true);
              setFancyId("");
            }}
            style={{
              background:
                showMatchBet === 2 ? "var(--bg-color)" : "var(--fancy-tab)",
              color: "#fff",
              padding: "12px",
              fontWeight: 600,
              cursor: "pointer",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}>
            Fancy Bet ({sessionData?.data?.length || 0})
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginRight: "3px",
          }}>
          <div
            onClick={() => setBetsData(!betsDataShow)}
            style={{
              background: "var(--bg-color)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "24px",
              padding: "0px 8px",
              float: "right",
              lineHeight: "38px",
              verticalAlign: "moddle",
            }}>
            {betsDataShow ? (
              <TiArrowSortedUp
                style={{ lineHeight: "10px", verticalAlign: "middle" }}
              />
            ) : (
              <TiArrowSortedDown
                style={{ lineHeight: "10px", verticalAlign: "middle" }}
              />
            )}
          </div>
          <div
            onClick={() => setShowMatchBet(2)}
            style={{
              background: "var(--bg-color)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "20px",
              padding: "0px 8px",
              float: "right",
              lineHeight: "38px",
              verticalAlign: "moddle",
            }}>
            <LuRefreshCw
              style={{
                lineHeight: "10px",
                verticalAlign: "middle",
                margin: "0",
              }}
            />
          </div>
        </div>
      </Row>
      {betsDataShow && (
        <>
          {showMatchBet === 1 && (
            <Card
              style={{
                margin: "0px",
                width: "100%",
              }}
              className="sport_detail matched_bets">
              <div className="deskOpen gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
                {/* Match Bets - {filteredAllOdds?.length || 0} */}

                <div
                  className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                  <Input
                    placeholder="Search Client..."
                    value={searchTermOdds}
                    onChange={(e) => setSearchTermOdds(e.target.value)}
                  />
                  <span className=" gx-font-weight-semi-bold OddsType">
                    OddsType
                  </span>
                  <Select
                    style={{ width: 150 }}
                    defaultValue="All OddsType"
                    value={oddsType}
                    onChange={(value) => setOddsType(value)}
                    options={[
                      // {
                      //   value: "All",
                      //   label: "All OddsType",
                      // },
                      {
                        value: "Bookmaker",
                        label: "Bookmaker",
                      },
                    ]}
                  />
                </div>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
                  <span className="ml-1 px-1">PDF</span>
                </button>
              </div>

              <div
                className="mobile-open gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white"
                style={{
                  gap: "12px",
                }}>
                <div>
                  <div
                    style={{ textAlign: "center", textTransform: "uppercase" }}>
                    {/* Match Bets - {filteredAllOdds?.length || 0} */}
                    &nbsp;
                  </div>
                  <div className="  gx-text-white gx-text-uppercase">
                    <Input
                      style={{ height: "32px" }}
                      placeholder="Search Client..."
                      value={searchTermOdds}
                      onChange={(e) => setSearchTermOdds(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{ textAlign: "center", textTransform: "uppercase" }}
                    className=" gx-font-weight-semi-bold OddsType">
                    OddsType
                  </div>
                  <Select
                    style={{ width: 150 }}
                    defaultValue="All OddsType"
                    value={oddsType}
                    onChange={(value) => setOddsType(value)}
                    options={[
                      // {
                      //   value: "All",
                      //   label: "All OddsType",
                      // },
                      {
                        value: "Bookmaker",
                        label: "Bookmaker",
                      },
                    ]}
                  />
                </div>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
                  <span className="ml-1 px-1">PDF</span>
                </button>
              </div>

              <div className="table_section">
                <div className="table_section">
                  <table className="">
                    <thead>
                      <tr>
                        <th>Client</th>

                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Odds Type</th>
                        <th>Team</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th>Loss</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllOdds?.length > 0 ? (
                        filteredAllOdds?.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              item?.mode == "K"
                                ? "matchdtailsYesBackground"
                                : "matchdtailsNoBack"
                            }>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOpenResponsive(true);
                                setSessionType(false);
                                setClientId(item.userId);
                              }}>
                              {item?.username} ({item?.userId})
                            </td>
                            <td>{item?.odds}</td>
                            <td>{item?.stake}</td>
                            <td>{item?.mode == "K" ? "Lagai" : "Khai"}</td>
                            <td>{item?.marketType}</td>
                            <td>{item?.team}</td>
                            <td>
                              {item?.parentName} ({convertCode(item?.parentId)})
                            </td>
                            <td>{new Date(item?.date).toLocaleString()}</td>
                            <td>{item?.liability}</td>
                            <td>{item?.pnl}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="10"
                            style={{ textAlign: "center", padding: "2rem" }}>
                            <Empty description="No Data Available" />
                          </td>
                        </tr>
                      )}
                      {matchBetList?.length > 0 && (
                        <tr>
                          <td colSpan={8}>Total</td>
                          <td>
                            {matchBetList?.reduce(
                              (acc, item) => acc + item.liability,
                              0
                            ) || 0}
                          </td>
                          <td>
                            {matchBetList?.reduce(
                              (acc, item) => acc + item.pnl,
                              0
                            ) || 0}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
          {showMatchBet === 2 && (
            <Card
              style={{
                margin: "0px",
                width: "100%",
              }}
              className="sport_detail matched_bets">
              <div className="deskOpen gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
                <Input
                  style={{ width: "200px" }}
                  placeholder="Search Client..."
                  value={searchTermfancy}
                  onChange={(e) => setSearchTermfancy(e.target.value)}
                />
                <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
                  <span className=" gx-font-weight-semi-bold OddsType">
                    OddsType
                  </span>
                  <Select
                    style={{ width: 150 }}
                    defaultValue="All OddsType"
                    value={fancyId}
                    onChange={(value) => setFancyId(value)}
                    options={[
                      { value: "", label: "All Fancies" },
                      ...(sessionBets?.data || []).map((item) => ({
                        value: item.fancyId,
                        label: item.fancyName,
                      })),
                    ]}
                  />
                </div>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
                  <span className="ml-1 px-1">PDF</span>
                </button>
              </div>

              <div className="mobile-open gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
                <div>
                  <div
                    style={{ textAlign: "center", textTransform: "uppercase" }}>
                    {/* Fancy Bets - {filteredAllfancy?.length || 0} */}
                    &nbsp;
                  </div>

                  <Input
                    style={{ width: "150px", height: "33px" }}
                    placeholder="Search Client..."
                    value={searchTermfancy}
                    onChange={(e) => setSearchTermfancy(e.target.value)}
                  />
                </div>
                <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
                  <div
                    style={{ textAlign: "center" }}
                    className=" gx-font-weight-semi-bold OddsType">
                    OddsType
                  </div>
                  <Select
                    style={{ width: 150 }}
                    defaultValue="All OddsType"
                    value={fancyId}
                    onChange={(value) => setFancyId(value)}
                    options={[
                      { value: "", label: "All Fancies" },
                      ...(sessionBets?.data || []).map((item) => ({
                        value: item.fancyId,
                        label: item.fancyName,
                      })),
                    ]}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}>
                  <button
                    type="button"
                    className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
                    <span className="ml-1 px-1">PDF</span>
                  </button>
                </div>
              </div>

              <div className="table_section">
                <div className="table_section">
                  <table className="">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Rate</th>
                        <th>Run</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Team</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th>Loss</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllfancy?.length > 0 ? (
                        filteredAllfancy?.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              item?.mode === "YES"
                                ? "matchdtailsYesBackground"
                                : "matchdtailsNoBack"
                            }>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOpenResponsive(true);
                                setSessionType(true);
                                setClientId(item.userId);
                              }}>
                              {item?.username} ({item?.userId})
                            </td>
                            <td>{item?.rate}</td>
                            <td>{item?.run}</td>
                            <td>{item?.amount}</td>
                            <td>{item?.mode}</td>
                            <td>{item?.selectionName}</td>

                            <td>
                              {item?.parentName} ({item?.parentId})
                            </td>
                            <td>{item?.time}</td>
                            <td>{item?.liability}</td>
                            <td>{item?.pnl}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="10"
                            style={{ textAlign: "center", padding: "2rem" }}>
                            <Empty description="No Data Available" />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
      <AddDetails
        clientId={clientId}
        sessionType={sessionType}
        open={openResponsive}
        setSessionType={setSessionType}
        setOpenResponsive={setOpenResponsive}
      />
    </>
  );
};

export default FancyBets;
