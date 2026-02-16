import {
  BankOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { convertCode } from "../../../store/constant";

const toUpper = (value) =>
  typeof value === "string" ? value.toUpperCase() : value;

const getUserTypeLabel = (uType) =>
  toUpper(
    uType == 7
      ? "SuperAdmin Details"
      : uType == 6
      ? "Admin Detail"
      : uType == 5
      ? "Mini Admin"
      : uType == 4
      ? "Master"
      : uType == 3
      ? "SuperAgent"
      : uType == 2
      ? "Agent"
      : ""
  );

const getRoleLabel = (uType) =>
  (uType == 7
    ? "Super Admin"
    : uType == 6
    ? "Admin"
    : uType == 5
    ? "Mini Admin"
    : uType == 4
    ? "Masetr"
    : uType == 3
    ? "Super Master"
    : uType == 2
    ? "Agent"
    : "Client"
  ).toUpperCase();

export const getPrimaryCards = (uType, handlers) => [
  {
    icon: <UserOutlined style={{ fontSize: "18px" }} />,
    title: getUserTypeLabel(uType),
    onClick: handlers.onOpenDashboard,
  },
  {
    icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
    title: "SPORT'S DETAILS",
    onClick: handlers.onOpenSport,
  },
  {
    icon: <BankOutlined style={{ fontSize: "18px" }} />,
    title: "LEDGER",
    onClick: handlers.onOpenLedger,
  },
  {
    icon: <BankOutlined style={{ fontSize: "18px" }} />,
    title: "CASH TRANSACTION",
    onClick: handlers.onOpenCash,
  },
  {
    icon: <SettingOutlined style={{ fontSize: "16px" }} />,
    title: "SETTING",
    onClick: handlers.onOpenSetting,
  },
  {
    icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
    title: "LOGOUT",
    onClick: handlers.onLogout,
  },
];

export const getStatsCards = (uType, dataDes, handlers) => [
  {
    icon: <UserOutlined style={{ fontSize: "16px" }} />,
    title: `${convertCode(localStorage.getItem("userId"))}`.toUpperCase(),
    desc: `You are ${getRoleLabel(uType)}`,
  },
  {
    icon: <TrophyOutlined style={{ fontSize: "16px" }} />,
    title: `${dataDes?.data?.balance?.toFixed(2)}`,
    desc: "COINS",
  },
  {
    icon: <TeamOutlined style={{ fontSize: "16px" }} />,
    title: `${dataDes?.data?.members}`,
    desc: "MEMBERS",
  },
  {
    icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
    title: `${dataDes?.data?.myShare}`,
    desc: "MY SHARE",
  },
  {
    icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
    title: `${dataDes?.data?.companyShare}%`,
    desc: "COMPANY SHARE",
  },
  {
    icon: null,
    title: `${dataDes?.data?.matchCommission}%`,
    desc: "MATCH COMMISSION",
  },
  {
    icon: null,
    title: `${dataDes?.data?.sessionCommission}%`,
    desc: "SESSION COMMISSION",
  },
  {
    icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
    title: "RULES",
    onClick: handlers.onOpenRules,
  },
];
