import CardComp from "./CardComp";

const OneDayCard = ({ t2 }) => {
  return (
    <div className="card_shown_on_top">
      <div className="casino_player_group">
        <div className="text-white player_name">Player A</div>
        <div className="cards_container">
          <CardComp shown={t2?.[0]?.C1 != "1"} card={t2?.[0]?.C1 || "1"} />
          <CardComp shown={t2?.[0]?.C2 != "1"} card={t2?.[0]?.C2 || "1"} />
          <CardComp shown={t2?.[0]?.C3 != "1"} card={t2?.[0]?.C3 || "1"} />
        </div>
      </div>
      <div className="casino_player_group">
        <div className="text-white player_name">Player B</div>
        <div className="cards_container">
          <CardComp shown={t2?.[1]?.C1 != "1"} card={t2?.[1]?.C1 || "1"} />
          <CardComp shown={t2?.[1]?.C2 != "1"} card={t2?.[1]?.C2 || "1"} />
          <CardComp shown={t2?.[1]?.C3 != "1"} card={t2?.[1]?.C3 || "1"} />
        </div>
      </div>
    </div>
  );
};

export default OneDayCard;
