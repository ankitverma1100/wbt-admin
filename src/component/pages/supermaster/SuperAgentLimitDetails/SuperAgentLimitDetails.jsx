import { useNavigate } from "react-router-dom";
import "./SuperAgentLimitDetails.scss";

import AddSuperLimites from "./AddSuperLimites";

const SuperAgentLimitDetails = () => {
  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <>
      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            style={{ borderRadius: "2px 2px 0 0" }}>
            <div
              style={{ padding: "9px 8px", fontSize: "25px" }}
              className="team_name">
              Update Limit
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>

        <div>
          <AddSuperLimites />
        </div>
      </div>
    </>
  );
};

export default SuperAgentLimitDetails;
