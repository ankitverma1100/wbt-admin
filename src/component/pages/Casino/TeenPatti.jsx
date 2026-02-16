import { Table } from "antd";
import BetCard from "./BetCard";

const TeenPatti = ({ odds, id }) => {
  const filteredOdds = (odds || []).filter(
    (item) => item.sid === "1" || item.sid === "3"
  );
  if (id === "51") {
    const mainBets = filteredOdds.slice(0, 2);
    return (
      <div className="casino_main_bets">
        <div className="casino_main_bets_header">
          <div className="casino_main_bets_title">Main Bets</div>
          <span className="casino_main_bets_line" />
        </div>
        <div className="casino_main_bets_grid">
          {mainBets.map((item, index) => {
            return (
              <BetCard
                key={item?.sid || item?.nation || index}
                item={item}
                index={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <div>
            <p>{record?.nation}</p>
            <p
              style={{
                fontWeight: 700,
                color:
                  record?.pnl > 0 ? "green" : record?.pnl < 0 ? "red" : "black",
              }}>
              {id === "57" ? 0 : record?.pnl}
            </p>
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: id === "57" ? "b1" : "rate",
      key: "rate",
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      columns={columns}
      dataSource={id === "57" ? odds : filteredOdds || []}
    />
  );
};

export default TeenPatti;
