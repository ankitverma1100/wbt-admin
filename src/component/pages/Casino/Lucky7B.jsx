import { Table } from "antd";
import BetCard from "./BetCard";
import CardComp from "./CardComp";

const getCardImage = (nat) => {
  const cardMap = {
    "Card A": "1.jpg",
    "Card 1": "1.jpg",
    "Card 2": "2.jpg",
    "Card 3": "3.jpg",
    "Card 4": "4.jpg",
    "Card 5": "5.jpg",
    "Card 6": "6.jpg",
    "Card 7": "7.jpg",
    "Card 8": "8.jpg",
    "Card 9": "9.jpg",
    "Card 10": "10.jpg",
    "Card J": "11.jpg",
    "Card Q": "12.jpg",
    "Card K": "13.jpg",
  };

  return cardMap[nat] || null;
};

const Lucky7B = ({ odds, t1 }) => {
  const oddsList = odds || [];
  const getLabel = (item) => item?.nation || item?.nat || "";
  const lowOdd = oddsList.find((item) =>
    getLabel(item).toLowerCase().includes("low")
  );
  const highOdd = oddsList.find((item) =>
    getLabel(item).toLowerCase().includes("high")
  );
  const cardOdds = oddsList.filter((item) =>
    getLabel(item).toLowerCase().startsWith("card ")
  );

  const formatNumber = (value, fallback = "0.00") => {
    if (value === 0) return "0.00";
    if (value === null || value === undefined || value === "") return fallback;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed.toFixed(2);
  };

  const getExposureClass = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed === 0) return "casino_exposure--zero";
    return parsed > 0 ? "casino_exposure--positive" : "casino_exposure--negative";
  };

  const columns = [
    {
      title: "Card",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        const label = getLabel(record);
        const image = getCardImage(label);
        return (
          <div className="casino_card_cell">
            {image ? (
              <>
                <img
                  src={`/Images/casino/${image}`}
                  alt={label}
                  className="casino_card_img"
                />
                <span className="casino_card_label">{label.replace("Card ", "")}</span>
              </>
            ) : (
              <span className="casino_card_label">{label || "-"}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Exposure",
      dataIndex: "pnl",
      key: "pnl",
      render: (text) => (
        <span className={`casino_exposure ${getExposureClass(text)}`}>
          {formatNumber(text, "0.00")}
        </span>
      ),
    },
  ];

  return (
    <div className="casino_lucky7">
      <div className="casino_lowhigh">
        <BetCard item={lowOdd} index={0} />
        <div className="casino_lowhigh_center">
          {t1?.C1 && <CardComp shown={t1.C1 !== "1"} card={t1.C1} />}
        </div>
        <BetCard item={highOdd} index={1} />
      </div>
      <div className="casino_main_bets_title">CARD BETS</div>
      <Table
        pagination={false}
        bordered
        columns={columns}
        dataSource={cardOdds || []}
        rowKey="sid"
        className="casino_card_bets_table"
      />
    </div>
  );
};

export default Lucky7B;
