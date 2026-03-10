import React from "react";

const Bookmaker = ({
  data,
  pnl,
  oddsPnlMy,
  handleTtlBook,
  handleOddBook,
  setShowTtlBook,
  showTtlBook,
}) => {
  const bookmakerRows =
    data?.Bookmaker?.filter((item) => item?.t === "Bookmaker") || [];
  const processedBookmakerRows = [...bookmakerRows];

  if (processedBookmakerRows.length >= 2) {
    const allB1Same = processedBookmakerRows.every(
      (item) => Number(item?.b1) === Number(processedBookmakerRows[0]?.b1)
    );

    if (allB1Same) {
      const allL1Same = processedBookmakerRows.every(
        (item) => Number(item?.l1) === Number(processedBookmakerRows[0]?.l1)
      );

      if (!allL1Same) {
        const maxL1Index = processedBookmakerRows.reduce(
          (maxIdx, curr, idx, arr) =>
            Number(curr?.l1) > Number(arr[maxIdx]?.l1) ? idx : maxIdx,
          0
        );

        processedBookmakerRows.forEach((item, index) => {
          if (index !== maxL1Index) {
            processedBookmakerRows[index] = {
              ...item,
              b1: 0,
              l1: 0,
            };
          }
        });
      }
    } else {
      const minB1Index = processedBookmakerRows.reduce((minIdx, curr, idx, arr) => {
        const currStatus = curr?.gstatus?.toLowerCase();
        const minStatus = arr[minIdx]?.gstatus?.toLowerCase();

        if (currStatus === "suspended") return minIdx;
        if (minStatus === "suspended") return idx;

        return Number(curr?.b1) < Number(arr[minIdx]?.b1) ? idx : minIdx;
      }, 0);

      processedBookmakerRows.forEach((item, index) => {
        if (index !== minB1Index) {
          processedBookmakerRows[index] = {
            ...item,
            b1: 0,
            l1: 0,
          };
        }
      });
    }
  }

  return (
    <>
      <div
        className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0 bookmaker-table"
        style={{ marginTop: 16 }}>
        <div className="ant-spin-nested-loading">
          <div className="ant-spin-container">
            <div className="ant-table ant-table-small ant-table-bordered">
              <div className="ant-table-container">
                <div className="ant-table-content">
                  <table style={{ tableLayout: "auto" }}>
                    <colgroup>
                      <col style={{ width: "60%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>
                    <thead className="ant-table-thead">
                      <tr>
                        <th className="ant-table-cell matchdtailsNoYesBackground">
                          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
                            <div className="bookmaker-tabs">
                              <button
                                type="button"
                                className={`bookmaker-tab ${
                                  showTtlBook ? "is-active" : ""
                                }`}
                                onClick={() => {
                                  setShowTtlBook(true);
                                  handleOddBook();
                                }}>
                                My Book
                              </button>
                              <button
                                type="button"
                                className={`bookmaker-tab ${
                                  !showTtlBook ? "is-active" : ""
                                }`}
                                onClick={() => {
                                  setShowTtlBook(false);
                                  handleTtlBook();
                                }}>
                                Ttl Book
                              </button>
                            </div>
                          </div>
                        </th>
                        <th
                          className="ant-table-cell matchdtailsYesBackground"
                          style={{ textAlign: "center", fontWeight: 500 }}>
                          Lagai
                        </th>
                        <th
                          className="ant-table-cell matchdtailsNoBackground"
                          style={{ textAlign: "center", fontWeight: 500 }}>
                          Khai
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {processedBookmakerRows?.map((runner, index) => {
                        const pnlsOdds = pnl?.find(
                          (element) => element?.marketId == runner?.mid
                        );
                        const plnOddsArray = pnlsOdds
                          ? [
                              {
                                pnl: pnlsOdds.pnl1,
                                selectionId: pnlsOdds.selection1,
                              },
                              {
                                pnl: pnlsOdds.pnl2,
                                selectionId: pnlsOdds.selection2,
                              },
                              {
                                pnl: pnlsOdds.pnl3,
                                selectionId: pnlsOdds.selection3,
                              },
                            ]
                          : [];
                        const pnlsOddsMy = oddsPnlMy?.find(
                          (element) => element?.marketId == runner?.mid
                        );
                        const plnOddsArrayMy = pnlsOddsMy
                          ? [
                              {
                                pnl: pnlsOddsMy.pnl1,
                                selectionId: pnlsOddsMy.selection1,
                              },
                              {
                                pnl: pnlsOddsMy.pnl2,
                                selectionId: pnlsOddsMy.selection2,
                              },
                              {
                                pnl: pnlsOddsMy.pnl3,
                                selectionId: pnlsOddsMy.selection3,
                              },
                            ]
                          : [];

                        const pnlOdds = showTtlBook
                          ? plnOddsArray?.find(
                              (element) => element?.selectionId == runner?.sid
                            )?.pnl || 0
                          : plnOddsArrayMy?.find(
                              (element) => element?.selectionId == runner?.sid
                            )?.pnl || 0;

                        return (
                          <tr
                            key={runner?.selectionId}
                            data-row-key={0}
                            className="ant-table-row ant-table-row-level-0">
                            <td className="ant-table-cell matchdtailsBlackBackground">
                              <div className="">
                                <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                  {runner?.nation}
                                </div>
                                <div
                                  className={
                                    pnlOdds > 0
                                      ? "gx-text-success"
                                      : "gx-text-danger"
                                  }>
                                  {pnlOdds?.toFixed(2)}
                                </div>
                              </div>
                            </td>
                            <td
                              className="ant-table-cell matchdtailsYesBackground"
                              style={{ textAlign: "center" }}>
                              <div className="gx-font-weight-semi-bold">
                                {runner?.b1}
                              </div>
                            </td>
                            <td
                              className="ant-table-cell matchdtailsNoBackground"
                              style={{ textAlign: "center" }}>
                              <div className="gx-font-weight-semi-bold">
                                {runner?.l1}
                              </div>
                            </td>
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
    </>
  );
};

export default Bookmaker;
