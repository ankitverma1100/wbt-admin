import {
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Input,
  Row,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useGetCompletedSportQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import SummaryStrip from "./SummaryStrip";
import TablePagination from "../../common/TablePagination";

const FinishedGame = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [matchId, setMatchId] = useState(0);
  const [InPlay, setInPlay] = useState();
  const pageSize = 50;
  const [indexData, setIndexData] = useState(0);
  const [dataNameee, setDataNameee] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);
  const [activeTabData, setActtiveTabData] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const nav = useNavigate();

  const { data, isFetching, isLoading } = useGetCompletedSportQuery({
    index: indexData,
    noOfRecords: 100,
  });
  const totalRecords = (data?.data?.totalPages || 0) * pageSize;

  const getMatchId = (matchId, inPlay, sportName, statusStraVal) => {
    console.log(matchId, "matchIdmatchIdmatchId");
    setMatchId(matchId);
    setDataNameee(sportName);
    setInPlay(inPlay);
  };

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/0`, { state: { dataNameee } });
  };

  const items = [
    {
      label: (
        <span className="title_section" onClick={() => handlePlusMinus(matchId)}>
          MATCH AND SESSION PL REPORT
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span
          className="title_section"
          // onClick={() => nav("/matchplusminus/1212")}
          onClick={() => nav(`/matchplusminus/${matchId}/${dataNameee}`)}>
          MATCH AND SESSION PL
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/match-slips/${matchId}/0`}>
          MATCH BETS
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/fancy-slips/${matchId}/0`}>
          SESSION BETS
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/matchsessionbet/${matchId}/0`}>
            MATCH AND SESSION BETS
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/completed-fancy-slips/${matchId}`}>
          COMPLETED SESSIONS
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/agent-list/${matchId}/${dataNameee}`}>
          AGENT PLUS MINUS
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/rejectedBetsByEvent/${matchId}/${dataNameee}`}>
          REJECTED BETS
        </Link>
      ),
      key: "5",
    },
  ];

  const handleBackbtn = () => {
    nav(-1);
  };

  const handleStartDateChange = (_, dateString) => {
    setDateData(([_, endDate]) => [dateString, endDate]);
  };

  const handleEndDateChange = (_, dateString) => {
    setDateData(([startDate, _]) => [startDate, dateString]);
  };

  // const sportData = [
  //   { sportId: 4, sportName: "Cricket" },
  //   { sportId: 1, sportName: "Football" },
  //   { sportId: 2, sportName: "Tennis" },
  // ];

  const sportDetail = {
    data: {
      totalPages: 1,
      data: [
        {
          key: 1,
          eventId: 101,
          eventName: "India vs Australia",
          statusStr: "In Play",
          eventDate: moment().subtract(1, "days").toISOString(),
          isLedgerCreated: true,
          winner: "India",
          plusMinus: 1200,
          upLineAmount: -300,
          inPlay: true,
        },
        {
          key: 2,
          eventId: 102,
          eventName: "England vs Pakistan",
          statusStr: "Completed",
          eventDate: moment().subtract(3, "days").toISOString(),
          isLedgerCreated: true,
          winner: "England",
          plusMinus: -500,
          upLineAmount: 100,
          inPlay: false,
        },
      ],
    },
  };

  useEffect(() => {
    const initialStates = new Array(sportDetail?.data?.data?.length).fill(
      false
    );
    setDropdownStates(initialStates);
  }, [activeTabData]);

  const handleScroll = () => {
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownStates(updatedDropdownStates);
  };

  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element?.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <Card
        className="sport_detail finished_game"
        title="COMPLETED GAMES"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <Row
          className="date_picker"
          align="middle"
          justify="start"
          gutter={[16, 16]}
          style={{ padding: "6px 10px 0px" }}>
          <Col xl={8} lg={8} md={24} xs={24} className="datepicker_sport">
            <DatePicker
              style={{
                marginBottom: "10px",
                width: "100%",
                borderRadius: "20px",
              }}
              onChange={handleStartDateChange}
              placeholder="Start date"
            />
          </Col>
          <Col xl={8} lg={8} md={24} xs={24} className="datepicker_sport">
            <DatePicker
              style={{
                marginBottom: "10px",
                width: "100%",
                borderRadius: "20px",
              }}
              onChange={handleEndDateChange}
              placeholder="End date"
            />
          </Col>
          <Col xl={8} lg={8} md={24} xs={24} className="datepicker_sport">
            <Input
              placeholder="Search by event name or winner"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              allowClear
              style={{ marginBottom: "10px", width: "100%", borderRadius: "20px" }}
            />
          </Col>
        </Row>
        <SummaryStrip />
        <div ref={myElementRef} className="table_section">
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="ant-spin-nested-loading">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Event Name</th>
                <th>Won By</th>
                <th>Comm +</th>
                <th>Comm -</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.completedMatchList.map((res, id) => (
                <tr key={res.id}>
                  <td style={{ cursor: "pointer", width: "3%" }}>
                    <Dropdown
                      className="table_dropdown sport_droupdown"
                      open={dropdownStates[id]}
                      onOpenChange={() => toggleDropdown(id)}
                      menu={{
                        items,
                        className: "sport_list",
                      }}
                      trigger={["click", "contextMenu"]}>
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          getMatchId(
                            res.matchId,
                            false,
                            res.eventName,
                            res.statusStr
                          );
                        }}>
                        <Space>
                          <CaretDownOutlined />
                        </Space>
                      </span>
                    </Dropdown>
                  </td>
                  <td>
                    {moment(res.createdOn).format("MM/DD/YYYY hh:mm A")}
                  </td>
                  <td>{res.eventName}</td>
                  <td>{res?.winner}</td>
                  <td></td>
                  <td></td>
                  <td style={{ color: res?.pnl > 0 ? "green" : "red" }}>
                    {res?.pnl}
                  </td>
                </tr>
              ))}
              {sportDetail.data.data.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Divider />
        <TablePagination
          style={{ marginBottom: "12px" }}
          className="pagination_main ledger_pagination pagination_main"
          total={totalRecords}
          pageSize={pageSize}
          current={indexData + 1}
          onChange={(e) => setIndexData(e - 1)}
        />
      </Card>
    </>
  );
};

export default FinishedGame;
