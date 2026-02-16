import { Card, Empty, Spin, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import "./ActiveMatch.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ActiveMatch = () => {
  const nav = useNavigate();

  const handleDetails = (id) => {
    nav(`/Events/${id}/4/live-report`);
  };

  const { data, isLoading, isFetching } = useActiveMatchQuery(4, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="active_slip login_report" style={{ marginBottom: "12px" }}>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail active_match_name"
        title="ACTIVE MATCHES">
        {isLoading || isFetching ? (
          <Spin className="loading_active" tip="Loading..." size="large">
            <div className="content" />
          </Spin>
        ) : (
          <div className="table_section statement_tabs_data active_match_table">
            <table className="active_match_table_grid">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>OPEN DATE</th>
                  <th>COMPETITION</th>
                  <th>INPLAY</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((res, id) => {
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{res?.matchName}</td>
                      <td>
                        {moment(res?.openDate).format("MM/DD/YYYY hh:mm A")}
                      </td>
                      <td>{res?.league}</td>
                      <td>
                        <span
                          className={`inplay_badge ${
                            res?.inPlay ? "inplay_active" : ""
                          }`}>
                          {res?.inPlay && <span className="inplay_dot" />}
                          INPLAY
                        </span>
                      </td>
                      <td>
                        <Button
                          type="primary"
                          size="small"
                          className="details_btn"
                          icon={<EyeOutlined />}
                          onClick={() => handleDetails(res?.matchId)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {data?.data?.length == 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              ""
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ActiveMatch;
