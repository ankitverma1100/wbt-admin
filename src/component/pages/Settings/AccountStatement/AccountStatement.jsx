import "./AccountStatement.scss";
import { Card, DatePicker, Form, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AllStatement from "./AllStatement/AllStatement";
import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";
import { useAccountOprationQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const AccountStatement = () => {
  const timeBefore = moment().startOf("month").format("YYYY-MM-DD");
  const time = moment().endOf("month").format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");
  const [detailType, setDetailsType] = useState("ALL");

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccountOprationQuery(
    {
      detailType: detailType,
      fromDate: dateData[0],
      toDate: dateData[1],
      ...(id && { userId: id }),
    },
    { refetchOnMountOrArgChange: true }
  );

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const activeFilterStyle = {
    backgroundColor: "#0b79d0",
    border: "1px solid #0b79d0",
    color: "#fff",
  };
  const inactiveFilterStyle = {
    backgroundColor: "#fff",
    border: "1px solid #d9d9d9",
    color: "#000",
  };

  const pName = window.location.pathname;
  const statementRows = data?.data || [];
  const totalCredit = statementRows.reduce(
    (sum, row) => sum + Number(row?.credit || 0),
    0
  );
  const totalDebit = statementRows.reduce(
    (sum, row) => sum + Number(row?.debit || 0),
    0
  );

  return (
    <>
      <div className={pName == "/app/settings" ? "" : "match_slip"}>
        <div className="">
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail "
            title={`STATEMENT`}
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div className="main_acc_section">
              <div className="datepicker">
                <Form
                  autoComplete="off"
                  name="basic"
                  // onFinish={onFinish}
                >
                  <Row justify="end">
                    {/* <Col xs={24} lg={6}>
                      <RangePicker
                        defaultValue={[dayjs(timeBefore), dayjs(time)]}
                        style={{
                          marginBottom: "10px",
                          width: "100%",
                          borderRadius: "20px",
                        }}
                        onChange={onChange}
                      />
                    </Col> */}
                    <Col xs={24} md={24} lg={12} xl={12} className="statement_filters">
                      <div style={{ padding: "12px" }}>
                        <div className="statement_filter_group">
                          <div
                            className={`statement_filter_btn ${
                              detailType === "ALL" ? "is-active" : ""
                            }`}
                            style={
                              detailType === "ALL"
                                ? activeFilterStyle
                                : inactiveFilterStyle
                            }
                            onClick={() => setDetailsType("ALL")}>
                            All
                          </div>
                          <div
                            className={`statement_filter_btn ${
                              detailType === "PNL" ? "is-active" : ""
                            }`}
                            style={
                              detailType === "PNL"
                                ? activeFilterStyle
                                : inactiveFilterStyle
                            }
                            onClick={() => setDetailsType("PNL")}>
                            P&amp;L
                          </div>
                          <div
                            className={`statement_filter_btn ${
                              detailType === "ACCOUNT" ? "is-active" : ""
                            }`}
                            style={
                              detailType === "ACCOUNT"
                                ? activeFilterStyle
                                : inactiveFilterStyle
                            }
                            onClick={() => setDetailsType("ACCOUNT")}>
                            Limit
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
              {detailType === "ACCOUNT" && (
                <div className="statement_limit_summary">
                  <div className="statement_limit_item">
                    <div className="statement_limit_label">TOTAL CREDIT</div>
                    <div className="statement_limit_value is-credit">
                      {totalCredit.toFixed(2)}
                    </div>
                  </div>
                  <div className="statement_limit_item">
                    <div className="statement_limit_label">TOTAL DEBIT</div>
                    <div className="statement_limit_value is-debit">
                      {totalDebit.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
              <div className="tab_section transtion_tab">
                <AllStatement
                  gameType={1}
                  clientId={clientId}
                  loading={{
                    spinning: isLoading || isFetching,
                    indicator: <CustomLoading />,
                  }}
                  dateData={statementRows}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountStatement;
