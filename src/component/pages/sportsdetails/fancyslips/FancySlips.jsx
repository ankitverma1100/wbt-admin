/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Row, Col, Form, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";
import {
  useGetChildListForBetsQuery,
  useGetBetlistUrbFilterMutation,
} from "../../../../store/service/SportDetailServices";
import {
  useLazyOddsQuPnlMyQuery,
  useLazyOddsQuPnlQuery,
} from "../../../../store/service/OddsPnlServices";
import FilterBets from "./FilterBets";

const FancySlips = ({ name }) => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [form] = Form.useForm();
  const [selectedMini, setSelectedMini] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedSuper, setSelectedSuper] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const currentUserType = Number(localStorage.getItem("userType") || 0);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const [trigger, { data: matchBets }] = useGetBetlistUrbFilterMutation();
  const [triggerOddsPnl, { data: oddsPnlData }] = useLazyOddsQuPnlQuery();
  const [triggerOddsPnlMy, { data: oddsPnlMyData }] =
    useLazyOddsQuPnlMyQuery();
  const { data: childListData } = useGetChildListForBetsQuery(
    {
      matchId: Number(id),
      forMatchBet: true,
    },
    { skip: !id }
  );

  useEffect(() => {
    trigger({
      matchId: Number(id ?? 35196722),
      forMatchBet: true,
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
    trigger,
  ]);

  useEffect(() => {
    if (!id) return;
    const isInplay = String(inplay ?? "").startsWith("1");
    const payload = {
      matchId: Number(id),
      matchCompleted: !isInplay,
      userId: "",
    };
    triggerOddsPnl(payload);
    triggerOddsPnlMy(payload);
  }, [id, inplay, triggerOddsPnl, triggerOddsPnlMy]);

  const buildPnlMap = (rows = []) =>
    rows.reduce((acc, row) => {
      acc[row?.selection1] = row?.pnl1;
      acc[row?.selection2] = row?.pnl2;
      acc[row?.selection3] = row?.pnl3;
      return acc;
    }, {});

  const totalPnlMap = buildPnlMap(oddsPnlData?.data);
  const myPnlMap = buildPnlMap(oddsPnlMyData?.data);

  const matchBookRows = matchBets?.data?.bookmaker
    ? [
        {
          name: matchBets?.data?.bookmaker?.team1,
          selectionId: matchBets?.data?.bookmaker?.selectionId1,
        },
        {
          name: matchBets?.data?.bookmaker?.team2,
          selectionId: matchBets?.data?.bookmaker?.selectionId2,
        },
        ...(matchBets?.data?.bookmaker?.team3
          ? [
              {
                name: matchBets?.data?.bookmaker?.team3,
                selectionId: matchBets?.data?.bookmaker?.selectionId3,
              },
            ]
          : []),
      ]
    : [];

  const formatPnl = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "-";
    }
    return Number(value).toFixed(2);
  };

  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500); // simulate loading
  };

  const handleReset = () => {
    form.resetFields();
    setClientId("");
    setOddsType("Bookmaker");
    setSelectedMini("");
    setSelectedMaster("");
    setSelectedSuper("");
    setSelectedAgent("");
  };

  const handleClientChange = (value) => {
    setClientId(value);
  };
  useEffect(() => {
    if (matchBets?.data?.bookmaker?.betList) {
      const {
        pnl1 = 0,
        pnl2 = 0,
        pnl3 = 0,
      } = matchBets.data.bookmaker.betList.reduce(
        (acc, bet) => {
          acc.pnl1 += Number(bet.pnl1) || 0;
          acc.pnl2 += Number(bet.pnl2) || 0;
          acc.pnl3 += Number(bet.pnl3) || 0;
          return acc;
        },
        { pnl1: 0, pnl2: 0, pnl3: 0 }
      );

      const newSummary = [
        {
          team: matchBets.data.team1,
          selectionId: matchBets.data.selectionId1,
          pnl: pnl1,
        },
        {
          team: matchBets.data.team2,
          selectionId: matchBets.data.selectionId2,
          pnl: pnl2,
        },
      ];

      if (matchBets.data.team3) {
        newSummary.push({
          team: matchBets.data.team3,
          selectionId: matchBets.data.selectionId3,
          pnl: pnl3,
        });
      }

      setSummaryData(newSummary);
    }
  }, [matchBets]);

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

  const matchBookDisplayRows =
    matchBookRows.length > 0
      ? matchBookRows
      : [
          { name: "-", selectionId: "placeholder-1" },
          { name: "-", selectionId: "placeholder-2" },
        ];

  const bookmakerSummaryRows =
    summaryData?.length > 0
      ? summaryData
      : [
          { team: "-", pnl: null, selectionId: "placeholder-1" },
          { team: "-", pnl: null, selectionId: "placeholder-2" },
        ];

  return (
    <>
      <div className="match_slip">
        <div className="match-book-table ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0">
          <div className="ant-spin-nested-loading">
            <div className="ant-spin-container">
              <div className="ant-table ant-table-small ant-table-bordered">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table
                      className="match-book-table__table"
                      style={{ tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: "60%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                      </colgroup>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" colSpan={3}>
                            <div className="match-book-title">
                              <span>Match Book</span>
                              <button
                                type="button"
                                className="match-book-back"
                                onClick={handleBackClick}>
                                Back
                              </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th className="ant-table-cell">Runner</th>
                          <th className="ant-table-cell">My Book</th>
                          <th className="ant-table-cell">Total Book</th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {matchBookDisplayRows.map((row) => (
                          <tr
                            key={row.selectionId}
                            className="ant-table-row ant-table-row-level-0">
                            <td className="ant-table-cell">
                              <div className="gx-font-weight-semi-bold">
                                {row.name}
                              </div>
                            </td>
                            <td className="ant-table-cell">
                              <div className="match-book-pnl">
                                {formatPnl(myPnlMap[row.selectionId])}
                              </div>
                            </td>
                            <td className="ant-table-cell">
                              <div className="match-book-pnl">
                                {formatPnl(totalPnlMap[row.selectionId])}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ant-row">
          <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-mx-2 gx-bg-grey gx-py-2  gx-w-100">
            <h2 className="gx-text-uppercase gx-text-white gx-mt-1 gx-fs-lg gx-font-weight-bold ">
              bookmaker
            </h2>
          </div>
          <div className="gx-flex gx-overflow-auto">
            {bookmakerSummaryRows.map((item, index) => {
              return (
                <div key={index} className="ant-col gx-my-3 gx-mx-1 gx-px-1 ">
                  <div
                    className={`gx-fillchart ${
                      item?.pnl > 0 ? "gx-bg-green-0" : "gx-bg-red"
                    }  gx-overlay-fillchart`}>
                    <div className="gx-media gx-align-items-center gx-my-3 gx-px-3 gx-fs-xl">
                      <div className="gx-mr-xl-3 gx-d-none gx-d-md-block">
                        <img
                          src="/Images/bar.png"
                          height={44}
                          className="icon icon-chart gx-fs-icon-lg"
                        />
                      </div>
                      <div className="gx-media-body">
                        <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white mb-5">
                          {formatPnl(item?.pnl)}
                        </h1>
                        (0)
                        <br />
                        <h3 />
                        <p className="gx-mb-0 gx-text-nowrap gx-fs-xl mp-5">
                          {item?.team}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <FilterBets
          form={form}
          onFinish={onFinish}
          clientId={clientId}
          onClientChange={handleClientChange}
          currentUserType={currentUserType}
          selectedMini={selectedMini}
          setSelectedMini={setSelectedMini}
          selectedMaster={selectedMaster}
          setSelectedMaster={setSelectedMaster}
          selectedSuper={selectedSuper}
          setSelectedSuper={setSelectedSuper}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          miniOptions={miniOptions}
          masterOptions={masterOptions}
          superOptions={superOptions}
          agentOptions={agentOptions}
          clientOptions={clientOptions}
          oddsType={oddsType}
          setOddsType={setOddsType}
          handleReset={handleReset}
        />

        <div className="match-bets-section">
          <div className="section-header">Match Bets</div>
          {isLoading ? (
            <Spin className="loading_active" tip="Loading..." size="large">
              <div className="content" />
            </Spin>
          ) : (
            <div className="table_section statement_tabs_data active_match_table">
              <table className="match-bets-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Runner Name</th>
                    <th>Bet Type</th>
                    <th>Bet Price</th>
                    <th>Bet Amount</th>
                    <th>Status</th>
                    <th>Winner</th>
                    <th>Place Time</th>
                  </tr>
                </thead>
                <tbody>
                  {matchBets?.data?.bookmaker?.betList?.length > 0 ? (
                    matchBets?.data?.bookmaker?.betList.map((res, id) => (
                      <tr
                        key={id}
                        className={res?.mode === "L" ? "back" : "lay"}>
                        <td>
                          {res?.username} ({res?.userId})
                        </td>
                        <td>{res?.team}</td>
                        <td>{res?.mode !== "L" ? "Lagai" : "Khai"}</td>
                        <td>{Number(res?.odds).toFixed(2)}</td>
                        <td>{res?.stake}</td>
                        <td>{res?.status || "-"}</td>
                        <td>{res?.winner || "-"}</td>
                        <td>{res?.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
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

export default FancySlips;
