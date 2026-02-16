import BetCard from "./BetCard";

const DT20 = ({ odds }) => {
  const filteredOdds = (odds || []).filter(
    (item) => item.sid === "1" || item.sid === "2" || item?.sid === "3"
  );

  const orderedOdds = [
    filteredOdds.find((item) => item.sid === "1"),
    filteredOdds.find((item) => item.sid === "3"),
    filteredOdds.find((item) => item.sid === "2"),
  ].filter(Boolean);

  return (
    <div className="casino_main_bets">
      <div className="casino_main_bets_header">
        <div className="casino_main_bets_title">Main Bets</div>
        <span className="casino_main_bets_line" />
      </div>
      <div className="casino_main_bets_grid casino_main_bets_grid--three">
        {orderedOdds.map((item, index) => (
          <BetCard
            key={item?.sid || item?.nation || index}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DT20;
