import { Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import FancyBookModals from "../FancyBookModals/FancyBookModals";
import { useParams } from "react-router-dom";
import {
  useFancyPnlQuery,
  useLazyOddsQuPnlQuery,
} from "../../../../../store/service/OddsPnlServices";
import { useLazyTtlBookQuery } from "../../../../../store/service/supermasteAccountStatementServices";

const FancyData = ({ data, keyData, handleBets }) => {
  const [FancyId, setFancyID] = useState("");
  const [open, setOpen] = useState(false);
  const [matchid, setMatchID] = useState("");
  const [showMyBook, setShowMyBook] = useState(2);
  const [activeBook, setActiveBook] = useState(1);

  const { id } = useParams();

  const hanldeBookSection = (val) => {
    setOpen(true);
    setFancyID(val);
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
    };
    trigger(oddsPnl);
  }, [matchid]);

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
              {keyData != "Bookmaker" && (
                <Row>
                  <Col span={19} className="back-lay-bg">
                    <div className="fancy_data">
                      <div className="sub_fancy">
                        <p>{keyData}</p>
                      </div>
                      <div>
                        <span className="fancy_icon">i</span>
                      </div>
                    </div>
                  </Col>
                  <Col className="b-bottom" span={5}>
                    <Row className="">
                      <Col span={12} className="lay lagai lagai1">
                        <div>{keyData === "Bookmaker" ? "KHAI" : "NO"}</div>
                      </Col>
                      <Col span={12} className="back khai">
                        <div>{keyData === "Bookmaker" ? "LAGAI" : "YES"}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </div>
            <div>
              {data?.map((res, index) => {
                if (res?.mid?.includes("BM")) return <></>;
                return (
                  <Row key={index} className="scor fancy_all_data">
                    <Col span={19} className="match_title">
                      <div className="title ball">
                        {keyData == "BallByBall" && (
                          <p className="ball_value">{res?.ball}</p>
                        )}

                        <p>{res?.nation}</p>
                      </div>
                      <span
                        className="fancy_book_data fancy_bet"
                        onClick={() => handleBets(res?.sid)}>
                        Bet
                      </span>
                      {keyData !== "Bookmaker" && (
                        <>
                          <span
                            className="fancy_book_data"
                            onClick={() => handleBets(res?.sid)}>
                            Book
                          </span>
                        </>
                      )}
                      {keyData === "Bookmaker" && (
                        <>
                          {showMyBook === 1 && (
                            <span
                              className={
                                ttl[res.sid] < 0
                                  ? "text_danger"
                                  : "text_success"
                              }>
                              {ttl[res.sid] || "0.0"}
                            </span>
                          )}
                          {PnlOdds?.data?.map((res, id) => {
                            if (!res?.marketId?.includes("BM")) return <></>;
                            return (
                              <>
                                {showMyBook === 2 && (
                                  <div className="sub_title" key={id}>
                                    {index === 0 ? (
                                      <span
                                        className={
                                          res?.pnl1 < 0
                                            ? "text_danger"
                                            : "text_success"
                                        }>
                                        {res?.pnl1 || 0}
                                      </span>
                                    ) : index === 1 ? (
                                      <span
                                        className={
                                          res?.pnl2 < 0
                                            ? "text_danger"
                                            : "text_success"
                                        }>
                                        {res?.pnl2 || 0}
                                      </span>
                                    ) : index === 3 ? (
                                      <span
                                        className={
                                          res?.pnl3 < 0
                                            ? "text_danger"
                                            : "text_success"
                                        }>
                                        {res?.pnl3 || 0}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </>
                      )}

                      <div></div>
                    </Col>
                    <Col
                      data-before-content={res?.gstatus}
                      className={`${res.gstatus === "" ? "" : "after_Effect"}`}
                      span={5}>
                      <Row>
                        <Col span={12}>
                          <div className="lay p-16 ht">
                            <div>{res?.l1}</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="back p-16 ht">
                            <div>{res?.b1}</div>
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

      <Modal
        open={open}
        title="Run Amount"
        onCancel={handleCancel}
        footer={null}
        className="run_amount_modals">
        <FancyBookModals id={id} FancyId={FancyId} />
      </Modal>
    </>
  );
};

export default FancyData;
