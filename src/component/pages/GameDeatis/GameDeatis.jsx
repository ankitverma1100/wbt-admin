import { Col, Row } from "antd";
import "./Gamedetails.scss";
import FancyBets from "../sportsdetails/livereport/fancyBets/FancyBets";
import CompletedFancy from "./CompletedFancy";
import { useEffect, useState } from "react";
import { useEventDetailQuery } from "../../../store/service/eventDetailServices";
import FancyData from "./FancyData";
import {
  useLazyOddsQuPnlMyQuery,
  useLazyOddsQuPnlQuery,
} from "../../../store/service/OddsPnlServices";
import Bookmaker from "./Bookmaker";
import { useParams } from "react-router-dom";
import { isNsg } from "../../../store/constant";
import Score from "../../common/Score/Score";
import { useGetTvScoreDataQuery } from "../../../store/service/CasinoServices";
import { useGetChIdsQuery } from "../../../store/service/tvServices";
import { useGetMyIpQuery } from "../../../store/service/ActiveMatcheService";

const GameDeatis = () => {
  const [showFullScore, setShowFullScore] = useState();
  const [showTtlBook, setShowTtlBook] = useState(true);
  const [showTv, setShowTv] = useState(false);
  const [tvUrl, setTvUrl] = useState(null);
  const [loadingTv, setLoadingTv] = useState(false);
  const { id } = useParams();
  const { data } = useEventDetailQuery(id ?? "", { pollingInterval: 1000 });
  const [trigger, { data: oddsPnl }] = useLazyOddsQuPnlQuery();
  const [triggerMy, { data: oddsPnlMy }] = useLazyOddsQuPnlMyQuery();
  const [fancyId, setFancyId] = useState("");
  const [showMatchBet, setShowMatchBet] = useState(0);

  // useEffect(() => {
  //   trigger({
  //     matchId: id ?? "",
  //     matchCompleted: false,
  //     userId: "",
  //   });
  //   triggerMy({
  //     matchId: id ?? "",
  //     matchCompleted: false,
  //     userId: "",
  //   });
  // }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showTtlBook) {
        trigger({
          matchId: id ?? "",
          matchCompleted: false,
          userId: "",
        });
      } else {
        triggerMy({
          matchId: id ?? "",
          matchCompleted: false,
          userId: "",
        });
      }
    }, 1000); // 1000ms = 1 second

    return () => clearInterval(interval);
  }, [id, showTtlBook]);

  const handleTtlBook = () => {
    setShowTtlBook(true);
    triggerMy({
      matchId: id ?? "",
      matchCompleted: false,
      userId: "",
    });
  };

  const handleOddBook = () => {
    setShowTtlBook(false);
    trigger({
      matchId: id ?? "",
      matchCompleted: false,
      userId: "",
    });
  };

  const { data: tvScoreData } = useGetTvScoreDataQuery({
    matchId: id ?? "",
  });
  const { data: chids } = useGetChIdsQuery({
    matchId: id ?? "",
  });

  const { data: userIp } = useGetMyIpQuery();

  const channelId = chids?.data?.channelId;

  const fetchTvStream = async () => {
    if (!channelId) return;
    setLoadingTv(true);

    try {
      const response = await fetch("https://api2.dbm9.com/api/tv-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channelId,
          ipv4: userIp?.ip ?? "",
        }),
      });

      const result = await response.json();
      console.log("TV Stream API:", result);

      if (result.status === 1) {
        setTvUrl(result.data);
      } else {
        console.error("Stream not found");
      }
    } catch (error) {
      console.error("TV Stream Error:", error);
    } finally {
      setLoadingTv(false);
    }
  };

  useEffect(() => {
    if (showTv) fetchTvStream();
  }, [showTv, channelId, userIp]);

  return (
    <Row justify="center" className="">
      <Col xs={24} lg={24}>
        <Row justify="center">
          <Col xs={24} lg={24}>
            <div className="gx-px-1 gx-mb-5 gx-w-100 ">
              <Row
                justify="start"
                align="middle"
                className="gx-px-2 gx-py-1"
                style={{ backgroundColor: "#000" }}>
                <span
                  className="gx-bg-white gx-px-2 gx-py-1 gx-mr-2"
                  onClick={() => setShowFullScore(!showFullScore)}
                  style={{ cursor: "pointer" }}>
                  FS
                </span>
                <img
                  onClick={() => setShowTv(!showTv)}
                  src="/Images/tv_icon.png"
                  alt="tv.png"
                  className="gx-bg-white gx-py-1 gx-mr-2"
                  style={{ width: 25, cursor: "pointer" }}
                />
              </Row>

              <div className="ant-row" />
              {/* {showTv && (
                <div className="ant_row_tv_section">
                  <iframe
                    src={
                      isNsg
                        ? `https://tv.tresting.com/?eventid=${id}`
                        : `https://mis2.sqmr.xyz/stv.php?eventId=${id}`
                    }
                    title="Score-I-frame"
                    className=""
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              )} */}

              {showTv && (
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    background: "#000",
                  }}>
                  {loadingTv ? (
                    <p style={{ color: "#fff", textAlign: "center" }}>
                      Loading stream...
                    </p>
                  ) : tvUrl ? (
                    tvUrl.includes("<iframe") ? (
                      // Response is iframe HTML
                      <div
                        dangerouslySetInnerHTML={{ __html: tvUrl }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      // Response is just a URL
                      <iframe
                        src={tvUrl}
                        title="TV Stream"
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allowFullScreen
                      />
                    )
                  ) : (
                    <p style={{ color: "#fff", textAlign: "center" }}>
                      No stream available
                    </p>
                  )}
                </div>
              )}
              <div
                className={`ant-row ${
                  showFullScore ? "height_full" : "height_short"
                }`}>
                <iframe
                  // src={`https://scorediamond.247idhub.com/score/${id}`}
                  src={tvScoreData?.data?.scoreUrl}
                  title="Score-I-frame"
                  className=""
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
              {/* )} */}

              <Row className="gx-px-0 gx-py-0 main_game_details">
                <Col xs={24}>
                  {/* <MatchOdds data={data} pnl={oddsPnl?.data} /> */}
                  <Bookmaker
                    data={data}
                    pnl={oddsPnl?.data}
                    oddsPnlMy={oddsPnlMy?.data}
                    handleTtlBook={handleTtlBook}
                    handleOddBook={handleOddBook}
                    setShowTtlBook={setShowTtlBook}
                    showTtlBook={showTtlBook}
                  />
                  <FancyData
                    data={data}
                    setFancyId={setFancyId}
                    fancyId={fancyId}
                    setShowMatchBet={setShowMatchBet}
                  />
                </Col>
              </Row>
              <FancyBets
                showMatchBet={showMatchBet}
                setShowMatchBet={setShowMatchBet}
                setFancyId={setFancyId}
                fancyId={fancyId}
              />
              <CompletedFancy />
              {/* <Row justify="center" className="gx-px-0 gx-py-0 gx-my-1">
                <button
                  type="button"
                  className="ant-btn ant-btn-default gx-my-0  gx-bg-grey gx-text-white gx-font-weight-semi-bold ">
                  <span>All Matches</span>
                </button>
              </Row> */}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default GameDeatis;
