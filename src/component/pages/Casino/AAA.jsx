import { Table } from "antd";
import BetCard from "./BetCard";

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

const AAA = ({ odds }) => {
  const oddsList = odds || [];
  const getLabel = (item) => item?.nation || item?.nat || "";
  const isMainBet = (item) => {
    const label = getLabel(item).toLowerCase();
    return (
      label.includes("amar") ||
      label.includes("akbar") ||
      label.includes("anthony")
    );
  };
  const mainBets = oddsList.filter(isMainBet);
  const filteredOdds = oddsList.filter(
    (item) => item.sid !== "21" && item.sid !== "22" && !isMainBet(item)
  );

  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        const image = getCardImage(record.nation);
        return (
          <div >
            {image ? (
              <>
                <img
                  src={`/Images/casino/${image}`}
                  alt={record.nation}
                  style={{ width: 30, height: 45, display: "block" }}
                />
                <p style={{ fontWeight: 700 }}>{record?.pnl}</p>
              </>
            ) : (
              <div>
                <p>{record?.nation}</p>
                <p style={{ fontWeight: 700 }}>{record?.pnl}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "b1",
      key: "b1",
    },
  ];

  return (
    <>
      {mainBets.length > 0 && (
        <div className="casino_main_bets">
          <div className="casino_main_bets_header">
            <div className="casino_main_bets_title">Main Bets</div>
            <span className="casino_main_bets_line" />
          </div>
          <div className="casino_main_bets_grid">
            {mainBets.map((item, index) => (
              <BetCard
                key={item?.sid || item?.nation || item?.nat || index}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
      <div className="casino_main_bets_header">
        <div className="casino_main_bets_title">CARD BETS</div>
        <span className="casino_main_bets_line" />
      </div>
      <Table
        pagination={false}
        bordered
        columns={columns}
        dataSource={filteredOdds || []}
        rowKey="sid"
      />
    </>
  );
};

export default AAA;
