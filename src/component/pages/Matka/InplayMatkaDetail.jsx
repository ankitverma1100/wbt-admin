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

  useEffect(() => {
    if (!markets.length) return;
    if (!selectedTab) {
      const initial =
        markets.find((market) => market.marketName === activeTabParam) ||
        markets[0];
      setSelectedTab(initial?.marketName || "");
    }
  }, [markets, selectedTab, activeTabParam]);

  const selectedMarket = useMemo(() => {
    return (
      markets.find((market) => market.marketName === selectedTab) ||
      markets[0]
    );
  }, [markets, selectedTab]);

  const selectedMarketName = selectedMarket?.marketName
    ? selectedMarket.marketName.split("_")[0]
    : "";
  const selectedMarketIdRaw = selectedMarket?.marketName || "";
  const selectedMarketId = selectedMarketIdRaw
    .replace(/\bharup\b/i, "")
    .replace(/\s+/g, " ")
    .trim();

  const {
    data: liabilityData,
    isLoading: isLiabilityLoading,
    isFetching: isLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: selectedMarketId,
    },
    { skip: !matchId || !selectedMarketId }
  );

  const isBusy =
    isMarketLoading ||
    isMarketFetching ||
    isBetsLoading ||
    isBetsFetching ||
    isLiabilityLoading ||
    isLiabilityFetching;

  const liabilities = useMemo(() => {
    if (!Array.isArray(liabilityData?.data)) return {};
    return liabilityData.data.reduce((acc, item) => {
      acc[item.selectionId] = item.liability;
      return acc;
    }, {});
  }, [liabilityData]);

  const totalBetsAmount = selectedMarket
    ? bets
        .filter(
          (bet) =>
            bet.matkaName === selectedMarket.marketName ||
            bet.matkaName === selectedMarketName
        )
        .reduce((sum, bet) => sum + (bet.amount || 0), 0)
    : 0;

  const errorMessage =
    (marketData?.status === false && marketData?.message) ||
    (betsData?.status === false && betsData?.message) ||
    marketError?.data?.message ||
    betsError?.data?.message;

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
            activeKey={selectedTab || (markets[0]?.marketName || "")}
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
            items={markets.map((market) => ({
              key: market.marketName,
              label: market.marketName,
            }))}
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
          <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "10px",
                marginBottom: "24px",
              }}>
              {(selectedMarket?.data || []).map((runner) => (
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
                        Number(liabilities[runner.selectionId] || 0) < 0
                          ? "#f03e3e"
                          : "#2fb344",
                      fontWeight: 600,
                    }}>
                    {Number(
                      liabilities[runner.selectionId] || 0
                    ).toFixed(0)}
                  </div>
                </div>
              ))}
              {(selectedMarket?.data || []).length === 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
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
                  const selectedName = selectedMarketName || "";
                  const filteredBets = selectedMarketId
                    ? bets.filter((bet) => {
                        const betName = (bet.matkaName || "").toUpperCase();
                        const marketName = (selectedMarket?.marketName || "")
                          .toUpperCase();
                        const selected = selectedName.toUpperCase();
                        return (
                          betName === marketName ||
                          betName === selected ||
                          betName.includes(selected) ||
                          (bet.marketId || "").toUpperCase().includes(selected)
                        );
                      })
                    : bets;

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
