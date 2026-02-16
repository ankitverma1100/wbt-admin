import { Card, Empty } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../common/LinkButton";
import TablePagination from "../../common/TablePagination";
import ActionButton from "../../common/ActionButton";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useGetMatkaListQuery } from "../../../store/service/MatkaServices";

const InplayMatka = () => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const defaultStartDate = dayjs().subtract(14, "day").format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  const [appliedDateRange, setAppliedDateRange] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const { data, isLoading, isFetching, error } = useGetMatkaListQuery(
    {
      startDate: appliedDateRange.startDate,
      endDate: appliedDateRange.endDate,
    },
    { refetchOnMountOrArgChange: true }
  );

  const matkaMatches = Array.isArray(data?.data) ? data.data : [];
  const responseError =
    data?.status === false ? data?.message : null;
  const errorMessage = responseError || error?.data?.message;
  const isBusy = isLoading || isFetching;

  const paginatedData = matkaMatches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSubmit = () => {
    setCurrentPage(1);
    setAppliedDateRange({ ...selectedDateRange });
  };

  const getMatchId = (match, fallback) =>
    match?.eventId || match?.id || match?.matchId || match?.event_id || fallback;
  const getMatchName = (match) =>
    match?.name || match?.eventName || match?.title || "";
  const getMatchTime = (match) =>
    match?.time || match?.startTime || match?.start_time || match?.dateTime || "";

  return (
    <div className="match_slip inplay_casino">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title="ACTIVE GAMES"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div className="table_section statement_tabs_data" style={{ padding: "20px" }}>
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="date"
                value={selectedDateRange.startDate}
                onChange={(e) =>
                  setSelectedDateRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
              <span style={{ fontWeight: 600 }}>to</span>
              <input
                type="date"
                value={selectedDateRange.endDate}
                onChange={(e) =>
                  setSelectedDateRange((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
            <ActionButton onClick={handleSubmit} loading={isBusy}>
              Submit
            </ActionButton>
          </div>

          {isBusy ? (
            <div style={{ padding: "30px 0", position: "relative" }}>
              <CustomLoading />
            </div>
          ) : (
            <>

            <table className="live_table login_data_table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>NAME</th>
                    <th style={{ width: "60%" }}>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => {
                    const matchId = getMatchId(item, index);
                    const matchName = getMatchName(item);
                    return (
                      <tr key={matchId}>
                        <td>{matchName || "Match"}</td>
                        <td>
                          <div
                            className="gx-justify-content-start"
                            style={{ display: "flex", alignItems: "center" }}>
                            <LinkButton
                              to={`/matka/inplay/${matchId}/${String(
                                matchName
                              ).toLowerCase()}`}
                              label="View"
                              icon={<EyeOutlined />}
                            />
                            <LinkButton
                              to={`/matka/all-bets/${matchId}`}
                              label="All Bets"
                              icon={<EyeOutlined />}
                              className="Display_Games"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={2}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        <TablePagination
          style={{ marginBottom: "12px" }}
          className="pagination_main ledger_pagination"
          total={matkaMatches.length}
          pageSize={pageSize}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default InplayMatka;
