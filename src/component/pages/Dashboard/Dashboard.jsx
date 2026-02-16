import { useEffect } from "react";
import { Col, Row } from "antd";
import "./Dashboard.scss";
import ActiveMatch from "../../common/ActiveMatch/ActiveMatch";
import { useNavigate } from "react-router-dom";
import { useDashboardQuery } from "../../../store/service/userlistService";
import LadgerDetails from "../ladgerdetail/LadgerDetails";
import CashTransanction from "../CashTransanction/CashTransanction";
import SettingModals from "./SettingModals";
import MasterDetails from "../masterDetail/MasterDetails";
import SportModal from "./SportModal";
import { useDispatch } from "react-redux";
import { setShowMarquee } from "../../../store/global/slice";
import { DashboardCardSection } from "./DashboardCards";
import useDashboardModals from "./useDashboardModals";
import { getPrimaryCards, getStatsCards } from "./dashboardConfig.jsx";

const Dashboard = () => {
  const { state, actions } = useDashboardModals();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleRules = () => {
    nav("/rules");
  };

  const { data: dataDes } = useDashboardQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const uType = localStorage.getItem("userType");

  const handlers = {
    onOpenDashboard: () => actions.setOpenDashBoard(!state.openDashBoard),
    onOpenSport: () => actions.setSportModals(!state.openSportModals),
    onOpenLedger: () => actions.setOpenModals(!state.openModal),
    onOpenCash: () => actions.setOpenModalsReport(!state.openModalReport),
    onOpenSetting: () => nav("/app/settings"),
    onOpenRules: handleRules,
    onLogout: () => {
      localStorage.clear();
      nav("/");
    },
  };

  const primaryCards = getPrimaryCards(uType, handlers);
  const statsCards = getStatsCards(uType, dataDes, handlers);

  useEffect(() => {
    dispatch(setShowMarquee(true));
    return () => {
      dispatch(setShowMarquee(false));
    };
  }, [dispatch]);

  return (
    <>
      <Row justify="center" className="main_dash_class">
        <Col xs={24} lg={24}>
          <DashboardCardSection items={primaryCards} />
        </Col>
      </Row>
      <Row
        justify="center"
        className="main_dash_class"
        style={{
          paddingTop: "0px",
        }}>
        <Col xs={24} lg={24}>
          <DashboardCardSection items={statsCards} />
        </Col>
      </Row>

      {/* </div> */}

      <ActiveMatch />

      <LadgerDetails
        setOpenModals={actions.setOpenModals}
        openModal={state.openModal}
      />
      <CashTransanction
        setOpenModals={actions.setOpenModalsReport}
        openModal={state.openModalReport}
      />
      <SettingModals
        setOpenModals={actions.setSetting}
        openModal={state.openSetting}
      />
      <MasterDetails
        setOpenModals={actions.setOpenDashBoard}
        openModal={state.openDashBoard}
      />
      <SportModal
        setOpenModals={actions.setSportModals}
        openModal={state.openSportModals}
      />
    </>
  );
};

export default Dashboard;
