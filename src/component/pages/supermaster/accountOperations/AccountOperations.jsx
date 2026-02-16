import { Card, Col, DatePicker, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./AccountOperations.scss";
import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";
import { useAccOprationQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import { convertCode } from "../../../../store/constant";

const { RangePicker } = DatePicker;

const AccountOperations = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateData, setDateData] = useState([timeBefore, time]);
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccOprationQuery(
    {
      userId: id ? id : userId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) =>
        value ? moment(value).format("DD-MMM-YYYY hh:mm A").toUpperCase() : "",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (text) => <span className="operation_badge">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        const output = text.replace(/\((.*?)\)/g, (match, code) => {
          return `(${convertCode(code)})`;
        });
        return <span>{output.toUpperCase()}</span>;
      },
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}
      <div className="match_slip">
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail acc_name"
            title="Account Operation"
            extra={<button onClick={handleBackClick}>Back</button>}>

            <div className="table_section statement_tabs_data">
              <div className="table_section">
                <Table
                  className="live_table agent_master1"
                  bordered
                  columns={columns}
                  dataSource={data?.data || []}
                  loading={{
                    spinning: isLoading || isFetching,
                    indicator: <CustomLoading />,
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountOperations;
