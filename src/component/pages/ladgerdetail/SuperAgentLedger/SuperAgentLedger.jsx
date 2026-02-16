import { useState, useEffect } from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./SuperAgentLedger.scss";
import { EyeOutlined, BarChartOutlined } from "@ant-design/icons";
import { useGetLedgerAllQuery } from "../../../../store/service/SportDetailServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import { convertCode, isNsg } from "../../../../store/constant";
import SettlementModal from "./SettlementModal";

const nameData = {
  6: "Mini-Admin",
  5: "Super",
  4: "Master",
  3: "Agent",
  2: "Client",
};

const SuperAgentLedger = () => {
  const { id: userTyep, name: Listname, userId } = useParams();
  const [clearData, setClearData] = useState([]);
  const [denaList, setDenaList] = useState([]);
  const [lenaList, setLenaList] = useState([]);
  const [isDepositeModalOpen, setIsDepositModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);

  const { data, isLoading, isFetching, refetch } = useGetLedgerAllQuery({
    requestTypeUser: Number(userTyep),
    ...(userId && { userId }),
  });

  const nav = useNavigate();

  const handleBackbtn = () => {
    nav(-1);
  };

  // totals
  const denaTotal = Array.isArray(denaList)
    ? denaList.reduce((acc, curr) => acc + (curr?.closinBalane || 0), 0)
    : 0;

  const lenaTotal = Array.isArray(lenaList)
    ? lenaList.reduce((acc, curr) => acc + (curr?.closinBalane || 0), 0)
    : 0;

  useEffect(() => {
    if (data?.data) {
      const dena = Array.isArray(data.data.dena) ? data.data.dena : [];
      const lena = Array.isArray(data.data.lena) ? data.data.lena : [];

      const clearList = dena.filter((item) => item?.closinBalane === 0);
      const filteredDena = dena.filter((item) => item?.closinBalane !== 0);
      // if userId exists, filter by parentId
      const denaFiltered = userId
        ? filteredDena.filter((item) => item?.parentId == userId)
        : filteredDena;

      const clearFiltered = userId
        ? clearList.filter((item) => item?.parentId == userId)
        : clearList;

      const lenaFiltered = userId
        ? lena.filter((item) => item?.parentId == userId)
        : lena;

      setClearData(clearFiltered);
      setDenaList(denaFiltered);
      setLenaList(lenaFiltered);
    }
  }, [data, userId]);

  const handleDownline = (userId) => {
    nav(
      `/client/ledger-super/${userTyep - 1}/${nameData?.[userTyep]}/${userId}`
    );
  };

  const handleSettelemtData = (report, itemName) => {
    setIsDepositModalOpen(true);
    setReportData({
      ...report,
      itemName,
    });
  };

  const generateColumns = (itemName) => [
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "50%",
      render: (text, record) => (
        <span
          style={{ color: "#038fde", cursor: "pointer" }}
          onClick={() => handleDownline(record?.userId)}>
          <EyeOutlined /> {record?.fullName} ({convertCode(record?.userId)})
        </span>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "closinBalane",
      key: "closinBalane",
      width: "35%",
      align: "right",
      render: (text, record) => <span>{Math.abs(record?.closinBalane)}</span>,
    },
    {
      title: '',
      key: "settlement",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <div>
          {/* {itemName !== "Clear" && !isNsg && (
            <Button
              style={{
                padding: "3px 5px",
                fontSize: "12px",
                height: "30px",
                display: "block",
                margin: "auto",
              }}
              onClick={() => handleSettelemtData(record, itemName)}>
              Settlement
            </Button>
          )} */}
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              nav(`/client/txn-super/${Listname}/${userTyep}/${record?.userId}`)
            }>
            <BarChartOutlined
              style={{
                color: "#000",
                backgroundColor: "#ff0",
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                margin: "4px",
              }}
            />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        className="sport_detail ledger_data"
        title={`${Listname?.replace("-", " ")} Ledger`}
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <Row className="main_super_super_ledger" gutter={[24]} style={{ padding: "16px 0px" }}>
          {["Lena", "Dena", "Clear"].map((itemName, index) => (
            <Col key={index} xs={24} md={8} lg={8}>
              <div
                className={`super_ledger item${index + 1}`}
                style={{ width: "100%" }}>
                <div>{itemName}</div>
                <div>
                  {itemName === "Dena"
                    ? Math.abs(denaTotal)?.toFixed(2)
                    : itemName === "Clear"
                    ? clearData.length
                    : Math.abs(lenaTotal)?.toFixed(2)}
                </div>
              </div>
              <div className="table_section" style={{ width: "100%" }}>
                <Table
                  className="live_table limit_update"
                  bordered
                  pagination={false}
                  columns={generateColumns(itemName)}
                  loading={{
                    spinning: isLoading || isFetching,
                    indicator: <CustomLoading />,
                  }}
                  dataSource={
                    itemName === "Clear"
                      ? clearData
                      : itemName === "Dena"
                      ? denaList
                      : lenaList
                  }
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <SettlementModal
        handleClose={() => setIsDepositModalOpen(false)}
        isDepositeModalOpen={isDepositeModalOpen}
        reportData={reportData}
        setReportData={setReportData}
        refetch={refetch}
      />
    </>
  );
};

export default SuperAgentLedger;
