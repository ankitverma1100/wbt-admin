import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useFancyPnlQuery,
  useLazyOddsQuPnlQuery,
} from "../../../../../store/service/OddsPnlServices";
import { useLazyTtlBookQuery } from "../../../../../store/service/supermasteAccountStatementServices";

const BookMakerData = ({ data, keyData, handleBets }) => {
  const [matchid, setMatchID] = useState("");
  const [showMyBook, setShowMyBook] = useState(2);
  const [activeBook, setActiveBook] = useState(1);
  const [showMyBook1, setShowMyBook1] = useState(2);
  const [activeBook1, setActiveBook1] = useState(1);

  const { id } = useParams();
  const [getData, { data: results }] = useLazyTtlBookQuery();

  useEffect(() => {
    data?.map((res) => {
      if (!res?.mid.includes("BM")) return <></>;
      setMatchID(res?.mid);
    });
  }, [data]);

  const { data: PnlOdds } = useOddsQuPnlQuery({ matchId: id ?? "" }, { pollingInterval: 30000 });

  const { data: fancyPnl } = useFancyPnlQuery({
    matchId: id,
  });
  const handleMyBook = (e) => {
    setActiveBook(1);
    e.preventDefault();
    setShowMyBook(2);
    const oddsPnl = {
      matchId: Number(id),
      matchCompleted: false,
    };
    trigger(oddsPnl);
  };
  const handleMyBook1 = (e) => {
    setActiveBook1(1);
    setShowMyBook1(2);
    const oddsPnl = {
      matchId: Number(id),
      matchCompleted: false,
    };
    trigger(oddsPnl);
  };

  useEffect(() => {
    id &&
      matchid &&
      getData({
        matchid: Number(id),
        marketid: matchid,
      });
    const oddsPnl = {
      matchId: Number(id),
      matchCompleted: false,
    };
    trigger(oddsPnl);
  }, [matchid]);

  const handleTtlBook = (e) => {
    setActiveBook(2);
    e.preventDefault();
    setShowMyBook(1);
    getData({
      matchid: Number(id),
      marketid: matchid,
    });
  };
  const handleTtlBook1 = (e) => {
    setActiveBook1(2);
    setShowMyBook1(1);
    getData({
      matchid: Number(id),
      marketid: matchid,
    });
  };
  const ttl = results?.data?.[0]
    ? {
        [results?.data?.[0].selection1]: results?.data?.[0].pnl1,
        [results?.data?.[0].selection2]: results?.data?.[0].pnl2,
        [results?.data?.[0].selection3]: results?.data?.[0].pnl3,
      }
    : {};

  return (
    <>
      <div className="fancy_section">
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={21}>
            <div className="fancy_data_main">
              <Row>
                <Col span={19} className="back-lay-bg">
                  <div className="fancy_data">
                    {/* <div className="sub_fancy">
                      <p>{keyData}</p>
                    </div> */}
                    <Col span={19} className="back-lay-bg bookData">
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
                          className={activeBook == 2 ? "activeMyBook" : ""}
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
                      </div>

                      {/* <button
                        className={activeBook == 1 ? "activeMyBook" : ""}
                        onClick={(e) => handleMyBook(e)}>
                        My Book
                      </button> */}

                      {/* <button
                        style={{ padding: "0px 12px" }}
                        className={activeBook == 2 ? "activeMyBook" : ""}
                        onClick={() => handleBets(data[0]?.mid)}>
                        Bet
                      </button> */}
                    </Col>
                    <div>
                      <span className="fancy_icon">i</span>
                    </div>
                  </div>
                </Col>
                <Col className="b-bottom" span={5}>
                  <Row className="yes_no">
                    <Col span={12} className="back khai">
                      <div>LAGAI</div>
                    </Col>
                    <Col span={12} className="lay lagai lagai1">
                      <div>KHAI</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              {data?.map((res, index) => {
                if (res?.t === "TOSS") return <></>;
                return (
                  <Row key={index} className="scor fancy_all_data">
                    <Col span={19} className="match_title">
                      <div className="title">{res?.nation}</div>
                      {!res?.mid?.includes("BM") && (
                        <span
                          className={
                            fancyPnl?.data && fancyPnl?.data[res?.sid] < 0
                              ? "text_danger"
                              : "text_success"
                          }>
                          {(fancyPnl?.data && fancyPnl.data[res?.sid]) || "0"}
                        </span>
                      )}
                      <>
                        {showMyBook === 1 && (
                          <span
                            className={
                              ttl[res.sid] < 0 ? "text_danger" : "text_success"
                            }>
                            {ttl[res.sid] || "0.0"}
                          </span>
                        )}
                        {PnlOdds?.data?.map((item, id) => {
                          if (!item?.marketId?.includes("BM")) return <></>;
                          const bookPnl = {
                            [item?.selection1]: item?.pnl1,
                            [item?.selection2]: item?.pnl2,
                            [item?.selection3]: item?.pnl3,
                          };
                          return (
                            <>
                              {showMyBook === 2 && (
                                <div className="sub_title" key={id}>
                                  {
                                    <span
                                      className={
                                        bookPnl[res?.sid] < 0
                                          ? "text_danger"
                                          : "text_success"
                                      }>
                                      {bookPnl[res?.sid] || 0}
                                    </span>
                                  }
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>

                      <div></div>
                    </Col>
                    <Col
                      data-before-content={res?.gstatus}
                      className={`${res.gstatus === "" ? "" : "after_Effect"}`}
                      span={5}>
                      <Row>
                        <Col span={12}>
                          <div className="back p-16 ht">
                            <div>{res?.b1}</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="lay p-16 ht">
                            <div>{res?.l1}</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>

      {data?.length > 2 && (
        <div className="fancy_section">
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={21}>
              <div className="fancy_data_main">
                <Row>
                  <Col span={19} className="back-lay-bg">
                    <div className="fancy_data">
                      <div className="sub_fancy">
                        <p style={{ textAlign: "center" }}>Toss</p>
                      </div>
                      <Col span={19} className="back-lay-bg bookData">
                        <button
                          className={activeBook1 == 1 ? "activeMyBook" : ""}
                          onClick={(e) => handleMyBook1(e)}>
                          My Book
                        </button>
                        <button
                          className={activeBook1 == 2 ? "activeMyBook" : ""}
                          onClick={(e) => handleTtlBook1(e)}>
                          Ttl Book
                        </button>
                        <button
                          className={activeBook1 == 2 ? "activeMyBook" : ""}
                          onClick={() => handleBets(data[2]?.mid)}
                          style={{ padding: "0px 12px" }}>
                          Bet
                        </button>
                      </Col>
                      <div>
                        <span className="fancy_icon">i</span>
                      </div>
                    </div>
                  </Col>
                  <Col className="b-bottom" span={5}>
                    <Row className="yes_no">
                      <Col span={12} className="back khai">
                        <div>LAGAI</div>
                      </Col>
                      <Col span={12} className="lay lagai lagai1">
                        <div>KHAI</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div>
                {data?.map((res, index) => {
                  if (res?.t !== "TOSS") return <></>;
                  return (
                    <Row key={index} className="scor fancy_all_data">
                      <Col span={19} className="match_title">
                        <div className="title">{res?.nation}</div>
                        {!res?.mid?.includes("BM") && (
                          <span
                            className={
                              fancyPnl?.data && fancyPnl?.data[res?.sid] < 0
                                ? "text_danger"
                                : "text_success"
                            }>
                            {(fancyPnl?.data && fancyPnl.data[res?.sid]) || "0"}
                          </span>
                        )}
                        <>
                          {showMyBook1 === 1 && (
                            <span
                              className={
                                ttl[res.sid] < 0
                                  ? "text_danger"
                                  : "text_success"
                              }>
                              {ttl[res.sid] || "0.0"}
                            </span>
                          )}
                          {PnlOdds?.data?.map((item, id) => {
                            if (!item?.marketId?.includes("BM")) return <></>;
                            const bookPnl = {
                              [item?.selection1]: item?.pnl1,
                              [item?.selection2]: item?.pnl2,
                              [item?.selection3]: item?.pnl3,
                            };
                            return (
                              <>
                                {showMyBook1 === 2 && (
                                  <div className="sub_title" key={id}>
                                    {
                                      <span
                                        className={
                                          bookPnl[res?.sid] < 0
                                            ? "text_danger"
                                            : "text_success"
                                        }>
                                        {bookPnl[res?.sid] || 0}
                                      </span>
                                    }
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </>

                        <div></div>
                      </Col>
                      <Col
                        data-before-content={res?.gstatus}
                        className={`${
                          res.gstatus === "" ? "" : "after_Effect"
                        }`}
                        span={5}>
                        <Row>
                          <Col span={12}>
                            <div className="back p-16 ht">
                              <div>{res?.b1}</div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="lay p-16 ht">
                              <div>{res?.l1}</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default BookMakerData;
