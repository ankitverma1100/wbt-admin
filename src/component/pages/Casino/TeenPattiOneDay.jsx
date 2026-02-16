import { useGetCasinoLabilityQuery } from "../../../store/service/userlistService";
import BetCard from "./BetCard";

const TeenPattiOneDay = ({ odds, id }) => {
  // const filteredOdds = (odds || []).filter(
  //   (item) => item.sid === "1" || item.sid === "3"
  // );

  const { t1 } = odds || {};

  const { data } = useGetCasinoLabilityQuery(
    { roundId: t1?.mid || "" },
    { pollingInterval: 1000 }
  );

  const labilityData = data?.data || [];

  const normalizedOdds = (t1 || []).map((item) => {
    const pnl = labilityData?.find(
      (pnlData) => Number(pnlData?.sid) === Number(item?.sectionId)
    )?.liability;
    return {
      ...item,
      pnl: Number.isFinite(Number(pnl)) ? Number(pnl) : 0,
    };
  });
  const mainBets = normalizedOdds.slice(0, 2);
  return (
    <div className="casino_main_bets">
      <div className="casino_main_bets_header">
        <div className="casino_main_bets_title">Main Bets</div>
        <span className="casino_main_bets_line" />
      </div>
      <div className="casino_main_bets_grid">
        {mainBets.map((item, index) => (
          <BetCard
            key={item?.sid || item?.nation || item?.sectionId || index}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TeenPattiOneDay;
