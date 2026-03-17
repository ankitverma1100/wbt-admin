import React, { useState } from "react";
import BookDataShow from "./BookDataShow";
import {
  useGetActiveSessionDataQuery,
  useGetFancyBookMutation,
  useGetSessionBetMutation,
} from "../../../store/service/SportDetailServices";
import { useParams } from "react-router-dom";

const FancyData = ({ data }) => {
  const { id } = useParams();
  const [openBook, setShowOpenBook] = useState(false);
  const [fancyName, setFancyName] = useState("");
  const [getFancyBook, { data: fancyBookData }] = useGetFancyBookMutation();
  const [getSessionBet, { data: sessionData }] = useGetSessionBetMutation();
  const { data: activeSession } = useGetActiveSessionDataQuery(
    {
      matchId: id ?? "",
    },
    { pollingInterval: 20000 }
  );

  const handleBookData = (fancyId, fancyName) => {
    setFancyName(fancyName);
    setShowOpenBook(!openBook);
    getFancyBook({ fancyId: fancyId, matchId: id });
    getSessionBet({
      matchId: id,
      userId: "",
      marketId: fancyId,
      matchCompleted: false,
    });
  };

  const activeFancyIds = new Set(
    activeSession?.data?.map((item) => item.fancyId) ?? []
  );

  return (
    <>
      {data &&
        Object.entries(data)
          ?.sort(
            ([, a], [, b]) =>
              Number(a?.[0]?.srno ?? 0) - Number(b?.[0]?.srno ?? 0)
          )
          .map(([item, values]) => {
            if (["Odds", "Bookmaker"].includes(item)) return null;

            // const filteredValues = values?.filter((fancy) =>
            //   activeFancyIds.has(fancy?.sid)
            // );
            const filteredValues = values;

            // if (!filteredValues?.length) return null;

            if (values?.length > 0)
              return (
                <div
                  key={item}
                  className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
                  style={{ marginTop: 16 }}>
                  <div className="ant-spin-nested-loading">
                    <div className="ant-spin-container">
                      <div className="ant-table ant-table-small ant-table-bordered">
                        <div className="ant-table-container">
                          <div className="ant-table-content">
                            <table style={{ tableLayout: "auto" }}>
                              <colgroup>
                                <col style={{ width: "60%" }} />http://localhost:5174/dashboard
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "20%" }} />
                              </colgroup>
                              <thead className="ant-table-thead">
                                <tr>
                                  <th className="ant-table-cell matchdtailsNoYesBackground">
                                    <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
                                      <span className="gx-px-3 gx-py-1 gx-bg-primary">
                                        {item == 'Fancy2' ? 'Fancy (Comm.)' : item} 
                                      </span>
                                      <span style={{ whiteSpace: "nowrap" }}>
                                        Min: 100
                                        <br />
                                        Max: 200000
                                      </span>
                                    </div>
                                  </th>
                                  <th
                                    className="ant-table-cell matchdtailsNoBackground"
                                    style={{
                                      textAlign: "center",
                                    }}>
                                    No
                                  </th>
                                  <th
                                    className="ant-table-cell matchdtailsYesBackground"
                                    style={{
                                      textAlign: "center",
                                    }}>
                                    YES
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="ant-table-tbody">
                                {filteredValues?.map((fancy) => {
                                  return (
                                    <tr
                                      key={fancy?.sid}
                                      className="ant-table-row ant-table-row-level-0">
                                      <td className="ant-table-cell">
                                        <div className="">
                                          <div className="gx-bg-flex gx-my-0">
                                            <div className="gx-font-weight-semi-bold text-white">
                                              {fancy?.nation}
                                            </div>
                                            <button
                                              type="button"
                                              className="ant-btn ant-btn-default gx-my-0 gx-bg-white"
                                              style={{
                                                height: 30,
                                                color: "#000",
                                                lineHeight: "30px",
                                                marginLeft: 10,
                                              }}
                                              onClick={() =>
                                                handleBookData(
                                                  fancy?.sid,
                                                  fancy?.nation
                                                )
                                              }>
                                              <span> B</span>
                                            </button>
                                          </div>
                                        </div>
                                      </td>

                                      {fancy?.gstatus == "" ? (
                                        <>
                                          <td
                                            className="ant-table-cell matchdtailsNoBackground"
                                            style={{ textAlign: "center" }}>
                                            <div style={{}}>
                                              <div className="gx-font-weight-semi-bold">
                                                {fancy?.l1}
                                              </div>
                                              <div className="gx-font-weight-semi-bold">
                                                {fancy?.ls1}
                                              </div>
                                            </div>
                                          </td>
                                          <td
                                            className="ant-table-cell matchdtailsYesBackground"
                                            style={{ textAlign: "center" }}>
                                            <div style={{}}>
                                              <div className="gx-font-weight-semi-bold">
                                                {fancy?.b1}
                                              </div>
                                              <div className="gx-font-weight-semi-bold">
                                                {fancy?.bs1}
                                              </div>
                                            </div>
                                          </td>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <td
                                            className="ant-table-cell matchdtailsSuspendBackground"
                                            style={{ textAlign: "center" }}>
                                            <div
                                              style={{ fontSize: 8 }}
                                              className="gx-font-weight-light gx-py-1">
                                              SUSPENDED
                                            </div>
                                          </td>
                                          <td
                                            className="ant-table-cell matchdtailsSuspendBackground"
                                            style={{ textAlign: "center" }}>
                                            <div
                                              style={{ fontSize: 8 }}
                                              className="gx-fs-xs gx-py-1">
                                              SUSPENDED
                                            </div>
                                          </td>
                                        </>
                                      )}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}

      <BookDataShow
        openBook={openBook}
        sessionData={sessionData?.data}
        fancyBookData={fancyBookData?.data}
        setOpenBook={setShowOpenBook}
        fancyName={fancyName}
      />
    </>
  );
};

export default FancyData;
