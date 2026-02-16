import "./SportsDetails.scss";
import { Card, Col, DatePicker, Empty, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import LiveReportButton from "../../common/LiveReportButton";
import TablePagination from "../../common/TablePagination";

const { RangePicker } = DatePicker;

const SportsDetails = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [dataNameee, setDataNameee] = useState("");
  const [dropdownStates, setDropdownStates] = useState([]);
  const [activeTabData, setActtiveTabData] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const nav = useNavigate();

  const {
    data: sportDetail,
    isLoading,
    isFetching,
  } = useActiveMatchQuery(activeTabData);

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/1`, { state: { dataNameee } });
  };

  const handleBackbtn = () => {
    nav(-1);
  };

  const onChange = (_, dateString) => {
    setDateData(dateString);
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredData =
    sportDetail?.data?.filter((item) => {
      if (!normalizedSearchTerm) {
        return true;
      }
      const matchName = item?.matchName?.toLowerCase() || "";
      const competitionName = item?.league?.toLowerCase() || "";
      return (
        matchName.includes(normalizedSearchTerm) ||
        competitionName.includes(normalizedSearchTerm)
      );
    }) || [];

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearchTerm, filteredData.length]);

  useEffect(() => {
    const initialStates = new Array(paginatedData.length).fill(false);
    setDropdownStates(initialStates);
  }, [paginatedData.length, currentPage]);

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates].map((_, i) =>
      i === index ? !dropdownStates[i] : false
    );
    setDropdownStates(updatedDropdownStates);
  };

  return (
    <Card
      className="sport_detail"
      title="ACTIVE GAMES"
    >
      <div style={{ padding: "20px" }}>
        <Row className="date_picker" gutter={[16, 16]}>
          <Col
            xl={8}
            lg={8}
            md={24}
            xs={24}
            className="datepicker_sport">
            <RangePicker
              style={{ marginBottom: "10px", width: "100%", borderRadius: "20px" }}
              onChange={onChange}
            />
          </Col>
          <Col
            xl={8}
            lg={8}
            md={24}
            xs={24}
            className="datepicker_sport">
            <Input
              placeholder="Search by name or competition"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              allowClear
              style={{ marginBottom: "10px", width: "100%", borderRadius: "20px" }}
            />
          </Col>
        </Row>

        <div className="table_section">
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="ant-spin-nested-loading">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>DATE & TIME</th>
                <th>COMPETITION NAME</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((res, id) => {
                  return (
                    <tr key={res.key || id}>
                      <td style={{ cursor: "pointer", width: "3%" }}>
                        <Dropdown
                          className="table_dropdown sport_droupdown"
                          open={dropdownStates[id]}
                          onOpenChange={() => toggleDropdown(id)}
                          menu={{
                            items: [
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    to={`/Events/${res.matchId}/4/live-report`}
                                    className="title_section">
                                    MATCH AND SESSION POSITION
                                  </Link>
                                ),
                                key: "0",
                              },
                              {
                                label: (
                                  <span
                                    className="title_section"
                                    onClick={() => handlePlusMinus(res.matchId)}>
                                    MATCH AND SESSION PL REPORT
                                  </span>
                                ),
                                key: "1",
                              },
                              {
                                label: (
                                  <span
                                    className="title_section"
                                    onClick={() =>
                                      nav(
                                        `/matchplusminus/${res?.matchId}/${res?.matchName}`
                                      )
                                    }>
                                    MATCH AND SESSION PL
                                  </span>
                                ),
                                key: "2",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/match-slips/${res.matchId}/1`}>
                                    MATCH BETS
                                  </Link>
                                ),
                                key: "3",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/fancy-slips/${res.matchId}/1`}>
                                    SESSION BETS
                                  </Link>
                                ),
                                key: "4",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/matchsessionbet/${res.matchId}/1`}>
                                    MATCH AND SESSION BET
                                  </Link>
                                ),
                                key: "5",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/completed-fancy-slips/${res.matchId}`}>
                                    COMPLETED FANCIES
                                  </Link>
                                ),
                                key: "6",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/agent-list/${res.matchId}/${res.matchName}`}>
                                    AGENT PLUS MINUS
                                  </Link>
                                ),
                                key: "7",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/rejectedBetsByEvent/${res.matchId}/${res?.matchName}`}>
                                    REJECTED BET
                                  </Link>
                                ),
                                key: "8",
                              },
                            ],
                            className: "sport_list",
                          }}
                          trigger={["click", "contextMenu"]}>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setDataNameee(res.matchName);
                            }}>
                            <Space>
                              <DownOutlined />
                            </Space>
                          </span>
                        </Dropdown>
                      </td>
                      <td>
                        <Link
                          to={`/Events/${res.matchId}/4/live-report`}
                          style={{ color: "#000", cursor: "pointer" }}>
                          {res.matchName}
                        </Link>
                      </td>
                      <td>
                        {moment(res.openDate).format("MM/DD/YYYY hh:mm A")}
                      </td>
                      <td>{res?.league}</td>
                      <td>
                        <LiveReportButton matchId={res.matchId} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination_wrapper">
            <TablePagination
              total={filteredData.length}
              pageSize={pageSize}
              current={currentPage}
              onChange={setCurrentPage}
              className="pagination_main"
            />
          </div>
        </div>
      </div>

    </Card>
  );
};

export default SportsDetails;
