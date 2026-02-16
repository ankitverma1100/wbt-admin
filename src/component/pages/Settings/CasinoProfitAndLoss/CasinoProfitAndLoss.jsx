import { useMemo, useState } from "react";
import { Card, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCasinoPnlByDateQuery } from "../../../../store/service/CasinoServices";
import dayjs from "dayjs";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import "./CasinoProfitAndLoss.scss";

const CasinoProfitAndLoss = () => {
  const nav = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");
  const twoWeeksAgo = dayjs().subtract(14, "day").format("YYYY-MM-DD");

  const [dates] = useState({
    fromDate: twoWeeksAgo,
    toDate: today,
  });

  const { data, isLoading, isFetching } = useGetCasinoPnlByDateQuery(dates);

  const handleBackClick = () => {
    nav(-1);
  };

  const rows = useMemo(() => {
    const fromLabel = dayjs(dates.fromDate).format("DD-MM-YYYY");
    const toLabel = dayjs(dates.toDate).format("DD-MMM-YYYY").toUpperCase();
    return (data?.data || []).flatMap((group) =>
      (group?.dataList || []).map((item) => ({
        key: `${group?.date}-${item?.marketId}-${item?.tableId}`,
        title: `${fromLabel} ${item?.eventName}-${toLabel}`,
        pnl: Number(item?.pnl || 0),
        exposure: Number(item?.exposure || 0),
        clientpnl: Number(item?.clientpnl || 0),
      }))
    );
  }, [data, dates.fromDate, dates.toDate]);

  const totalNetPl = useMemo(
    () => rows.reduce((acc, row) => acc + row.pnl + row.clientpnl, 0),
    [rows]
  );

  return (
    <div className="match_slip casino_pnl_page">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail"
        title="CASINO PROFIT LOSS"
        extra={<button onClick={handleBackClick}>Back</button>}>
        <div className="table_section statement_tabs_data">
          {(isLoading || isFetching) && <CustomLoading />}
          <div className="pnl_total">
            <span className="total_label">TOTAL:</span>
            <span className="total_value">{totalNetPl.toFixed(2)}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>PL</th>
                <th>COMM+</th>
                <th>COMM-</th>
                <th>NET PL</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const commPlus = Math.max(row.exposure, 0);
                const commMinus = Math.abs(Math.min(row.exposure, 0));
                const netPl = row.pnl + row.clientpnl;
                return (
                  <tr key={row.key}>
                    <td className="title_cell">{row.title}</td>
                    <td className={row.pnl > 0 ? "num pos" : "num neg"}>
                      {row.pnl.toFixed(2)}
                    </td>
                    <td className="num pos">
                      {commPlus.toFixed(2)}
                    </td>
                    <td className="num neg">
                      {commMinus.toFixed(2)}
                    </td>
                    <td className={netPl > 0 ? "num pos" : "num neg"}>
                      {netPl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!rows.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
      </Card>
    </div>
  );
};

export default CasinoProfitAndLoss;
