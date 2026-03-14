import "./LiveReport.scss";
import { Col, Modal, Row, Spin } from "antd";
import { useParams } from "react-router-dom";
import MoreEvent from "./MoreEvent/MoreEvent";
import CompeleteFancy from "./compeleteFancy/CompeleteFancy";
import { useEventDetailQuery } from "../../../../store/service/eventDetailServices";
import ScoreCard from "./ScoreCard/ScoreCard";
import { useEffect, useState } from "react";
import FancyData from "./FancyData/FancyData";
import {
  useLazyOddsQuPnlQuery,
  useWinnerPnlMutation,
} from "../../../../store/service/OddsPnlServices";
import { useLazyTtlBookQuery } from "../../../../store/service/supermasteAccountStatementServices";
import BookMakerData from "./BookMakerData/BookMakerData";
import { useLazySessionFancyBetDetailQuery } from "../../../../store/service/SportDetailServices";
import BetModals from "./BetModals/BetModals";

const LiveReport = () => {
  const [oddsData, setOddsData] = useState([]);
  const [ShowMyBook, setShowMyBook] = useState(2);
  const [marketId, setMarketId] = useState("");
  const [activeBookData, setActiveBookData] = useState(1);
  const [open, setOpen] = useState(false);

  const { id, id1 } = useParams();

  const { data, isLoading } = useEventDetailQuery(id, {
    pollingInterval: 1000,
  });

  useEffect(() => {
    setOddsData(data?.Odds[0]);
    data?.Odds?.map((res) => {
      setMarketId(res?.marketId);
    });
  }, [data]);

  const { data: PnlOdds } = useOddsQuPnlQuery({ matchId: id ?? "" }, { pollingInterval: 30000 });

  const [getData, { data: results }] = useLazyTtlBookQuery();
  const [winnerPnl, { data: winnerData }] = useWinnerPnlMutation();
  const [betDetails, { data: betDetailsData, isError }] =
    useLazySessionFancyBetDetailQuery();

  useEffect(() => {
    marketId &&
      id &&
      getData({
        matchid: Number(id),
        marketid: marketId,
        subadminid: localStorage.getItem("userId"),
      });
    const oddsPnl = {
      matchId: Number(id),
      matchCompleted: false,
    };
    trigger(oddsPnl);
    winnerPnl({
      marketId,
    });
  }, [marketId]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleMyBook = () => {
    setShowMyBook(2);
    setActiveBookData(1);
    const oddsPnl = {
      matchId: Number(id),
      matchCompleted: false
    };
    trigger(oddsPnl);
  };

  const handleTtlBook = (mrktid) => {
    setShowMyBook(1);
    setActiveBookData(2);
    getData({
      matchid: Number(id),
      marketid: mrktid,
      subadminid: localStorage.getItem("userId"),
    });
  };
  const handleBets = (marketid) => {
    setOpen(true);
    betDetails({
      matchId: Number(id),
      type: "",
      userId: "",
      marketId: marketid,
    });
  };

  const [oddsObject, setOddsObject] = useState({});

  useEffect(() => {
    let resultObject = {};
    winnerData?.data.forEach((item) => {
      resultObject[item.selctionId] = item.liability;
    });

    setOddsObject(resultObject);
  }, [winnerData]);

  const ttl = results?.data?.[0]
    ? {
        [results?.data?.[0].selection1]: results?.data?.[0].pnl1,
        [results?.data?.[0].selection2]: results?.data?.[0].pnl2,
        [results?.data?.[0].selection3]: results?.data?.[0].pnl3,
      }
    : {};

  return (
    <>
      {isLoading ? (
        <Spin className="loading_main" tip="Loading..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div className="main_live_section1">
          <ScoreCard mid={id} />
          <div>
            {data?.Odds?.map((res, id) => {
              return (
                <Row key={id} gutter={[16, 24]}>
                  <Col className="gutter-row" span={21}>
                    <div className="match_section">
                      <Row>
                        <Col span={19} className="back-lay-bg">
                          <div className="fancy_data1">
                            <div
                              style={{
                                display: "flex",
                              }}>
                              <div
                                style={{
                                  padding: "6px 8px",
                                  cursor: "pointer",
                                  backgroundColor: "rgb(235, 109, 136)",
                                  color: "white",
                                  fontSize: "16px",
                                }}
                                onClick={(e) => handleTtlBook(e)}>
                                Ttl Book
                              </div>
                              <div
                                style={{
                                  padding: "6px 8px",
                                  cursor: "pointer",
                                  backgroundColor: "rgb(255, 255, 255)",
                                  fontSize: "16px",
                                }}>
                                {" "}
                                My Book
                              </div>
                              {/* <button
                                className={
                                  activeBookData == 1 ? "activeMyBook" : ""
                                }
                                onClick={() => handleMyBook()}>
                                My Book
                              </button> */}
                              {/* <button
                                className={
                                  activeBookData == 2 ? "activeMyBook" : ""
                                }
                                onClick={() => handleTtlBook(marketId)}>
                                Ttl Book
                              </button> */}
                              {/* <button
                                style={{ padding: "0px 12px" }}
                                className={
                                  activeBookData == 2 ? "activeMyBook" : ""
                                }
                                onClick={() => handleBets(marketId)}>
                                Bet
                              </button> */}
                            </div>
                          </div>
                        </Col>
                        <Col span={5}>
                          <Row className="yes_no">
                            <Col span={12} className="back lagai">
                              <div>LAGAI</div>
                            </Col>
                            <Col span={12} className="lay khai">
                              <div>KHAI</div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                    {res?.runners?.map((item, index) => {
                      return (
                        <div key={index}>
                          <Row className="scor">
                            <Col span={19} className="tital_sectin">
                              <div className="title">{item?.name}</div>
                              {ShowMyBook === 1 && (
                                <span
                                  className={
                                    ttl[item.selectionId] < 0
                                      ? "text_danger"
                                      : "text_success"
                                  }>
                                  {ttl[item.selectionId] || "0.0"}
                                </span>
                              )}
                              {res?.Name?.includes("Winner") ? (
                                <div className="sub_title" key={id}>
                                  {ShowMyBook === 2 && (
                                    <span
                                      className={
                                        oddsObject[item.selectionId] < 0
                                          ? "text_danger"
                                          : "text_success"
                                      }>
                                      {oddsObject[item.selectionId] || 0}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {PnlOdds?.data?.map((itemData, id) => {
                                    if (itemData?.marketId?.includes("BM"))
                                      return <></>;
                                    const oddsPnl = {
                                      [itemData?.selection1]: itemData?.pnl1,
                                      [itemData?.selection2]: itemData?.pnl2,
                                      [itemData?.selection3]: itemData?.pnl3,
                                    };
                                    return (
                                      <div className="sub_title" key={id}>
                                        {ShowMyBook === 2 && (
                                          <span
                                            className={
                                              oddsPnl[item.selectionId] < 0
                                                ? "text_danger"
                                                : "text_success"
                                            }>
                                            {oddsPnl[item.selectionId] || 0}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </Col>
                            <Col span={5}>
                              <Row>
                                {item?.ex?.availableToBack?.map(
                                  (backData, index) => {
                                    return (
                                      <Col
                                        style={{
                                          display: `${
                                            index === 1 || index === 2
                                              ? "none"
                                              : ""
                                          }`,
                                        }}
                                        span={12}
                                        key={index}>
                                        <div className="lightback p-16 ht">
                                          <div>{backData?.price}</div>
                                        </div>
                                      </Col>
                                    );
                                  }
                                )}
                                {item?.ex?.availableToLay?.map(
                                  (layData, index) => {
                                    return (
                                      <Col
                                        style={{
                                          display: `${
                                            index === 1 || index === 2
                                              ? "none"
                                              : ""
                                          }`,
                                        }}
                                        span={12}
                                        key={index}>
                                        <div className="lightlay p-16 ht">
                                          <div>{layData?.price}</div>
                                        </div>
                                      </Col>
                                    );
                                  }
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              );
            })}
          </div>
          <BookMakerData
            keyData={"Bookmaker"}
            handleBets={handleBets}
            data={data?.Bookmaker}
          />
          {data &&
            Object.keys(data).map(
              (key) =>
                data[key].length !== 0 &&
                key != "Odds" && (
                  <FancyData
                    key={key}
                    handleBets={handleBets}
                    data={data[key]}
                    keyData={key}
                  />
                )
            )}
          <CompeleteFancy />
          <MoreEvent id1={id1} />
        </div>
      )}

      <Modal
        open={open}
        title="Bets"
        width={800}
        onCancel={handleCancel}
        footer={null}
        className="bets_details">
        <BetModals data={isError ? [] : betDetailsData?.data} />
      </Modal>
    </>
  );
};

export default LiveReport;
