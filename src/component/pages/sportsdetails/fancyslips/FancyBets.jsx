import { useEffect, useState } from "react";
import { Select, Row, Col, Form, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";
import {
  useGetChildListForBetsQuery,
  useGetBetlistUrbFilterMutation,
  useGetSessionHavingBetQuery,
} from "../../../../store/service/SportDetailServices";

const FancyBets = () => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedMini, setSelectedMini] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedSuper, setSelectedSuper] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const currentUserType = Number(localStorage.getItem("userType") || 0);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: inplay !== "1" ? true : false,
    matchId: id ?? "",
  });
  const { data: childListData } = useGetChildListForBetsQuery(
    {
      matchId: Number(id),
      forMatchBet: false,
    },
    { skip: !id }
  );
  const [trigger, { data: sessionData }] = useGetBetlistUrbFilterMutation();

  useEffect(() => {
    trigger({
      matchId: Number(id ?? 35196722),
      forMatchBet: false,
      adminId: null,
      subAdminId: selectedMini || null,
      superMasterId: selectedMaster || null,
      masterId: selectedSuper || null,
      dealerId: selectedAgent || null,
      userId: clientId || "C2696",
    });
  }, [
    clientId,
    selectedMini,
    selectedMaster,
    selectedSuper,
    selectedAgent,
    id,
  ]);

  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setClientId("");
    setOddsType("");
    setSelectedMini("");
    setSelectedMaster("");
    setSelectedSuper("");
    setSelectedAgent("");
  };

  const toOptions = (items = []) =>
    items.map((idValue) => ({
      label: idValue,
      value: idValue,
    }));

  const miniOptions = toOptions(childListData?.data?.subAminIds || []);
  const masterOptions = toOptions(childListData?.data?.superMasterIds || []);
  const superOptions = toOptions(childListData?.data?.masterIds || []);
  const agentOptions = toOptions(childListData?.data?.dealerIds || []);
  const clientOptions = toOptions(childListData?.data?.userIds || []);

  const showMini = currentUserType > 6;
  const showMaster = currentUserType > 5;
  const showSuper = currentUserType > 4;
  const showAgent = currentUserType > 3;
  const showClient = currentUserType > 2;

  const filteredSessionData =
    oddsType && oddsType !== "ALL"
      ? sessionData?.data?.filter(
          (res) => res?.selectionName === oddsType
        )
      : sessionData?.data;

  return (
    <>
      <div className="match_slip ledger_data">
        <div className="session-filter-section">
          <div className="section-header session-filter-header">
            <span>Filter Bets</span>
            <button
              type="button"
              className="session-back-btn"
              onClick={handleBackClick}>
              Back
            </button>
          </div>
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="form_data">
            <Row className="fancy_data_sess mr">
              <Col xs={24} md={24} lg={24} xl={24}>
                <Form.Item name="session" label="Sessions*">
                  <Select
                    placeholder="Select Session"
                    value={oddsType}
                    options={[
                      { value: "ALL", label: "All Sessions" },
                      ...(sessionBets?.data || []).map((item) => ({
                        value: item.fancyName,
                        label: item.fancyName,
                      })),
                    ]}
                    showSearch
                    allowClear
                    onChange={(value) => setOddsType(value || "")}
                  />
                </Form.Item>
              </Col>
              {showMini && (
                <Col xs={24} md={12} lg={6} xl={6}>
                  <Form.Item name="mini" label="Mini*">
                    <Select
                      placeholder="Select Mini"
                      value={selectedMini}
                      onChange={(value) => setSelectedMini(value)}
                      options={miniOptions}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              )}
              {showMaster && (
                <Col xs={24} md={12} lg={6} xl={6}>
                  <Form.Item name="master" label="Master*">
                    <Select
                      placeholder="Select Master"
                      value={selectedMaster}
                      onChange={(value) => setSelectedMaster(value)}
                      options={masterOptions}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              )}
              {showSuper && (
                <Col xs={24} md={12} lg={6} xl={6}>
                  <Form.Item name="super" label="Super*">
                    <Select
                      placeholder="Select Super"
                      value={selectedSuper}
                      onChange={(value) => setSelectedSuper(value)}
                      options={superOptions}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              )}
              {showAgent && (
                <Col xs={24} md={12} lg={6} xl={6}>
                  <Form.Item name="agent" label="Agent*">
                    <Select
                      placeholder="Select Agent"
                      value={selectedAgent}
                      onChange={(value) => setSelectedAgent(value)}
                      options={agentOptions}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              )}
              {showClient && (
                <Col xs={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    name="username"
                    label="Client*"
                    required={false}
                    rules={[{ required: true, message: "Please Select User" }]}>
                    <Select
                      placeholder="Select Client"
                      showSearch
                      value={clientId}
                      allowClear
                      onSelect={(value) =>
                        setClientId(value === "ALL" ? "" : value)
                      }
                      options={[
                        { label: "All User", value: "ALL" },
                        ...clientOptions,
                      ]}
                    />
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} md={12} lg={6} xl={6} className="filter-reset-col">
                <button
                  type="button"
                  className="filter-reset-btn"
                  onClick={handleReset}>
                  Reset
                </button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="session-bets-section">
          <div className="section-header">Session Bets</div>
          {isLoading ? (
            <Spin className="loading_active" tip="Loading..." size="large">
              <div className="content" />
            </Spin>
          ) : (
            <div className="table_section statement_tabs_data active_match_table">
              <table className="session-bets-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Runner Name</th>
                    <th>Bet Type</th>
                    <th>Bet Price</th>
                    <th>Bet Size</th>
                    <th>Bet Amount</th>
                    <th>Status</th>
                    <th>Winner</th>
                    <th>Place Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessionData?.length > 0 ? (
                    filteredSessionData?.map((res, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={res?.mode === "YES" ? "back" : "lay"}>
                        <td>
                          {res?.username} ({res?.userId})
                        </td>
                        <td>{res?.selectionName}</td>
                        <td>
                          <span className="bet-type-pill">
                            {res?.mode || "-"}
                          </span>
                        </td>
                        <td>{res?.rate ?? "-"}</td>
                        <td>{res?.run ?? "-"}</td>
                        <td>{res?.amount ?? "-"}</td>
                        <td>{res?.status || "-"}</td>
                        <td>{res?.winner || "-"}</td>
                        <td>{res?.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FancyBets;
