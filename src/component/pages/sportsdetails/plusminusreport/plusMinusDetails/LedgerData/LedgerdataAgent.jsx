import { FC } from "react";

const LedgerdataAgent = ({ ledgerData }) => {
  return (
    <div className={`card width_card`}>
      <div
        className="card-body"
        style={{
          padding: "0px 3px",
        }}>
        <>
          <div className="card-body">
            <table className="plus-table plus_minus_sec">
              <thead>
                <tr>
                  <th colSpan={8} className="text-center">
                    Client PlusMinus{" "}
                  </th>
                  <th colSpan={7} className="text-center">
                    Agent PlusMinus{" "}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>M AMT</th>
                  <th>S AMT</th>
                  <th>TOSS AMT</th>
                  <th>C COM</th>
                  <th>NET AMT</th>
                  <th>C MOB</th>
                  <th>FINAL</th>
                  <th>M COM</th>
                  <th>S COM</th>
                  <th>T COM</th>
                  <th>NET AMT</th>
                  <th>SHR AMT</th>
                  <th>MOB APP</th>
                  <th>FINAL</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData?.data?.ledgetList?.map((agent) => (
                  <tr key={agent.userId}>
                    <td>
                      {agent.userId} {agent.username}
                    </td>
                    <td>{agent.matchAmount?.toFixed(2)}</td>
                    <td>{agent.sessionAmount?.toFixed(2)}</td>
                    <td>{agent.tossAmount?.toFixed(2)}</td>
                    <td>{agent.clientCommission?.toFixed(2)}</td>
                    <td>{agent.clientNetAmount?.toFixed(2)}</td>
                    <td>{agent.clientMobileApp?.toFixed(2)}</td>
                    <td>{agent.clientFinal?.toFixed(2)}</td>
                    <td>{agent.matchCommissionDealer?.toFixed(2)}</td>
                    <td>{agent.sessionCommissionDealer?.toFixed(2)}</td>
                    <td>{agent.totalCommissionDealer?.toFixed(2)}</td>
                    <td>{agent.netAmountDealer?.toFixed(2)}</td>
                    <td>{agent.shareAmountDealer?.toFixed(2)}</td>
                    <td>{agent.mobileAppDealer?.toFixed(2)}</td>
                    <td>{agent.finalAmountDealer?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>TOTAL</th>
                  <th>{ledgerData?.data?.matchAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.sessionAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.tossAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.clientCommission?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.clientNetAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.clientMobileApp?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.clientFinal?.toFixed(2)}</th>
                  <th>{ledgerData?.data.matchCommissionDealer?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data.sessionCommissionDealer?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data.totalCommissionDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data.netAmountDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data.shareAmountDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data.mobileAppDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data.finalAmountDealer?.toFixed(2)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      </div>
    </div>
  );
};

export default LedgerdataAgent;
