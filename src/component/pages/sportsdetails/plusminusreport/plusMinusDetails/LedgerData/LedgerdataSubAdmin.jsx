import { convertCode } from "../../../../../../store/constant";
import "./style.scss";

const RecursiveCard = ({ data, depth }) => {
  if (!data || !data.length) return null;

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className={`card card-${depthColors[depth]}  ${
            depthColors[depth] === "dark" ? "bg-gray-light" : ""
          }`}>
          <div className={` card-header ${`color_${depth}`} `}>
            <h2 className="card-title text-bold">
              <span className={`card_${depth}`}></span>
              <span className="border-userid">{convertCode(item[depthKeys[depth]])}</span>
            </h2>
          </div>
          <div className="card-body">
            {depth < depthKeys.length - 1 ? (
              <RecursiveCard data={item.ledgetList} depth={depth + 1} />
            ) : (
              <>
                <div className="card-body" style={{ overflow: "scroll" }}>
                  <table id="data" className="plus-table plus_minus_sec">
                    <thead>
                      <tr>
                        <th colSpan={5} />
                        <th colSpan={6}>Agent PlusMinus </th>
                        <th colSpan={6}>Super Agent PlusMinus </th>
                        <th colSpan={6}>Master Agent PlusMinus </th>
                        <th colSpan={6}>Mini Master PlusMinus</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>M Amt</th>
                        <th>S Amt</th>
                        <th>Toss Amt</th>
                        <th>TOTAL Amt</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.ledgetList.map((agent) => (
                        <tr key={agent.userId}>
                          <td>
                            {agent.userId} {agent.username}
                          </td>
                          <td>{agent?.matchAmount?.toFixed(2)}</td>
                          <td>{agent?.sessionAmount?.toFixed(2)}</td>
                          <td>{agent?.tossAmount?.toFixed(2)}</td>
                          <td>{agent?.totalAmoount?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.sessionCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.totalCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.netAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.shareAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.finalAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.sessionCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.totalCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.netAmountMaster?.toFixed(2)}</td>
                          <td>{agent?.shareAmountMaster?.toFixed(2)}</td>
                          <td>{agent?.finalAmountMaster?.toFixed(2)}</td>
                          <td>
                            {agent?.matchCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.sessionCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.totalCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>{agent?.netAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.shareAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.finalAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionSubAdmin?.toFixed(2)}</td>
                          <td>
                            {agent?.sessionCommissionSubAdmin?.toFixed(2)}
                          </td>
                          <td>{agent?.totalCommissionSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.netAmountSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.shareAmountSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.finalAmountSubAdmin?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>TOTAL</th>
                        <td>{item?.matchAmount?.toFixed(2)}</td>
                        <td>{item?.sessionAmount?.toFixed(2)}</td>
                        <td>{item?.tossAmount?.toFixed(2)}</td>
                        <td>{item?.totalAmoount?.toFixed(2)}</td>
                        <td>{item?.matchCommissionDealer?.toFixed(2)}</td>
                        <td>{item?.sessionCommissionDealer?.toFixed(2)}</td>
                        <td>{item?.totalCommissionDealer?.toFixed(2)}</td>
                        <td>{item?.netAmountDealer?.toFixed(2)}</td>
                        <td>{item?.shareAmountDealer?.toFixed(2)}</td>
                        <td>{item?.finalAmountDealer?.toFixed(2)}</td>
                        <td>{item?.matchCommissionMaster?.toFixed(2)}</td>
                        <td>{item?.sessionCommissionMaster?.toFixed(2)}</td>
                        <td>{item?.totalCommissionMaster?.toFixed(2)}</td>
                        <td>{item?.netAmountMaster?.toFixed(2)}</td>
                        <td>{item?.shareAmountMaster?.toFixed(2)}</td>
                        <td>{item?.finalAmountMaster?.toFixed(2)}</td>
                        <td>{item?.matchCommissionSuperMaster?.toFixed(2)}</td>
                        <td>
                          {item?.sessionCommissionSuperMaster?.toFixed(2)}
                        </td>
                        <td>{item?.totalCommissionSuperMaster?.toFixed(2)}</td>
                        <td>{item?.netAmountSuperMaster?.toFixed(2)}</td>
                        <td>{item?.shareAmountSuperMaster?.toFixed(2)}</td>
                        <td>{item?.finalAmountSuperMaster?.toFixed(2)}</td>
                        <td>{item?.matchCommissionSubAdmin?.toFixed(2)}</td>
                        <td>{item?.sessionCommissionSubAdmin?.toFixed(2)}</td>
                        <td>{item?.totalCommissionSubAdmin?.toFixed(2)}</td>
                        <td>{item?.netAmountSubAdmin?.toFixed(2)}</td>
                        <td>{item?.shareAmountSubAdmin?.toFixed(2)}</td>
                        <td>{item?.finalAmountSubAdmin?.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
          {depthKeysF[depth] !== "A" && (
            <div className="card-footer" style={{ overflow: "scroll" }}>
              <table
                className="plus-table plus_minus_sec"
                style={{ height: "auto", minHeight: "auto" }}>
                <thead className="bg-gradient-white">
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                      }}>
                      {depthKeysF[depth]} TOTAL
                    </th>
                    <td>{item?.matchAmount?.toFixed(2)}</td>
                    <td>{item?.sessionAmount?.toFixed(2)}</td>
                    <td>{item?.tossAmount?.toFixed(2)}</td>
                    <td>{item?.totalAmoount?.toFixed(2)}</td>
                    <td>{item?.matchCommissionDealer?.toFixed(2)}</td>
                    <td>{item?.sessionCommissionDealer?.toFixed(2)}</td>
                    <td>{item?.totalCommissionDealer?.toFixed(2)}</td>
                    <td>{item?.netAmountDealer?.toFixed(2)}</td>
                    <td>{item?.shareAmountDealer?.toFixed(2)}</td>
                    <td>{item?.finalAmountDealer?.toFixed(2)}</td>
                    <td>{item?.matchCommissionMaster?.toFixed(2)}</td>
                    <td>{item?.sessionCommissionMaster?.toFixed(2)}</td>
                    <td>{item?.totalCommissionMaster?.toFixed(2)}</td>
                    <td>{item?.netAmountMaster?.toFixed(2)}</td>
                    <td>{item?.shareAmountMaster?.toFixed(2)}</td>
                    <td>{item?.finalAmountMaster?.toFixed(2)}</td>
                    <td>{item?.matchCommissionSuperMaster?.toFixed(2)}</td>
                    <td>{item?.sessionCommissionSuperMaster?.toFixed(2)}</td>
                    <td>{item?.totalCommissionSuperMaster?.toFixed(2)}</td>
                    <td>{item?.netAmountSuperMaster?.toFixed(2)}</td>
                    <td>{item?.shareAmountSuperMaster?.toFixed(2)}</td>
                    <td>{item?.finalAmountSuperMaster?.toFixed(2)}</td>
                    <td>{item?.matchCommissionSubAdmin?.toFixed(2)}</td>
                    <td>{item?.sessionCommissionSubAdmin?.toFixed(2)}</td>
                    <td>{item?.totalCommissionSubAdmin?.toFixed(2)}</td>
                    <td>{item?.netAmountSubAdmin?.toFixed(2)}</td>
                    <td>{item?.shareAmountSubAdmin?.toFixed(2)}</td>
                    <td>{item?.finalAmountSubAdmin?.toFixed(2)}</td>
                  </tr>
                </thead>
              </table>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const depthLabels = ["MasterAgent", "SuperAgent", "Agent"];
const depthColors = ["purple", "primary", "success"];
const depthKeys = ["superMasterName", "masterName", "dealerName"];
const depthKeysF = ["MA", "SA", "A"];

const LedgerdataSubAdmin = ({ ledgerData }) => {
  return (
    <>
      <div className={`card card-dark`}>
        <div className="card-body">
          <RecursiveCard data={ledgerData?.data?.ledgetList} depth={0} />
          <div className="card-footer" style={{ overflow: "scroll" }}>
            <table
              className="plus-table plus_minus_sec"
              style={{ height: "auto", minHeight: "auto" }}>
              <thead className="bg-gradient-white">
                <tr>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                    }}>
                    SUB TOTAL
                  </th>
                  <td>{ledgerData?.data?.matchAmount?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.sessionAmount?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.tossAmount?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.totalAmoount?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.matchCommissionDealer?.toFixed(2)}</td>
                  <td>
                    {ledgerData?.data?.sessionCommissionDealer?.toFixed(2)}
                  </td>
                  <td>{ledgerData?.data?.totalCommissionDealer?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.netAmountDealer?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.shareAmountDealer?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.finalAmountDealer?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.matchCommissionMaster?.toFixed(2)}</td>
                  <td>
                    {ledgerData?.data?.sessionCommissionMaster?.toFixed(2)}
                  </td>
                  <td>{ledgerData?.data?.totalCommissionMaster?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.netAmountMaster?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.shareAmountMaster?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.finalAmountMaster?.toFixed(2)}</td>
                  <td>
                    {ledgerData?.data?.matchCommissionSuperMaster?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.sessionCommissionSuperMaster?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.totalCommissionSuperMaster?.toFixed(2)}
                  </td>
                  <td>{ledgerData?.data?.netAmountSuperMaster?.toFixed(2)}</td>
                  <td>
                    {ledgerData?.data?.shareAmountSuperMaster?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.finalAmountSuperMaster?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.matchCommissionSubAdmin?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.sessionCommissionSubAdmin?.toFixed(2)}
                  </td>
                  <td>
                    {ledgerData?.data?.totalCommissionSubAdmin?.toFixed(2)}
                  </td>
                  <td>{ledgerData?.data?.netAmountSubAdmin?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.shareAmountSubAdmin?.toFixed(2)}</td>
                  <td>{ledgerData?.data?.finalAmountSubAdmin?.toFixed(2)}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerdataSubAdmin;
