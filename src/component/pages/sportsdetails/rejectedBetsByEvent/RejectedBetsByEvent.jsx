import { Empty, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRejectedBetQuery } from "../../../../store/service/SportDetailServices";
import { useSuperuserListMutation } from "../../../../store/service/supermasteAccountStatementServices";
import { useState, useMemo, useEffect } from "react";
import FilterBets from "../fancyslips/FilterBets";
import "./RejectedBetsByEvent.scss";

const RejectedBetsByEvent = () => {
  const nav = useNavigate();
  const { id, name } = useParams();
  const { data } = useGetRejectedBetQuery({ matchId: id });

  const [selectedUser, setSelectedUser] = useState("ALL");
  const [selectedMini, setSelectedMini] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedSuper, setSelectedSuper] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [form] = Form.useForm();

  const currentUserType = Number(localStorage.getItem("userType") || 0);
  const currentUserId = localStorage.getItem("userId") || "";

  const [getSuperuserList] = useSuperuserListMutation();
  const [miniOptions, setMiniOptions] = useState([]);
  const [masterOptions, setMasterOptions] = useState([]);
  const [superOptions, setSuperOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  const userOptions = useMemo(() => {
    if (!data?.data) return [];
    const uniqueUsers = Array.from(
      new Map(
        data.data.map((item) => [
          item.userId,
          { label: item.userId, value: item.userId },
        ])
      ).values()
    );
    return [{ label: "All User", value: "ALL" }, ...uniqueUsers];
  }, [data]);

  const filteredData = useMemo(() => {
    let rows = data?.data || [];
    if (selectedUser && selectedUser !== "ALL") {
      rows = rows.filter((item) => item.userId === selectedUser);
    }
    if (selectedAgent) {
      rows = rows.filter((item) => item.parentId === selectedAgent);
    }
    if (selectedSuper) {
      rows = rows.filter((item) => item.superId === selectedSuper);
    }
    if (selectedMaster) {
      rows = rows.filter((item) => item.masterId === selectedMaster);
    }
    if (selectedMini) {
      rows = rows.filter((item) => item.miniId === selectedMini);
    }
    return rows;
  }, [data, selectedUser, selectedAgent, selectedSuper, selectedMaster, selectedMini]);

  const showMini = currentUserType > 6;
  const showMaster = currentUserType > 5;
  const showSuper = currentUserType > 4;
  const showAgent = currentUserType > 3;
  const showClient = currentUserType > 2;

  useEffect(() => {
    const fetchList = async (userType, parentId, setter) => {
      try {
        const res = await getSuperuserList({
          userType,
          parentId: parentId || "",
          noOfRecords: 1000,
          index: 0,
          userToSearch: "",
        }).unwrap();
        const list = res?.data?.userListV2 || [];
        setter(
          list.map((user) => ({
            label: `${user.userName} (${user.userId ?? user.userid})`,
            value: user.userId ?? user.userid,
          }))
        );
      } catch (error) {
        setter([]);
      }
    };

    const miniParentId = currentUserId;
    const masterParentId = selectedMini || currentUserId;
    const superParentId = selectedMaster || selectedMini || currentUserId;
    const agentParentId =
      selectedSuper || selectedMaster || selectedMini || currentUserId;
    const clientParentId =
      selectedAgent ||
      selectedSuper ||
      selectedMaster ||
      selectedMini ||
      currentUserId;

    if (showMini) fetchList(5, miniParentId, setMiniOptions);
    if (showMaster) fetchList(4, masterParentId, setMasterOptions);
    if (showSuper) fetchList(3, superParentId, setSuperOptions);
    if (showAgent) fetchList(2, agentParentId, setAgentOptions);
    if (showClient) fetchList(1, clientParentId, setClientOptions);
  }, [
    getSuperuserList,
    showMini,
    showMaster,
    showSuper,
    showAgent,
    showClient,
    currentUserId,
    selectedMini,
    selectedMaster,
    selectedSuper,
    selectedAgent,
  ]);

  useEffect(() => {
    setSelectedMaster("");
    setSelectedSuper("");
    setSelectedAgent("");
    setSelectedUser("ALL");
  }, [selectedMini]);

  useEffect(() => {
    setSelectedSuper("");
    setSelectedAgent("");
    setSelectedUser("ALL");
  }, [selectedMaster]);

  useEffect(() => {
    setSelectedAgent("");
    setSelectedUser("ALL");
  }, [selectedSuper]);

  useEffect(() => {
    setSelectedUser("ALL");
  }, [selectedAgent]);

  const handleReset = () => {
    form.resetFields();
    setOddsType("Bookmaker");
    setSelectedMini("");
    setSelectedMaster("");
    setSelectedSuper("");
    setSelectedAgent("");
    setSelectedUser("ALL");
  };

  const handleClientChange = (value) => {
    setSelectedUser(value || "ALL");
  };

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <div className="match_slip">
      <div className="rejected-bets-panel">
        <div className="rejected-bets-header">
          <span>Rejected Bets</span>
          <button
            type="button"
            className="rejected-bets-back"
            onClick={handleBackClick}>
            Back
          </button>
        </div>
        <div className="rejected-bets-filters">
          <FilterBets
            form={form}
            onFinish={() => {}}
            clientId={selectedUser}
            onClientChange={handleClientChange}
            currentUserType={currentUserType}
            selectedMini={selectedMini}
            setSelectedMini={setSelectedMini}
            selectedMaster={selectedMaster}
            setSelectedMaster={setSelectedMaster}
            selectedSuper={selectedSuper}
            setSelectedSuper={setSelectedSuper}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            miniOptions={miniOptions}
            masterOptions={masterOptions}
            superOptions={superOptions}
            agentOptions={agentOptions}
            clientOptions={clientOptions}
            oddsType={oddsType}
            setOddsType={setOddsType}
            handleReset={handleReset}
          />
        </div>

        <div className="">
          <table className="rejected-bets-grid">
            <thead>
              <tr>
                <th>Username</th>
                <th>Runner Name</th>
                <th>Bet Type</th>
                <th>Bet Price</th>
                <th>Bet Amount</th>
                <th>Status</th>
                <th>Place Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userId}</td>
                    <td>{item.selectionName || name}</td>
                    <td>{item.mode}</td>
                    <td>{Number(item.rate || 0).toFixed(2)}</td>
                    <td>{item.amount}</td>
                    <td>Deleted</td>
                    <td>{item.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RejectedBetsByEvent;
