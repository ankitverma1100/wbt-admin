import { Tag } from "antd";
import { useCasinoResultQuery } from "../../../store/service/casinoService";
import { LetterAndColorById, tableIdtoUrl } from "./Constant";
import { useParams } from "react-router-dom";

const LastResult = () => {
  const { id } = useParams();
  const casinoName = tableIdtoUrl[id];
  const { data } = useCasinoResultQuery(casinoName);

  return (
    <div className="casino_last_winners_section">
      <div className="casino_main_bets_header">
        <div className="casino_main_bets_title">LAST WINNERS</div>
        <span className="casino_main_bets_line" />
      </div>
      <div className="ant-row casino_last_winners">
        {data?.map((items) => {
          const meta = LetterAndColorById[id]?.[items.result];
          const label = meta?.label?.toUpperCase();
          return (
            <Tag
              key={items?.mid}
              className={
                label === "A"
                  ? "casino_winner casino_winner-a"
                  : label === "B"
                  ? "casino_winner casino_winner-b"
                  : label === "C"
                  ? "casino_winner casino_winner-c"
                  : label === "D"
                  ? "casino_winner casino_winner-d"
                  : label === "T"
                  ? "casino_winner casino_winner-t"
                  : "casino_winner"
              }
              style={{
                border: `1px solid ${meta?.borderColor || meta?.color || "#78152B"}`,
                color: meta?.color || "#78152B",
                background: meta?.background || "#fff",
              }}
            >
              {label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default LastResult;
