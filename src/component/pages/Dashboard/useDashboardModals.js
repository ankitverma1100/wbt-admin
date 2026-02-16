import { useState } from "react";

const useDashboardModals = () => {
  const [openModal, setOpenModals] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openDashBoard, setOpenDashBoard] = useState();
  const [openModalReport, setOpenModalsReport] = useState(false);
  const [openSportModals, setSportModals] = useState(false);

  return {
    state: {
      openModal,
      openSetting,
      openDashBoard,
      openModalReport,
      openSportModals,
    },
    actions: {
      setOpenModals,
      setSetting,
      setOpenDashBoard,
      setOpenModalsReport,
      setSportModals,
    },
  };
};

export default useDashboardModals;
