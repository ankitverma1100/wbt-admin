import { Col, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetCompletedFancyMutation,
  useGetSessionHavingBetQuery,
} from "../../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../../store/service/supermasteAccountStatementServices";
import "./CompeleteFancy.scss";

const CompeleteFancy = () => {
  const [clientId, setClientId] = useState("");
  const [selectedFancyId, setSelectedFancyId] = useState("");

  const { pathname } = useLocation();

  const nav = useNavigate();
  const { id } = useParams();

  const columns = [
    {
      title: "Place Time",
      dataIndex: "date",
      key: "date",
      render: (_, record) => record?.date || record?.time || "-",
    },
    {
      title: "Runner Name",
      dataIndex: "fancyName",
      key: "fancyName",
      render: (_, record) => record?.fancyName || record?.selectionName || "-",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "userId",
      render: (_, record) =>
        record?.username
          ? `${record.username} (${record.userId})`
          : record?.userId || "-",
    },
    {
      title: "Bet Type",
      dataIndex: "isBack",
      key: "isBack",
      render: (text) => (
        <span className="bet-type-pill">{text ? "YES" : "NO"}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "odds",
      key: "odds",
      render: (text) => text ?? "-",
    },
    {
      title: "Amount",
      dataIndex: "stake",
      key: "stake",
      render: (text) => text ?? "-",
    },
    {
      title: "Status",
      dataIndex: "result",
      key: "result",
      render: (_, record) => {
        const isWin = (record?.netPnl ?? record?.pnl ?? 0) >= 0;
        return (
          <span className={isWin ? "status-pill is-win" : "status-pill is-loss"}>
            {isWin ? "Won" : "Loss"}
          </span>
        );
      },
    },
  ];

  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();
  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: true,
    matchId: id ?? "",
  });
  const [trigger, { data, isLoading, isFetching }] =
    useGetCompletedFancyMutation();

  useEffect(() => {
    if (!selectedFancyId) return;
    trigger({ matchId: id, userId: clientId, fancyId: selectedFancyId });
  }, [id, clientId, selectedFancyId]);

  useEffect(() => {
    userTrigger({ userId: "", userType: 1 });
  }, []);

  const filteredData =
    data?.data?.filter((item) => {
      if (selectedFancyId && item.fancyId !== selectedFancyId) return false;
      if (clientId && item.userId !== clientId) return false;
      return true;
    }) || [];

  return (
    <>
      <div>
        <div className="completed-fancy-panel">
          <div className="completed-fancy-header">
            <span>Completed Bets</span>
            {pathname?.includes("completed-fancy-slips") && (
              <button
                type="button"
                className="completed-fancy-back"
                onClick={() => nav(-1)}>
                Back
              </button>
            )}
          </div>
          <Row gutter={[16, 16]} className="completed-fancy-filters">
            <Col xs={24} md={24} lg={12} xl={12}>
              <label className="completed-fancy-label">Session</label>
              <Select
                placeholder="Select Session"
                value={selectedFancyId}
                onSelect={(value) => setSelectedFancyId(value)}
                allowClear
                onClear={() => setSelectedFancyId("")}
                options={(sessionBets?.data || []).map((item) => ({
                  value: item.fancyId,
                  label: item.fancyName,
                }))}
                showSearch
                className="completed-fancy-select"
              />
            </Col>
            <Col xs={24} md={24} lg={12} xl={12}>
              <label className="completed-fancy-label">Client</label>
              <Select
                placeholder="Select Client"
                showSearch
                onSearch={(value) => {
                  if (value) userTrigger({ userId: value, userType: 1 });
                }}
                value={clientId}
                onSelect={(value) => setClientId(value)}
                allowClear
                className="completed-fancy-select"
                options={[
                  {
                    label: "All Users",
                    value: "",
                  },
                  ...(userData?.data?.map((user) => ({
                    label: `${user.userName} (${user.userId})`,
                    value: user.userId,
                  })) || []),
                ]}
              />
            </Col>
          </Row>

          <div className="completed-fancy-table">
            <Table
              className="completed-fancy-ant"
              bordered
              columns={columns}
              dataSource={filteredData}
              loading={isLoading || isFetching}
              rowKey={(record, index) => `${record?.fancyId}-${index}`}
              rowClassName={(record) =>
                record?.isBack ? "completed-row-back" : "completed-row-lay"
              }
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompeleteFancy;
