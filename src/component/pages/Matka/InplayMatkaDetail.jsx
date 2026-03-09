import { Card, Empty, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import {
  useGetMatkaBetsQuery,
  useGetMatkaLiabilityQuery,
  useGetMatkaMarketQuery,
} from "../../../store/service/MatkaServices";

const InplayMatkaDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { eventId, name } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const activeTabParam = searchParams.get("tab") || "";
  const [selectedTab, setSelectedTab] = useState("");

  const matchIdRaw = eventId;
  const matchIdNumber = Number(matchIdRaw);
  const matchId = Number.isNaN(matchIdNumber) ? matchIdRaw : matchIdNumber;

  const {
    data: marketData,
    isLoading: isMarketLoading,
    isFetching: isMarketFetching,
    error: marketError,
  } = useGetMatkaMarketQuery(
    { matkaId: matchId },
    { skip: !matchId }
  );

  const {
    data: betsData,
    isLoading: isBetsLoading,
    isFetching: isBetsFetching,
    error: betsError,
  } = useGetMatkaBetsQuery(
    { matchId: matchId },
    { skip: !matchId }
  );

  const matchInfo = marketData?.data
    ? {
        name: marketData.data.matkaName,
        time: marketData.data.time,
      }
    : null;
  const markets = Array.isArray(marketData?.data?.matkaMarket)
    ? marketData.data.matkaMarket
    : [];
  const bets = Array.isArray(betsData?.data) ? betsData.data : [];

  const normalizedTabParam = (activeTabParam || "").toUpperCase();
  const isHarupMarket = (marketName = "") =>
    marketName.toUpperCase().includes("HARUP");

  const singleMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("SINGLE") || name.includes("JODI");
      }) ||
      markets.find((market) => !isHarupMarket(market?.marketName || "")) ||
      null
    );
  }, [markets]);
  const harupAndarMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("HARUP") && name.includes("ANDAR");
      }) || null
    );
  }, [markets]);
  const harupBaharMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("HARUP") && name.includes("BAHAR");
      }) || null
    );
  }, [markets]);
  const tabItems = useMemo(() => {
    const items = [];
    if (singleMarket) items.push({ key: "SINGLE_JODI", label: "SINGLE JODI" });
    if (harupAndarMarket || harupBaharMarket) {
      items.push({ key: "HARUP", label: "HARUP" });
    }
    return items;
  }, [singleMarket, harupAndarMarket, harupBaharMarket]);

  useEffect(() => {
    if (!tabItems.length) return;
    if (!selectedTab) {
      if (normalizedTabParam === "HARUP") {
        setSelectedTab("HARUP");
        return;
      }
      if (
        normalizedTabParam.includes("HARUP") &&
        (harupAndarMarket || harupBaharMarket)
      ) {
        setSelectedTab("HARUP");
        return;
      }
      if (normalizedTabParam === "SINGLE_JODI" || normalizedTabParam === "SINGLE JODI") {
        setSelectedTab("SINGLE_JODI");
        return;
      }
      if (normalizedTabParam.includes("SINGLE") && singleMarket) {
        setSelectedTab("SINGLE_JODI");
        return;
      }
      setSelectedTab(tabItems[0]?.key || "");
    }
  }, [
    tabItems,
    selectedTab,
    normalizedTabParam,
    singleMarket,
    harupAndarMarket,
    harupBaharMarket,
  ]);

  const selectedSingleMarket = selectedTab === "SINGLE_JODI" ? singleMarket : null;
  const selectedSingleMarketName = selectedSingleMarket?.marketName
    ? selectedSingleMarket.marketName.split("_")[0]
    : "";
  const getMarketId = (marketName) =>
    (marketName || "")
      .replace(/\bharup\b/i, "")
      .replace(/\s+/g, " ")
      .trim();

  const selectedSingleMarketId = getMarketId(selectedSingleMarket?.marketName);
  const harupAndarMarketId = getMarketId(harupAndarMarket?.marketName);
  const harupBaharMarketId = getMarketId(harupBaharMarket?.marketName);

  const {
    data: singleLiabilityData,
    isLoading: isSingleLiabilityLoading,
    isFetching: isSingleLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: selectedSingleMarketId,
    },
    { skip: !matchId || selectedTab !== "SINGLE_JODI" || !selectedSingleMarketId }
  );

  const {
    data: harupAndarLiabilityData,
    isLoading: isHarupAndarLiabilityLoading,
    isFetching: isHarupAndarLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: harupAndarMarketId,
    },
    { skip: !matchId || selectedTab !== "HARUP" || !harupAndarMarketId }
  );

  const {
    data: harupBaharLiabilityData,
    isLoading: isHarupBaharLiabilityLoading,
    isFetching: isHarupBaharLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: harupBaharMarketId,
    },
    { skip: !matchId || selectedTab !== "HARUP" || !harupBaharMarketId }
  );

  const isBusy =
    isMarketLoading ||
    isMarketFetching ||
    isBetsLoading ||
    isBetsFetching ||
    isSingleLiabilityLoading ||
    isSingleLiabilityFetching ||
    isHarupAndarLiabilityLoading ||
    isHarupAndarLiabilityFetching ||
    isHarupBaharLiabilityLoading ||
    isHarupBaharLiabilityFetching;

  const buildLiabilityMap = (liabilityPayload) => {
    if (!Array.isArray(liabilityPayload?.data)) return {};
    return liabilityPayload.data.reduce((acc, item) => {
      acc[item.selectionId] = item.liability;
      return acc;
    }, {});
  };
  const singleLiabilities = useMemo(
    () => buildLiabilityMap(singleLiabilityData),
    [singleLiabilityData]
  );
  const harupAndarLiabilities = useMemo(
    () => buildLiabilityMap(harupAndarLiabilityData),
    [harupAndarLiabilityData]
  );
  const harupBaharLiabilities = useMemo(
    () => buildLiabilityMap(harupBaharLiabilityData),
    [harupBaharLiabilityData]
  );

  const errorMessage =
    (marketData?.status === false && marketData?.message) ||
    (betsData?.status === false && betsData?.message) ||
    marketError?.data?.message ||
    betsError?.data?.message;

  const renderRunnerGrid = (market, liabilitiesMap) => {
    const runners = market?.data || [];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "10px",
          marginBottom: "24px",
        }}>
        {runners.map((runner) => (
          <div
            key={runner.selectionId || runner.selectionName}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}>
            <div
              style={{
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #d9d9d9",
                background: "#f2f2f2",
                padding: "6px 8px",
                textAlign: "center",
                fontSize: "13px",
                color: "#2f2f2f",
              }}>
              {runner.selectionName}
            </div>
            <div
              style={{
                fontSize: "13px",
                color:
                  Number(liabilitiesMap[runner.selectionId] || 0) < 0
                    ? "#f03e3e"
                    : "#2fb344",
                fontWeight: 600,
              }}>
              {Number(liabilitiesMap[runner.selectionId] || 0).toFixed(2)}
            </div>
          </div>
        ))}
        {runners.length === 0 && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="match_slip">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title={`${(name || matchInfo?.name || "").toUpperCase()} | EVENT ID: ${
          eventId || ""
        }`}
        extra={<button onClick={() => nav("/matka/inplay")}>Back</button>}>
        <div style={{ padding: "20px" }}>
          <Tabs
            activeKey={selectedTab || (tabItems[0]?.key || "")}
            onChange={(key) => {
              const params = new URLSearchParams(location.search);
              if (key) {
                params.set("tab", key);
              } else {
                params.delete("tab");
              }
              setSelectedTab(key);
              nav({
                pathname: `/matka/inplay/${eventId || ""}/${name || ""}`,
                search: params.toString(),
              });
            }}
            type="card"
            size="small"
            items={tabItems}
          />

          {errorMessage && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px 12px",
                background: "#fff1f0",
                color: "#cf1322",
                border: "1px solid #ffa39e",
                borderRadius: "6px",
              }}>
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div style={{ padding: "30px 0", position: "relative" }}>
              <CustomLoading />
            </div>
          ) : (
            <>
              {selectedTab === "SINGLE_JODI" &&
                renderRunnerGrid(selectedSingleMarket, singleLiabilities)}

              {selectedTab === "HARUP" && (
                <>
                  <div
                    style={{
                      marginBottom: "14px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}>
                    <div
                      style={{
                        background: "#1677ff",
                        color: "#fff",
                        padding: "8px 12px",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}>
                      ANDAR
                    </div>
                    <div style={{ padding: "12px 12px 0 12px" }}>
                      {renderRunnerGrid(harupAndarMarket, harupAndarLiabilities)}
                    </div>
                  </div>
                  <div
                    style={{
                      marginBottom: "14px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}>
                    <div
                      style={{
                        background: "#1677ff",
                        color: "#fff",
                        padding: "8px 12px",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}>
                      BAHAR
                    </div>
                    <div style={{ padding: "12px 12px 0 12px" }}>
                      {renderRunnerGrid(harupBaharMarket, harupBaharLiabilities)}
                    </div>
                  </div>
                </>
              )}
              {!selectedTab && (
                <div style={{ marginBottom: "24px" }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </>
          )}
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>MATKA NAME</th>
                  <th>GAME</th>
                  <th>RATE</th>
                  <th>BET NUM</th>
                  <th>STACK</th>
                  <th>P&L</th>
                  <th>WINNER</th>
                  <th>STATUS</th>
                  <th>CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const filteredBets = bets.filter((bet) => {
                    const betName = (bet.matkaName || "").toUpperCase();
                    const marketId = (bet.marketId || "").toUpperCase();

                    if (selectedTab === "HARUP") {
                      return (
                        betName.includes("HARUP") || marketId.includes("HARUP")
                      );
                    }

                    if (selectedTab === "SINGLE_JODI") {
                      const selectedName = (selectedSingleMarketName || "").toUpperCase();
                      const marketName = (
                        selectedSingleMarket?.marketName || ""
                      ).toUpperCase();
                      return (
                        betName === marketName ||
                        betName === selectedName ||
                        betName.includes(selectedName) ||
                        marketId.includes(selectedName)
                      );
                    }

                    return true;
                  });

                  return filteredBets.length > 0 ? (
                    filteredBets.map((bet, index) => (
                      <tr key={`${bet?.betId || bet?.id || index}`}>
                        <td>{bet?.betId || bet?.id || index + 1}</td>
                        <td>{matchInfo?.name || "-"}</td>
                        <td>{bet.matkaName || "-"}</td>
                        <td>{bet.rate ?? "-"}</td>
                        <td>{bet.nation ?? "-"}</td>
                        <td>{bet.amount ?? "-"}</td>
                        <td>
                          <span
                            className={
                              bet.pnl >= 0 ? "text_success" : "text_danger"
                            }>
                            {Number(bet.pnl || 0).toFixed(2)}
                          </span>
                        </td>
                        <td>
                          {bet.declared === "null" || !bet.declared
                            ? "-"
                            : bet.declared}
                        </td>
                        <td>
                          <span
                            className={bet.back ? "text_info" : "text_danger"}>
                            {bet.back ? "BACK" : "LAY"}
                          </span>
                        </td>
                        <td>{bet.betTime || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InplayMatkaDetail;
