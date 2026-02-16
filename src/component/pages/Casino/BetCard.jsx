const BetCard = ({ item, index }) => {
  const pnlValue = Number(item?.pnl);
  return (
    <div className="casino_main_bet_card">
      <div className="casino_main_bet_header">
        {item?.nation || `Player ${index + 1}`}
      </div>
      <div className="casino_main_bet_rate">
        {item?.rate ?? item?.b1 ?? "-"}
        <span
          style={{
            display: "block",
            height: 1,
            backgroundColor: "#e1e1e1",
            margin: "15px auto",
            width: "80%",
          }}
        />
      </div>
      <div className="casino_main_bet_exposure">
        {Number.isFinite(pnlValue) ? pnlValue.toFixed(2) : "0.00"}
      </div>
    </div>
  );
};

export default BetCard;
