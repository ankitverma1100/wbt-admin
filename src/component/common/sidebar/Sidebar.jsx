/* eslint-disable react/prop-types */
import { useState } from "react";
import { Drawer, Menu } from "antd";
import "./Sidebar.scss";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import {
  BankOutlined,
  BellOutlined,
  FileTextOutlined,
  HomeOutlined,
  ProfileOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { imgUrl } from "../../../store/constant";

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];

const Sidebar = (props) => {
  const { collapsed } = props;
  const [openKeys, setOpenKeys] = useState(["1"]);

  const nav = useNavigate();

  const userType = localStorage.getItem("userType");
  const ps = localStorage.getItem("ps");

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const uType = localStorage.getItem("userType");
  const hasRole = (roles) => roles.includes(userType);

  const hostName = window.location.hostname;

  const normalizeMenuItems = (items, prefix = "menu") =>
    items
      .filter(Boolean)
      .map((item, index) => {
        const key = item.key ?? `${prefix}-${index}`;
        const children = item.children
          ? normalizeMenuItems(item.children, key)
          : undefined;
        return { ...item, key, children };
      });

  return (
    <>
      <Sider
        trigger={null}
        width="280"
        collapsible
        collapsed={collapsed}
        className={`side_bar coll desk_side`}
        style={{
          background: "var(--bg-color)",
        }}>
        <div className={collapsed ? "logo_icon" : "logo_icon coll_btn"}>
          <div
            onClick={() => nav("/dashboard")}
            className={`bm_side_logo ${
              collapsed ? "bm_side_logo_hidden" : ""
            }`}>
            <img
              alt="example"
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : imgUrl
              }
              height={72}
            />
          </div>
        </div>
        <Menu
          style={{
            height: "calc(100vh - 70px)",
            minHeight: "calc(100vh - 70px)",
            maxHeight: "calc(100vh - 70px)",
            overflowY: "auto",
          }}
          theme=""
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={openKeys}
          items={normalizeMenuItems([
            {
              key: "1",
              icon: <HomeOutlined />,
              label: (
                <Link
                  to="/dashboard"
                  onClick={() => setOpenKeys([])}>
                  Dashboard
                </Link>
              ),
              // onClick:{handleDashBoard}
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: (
                <div>
                  {uType == 6
                    ? "Admin Details"
                    : uType == 5
                    ? "Mini Admin Master"
                    : uType == 4
                    ? "Master Master"
                    : uType == 3
                    ? "Super Agent Master"
                    : userType == 7
                    ? "SuperAdmin"
                    : userType == 2
                    ? "Agent Master"
                    : ""}
                </div>
              ),
              children: [
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  label: <Link to="/user-list/Admin/6">Admin</Link>,
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Mini-Admin/5">Mini Admin Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Master-Master/4">Master Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Super-Master/3">Super Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Agent-Master/2">Agent Master</Link>
                  ),
                },
                {
                  label: (
                    <Link to="/user-list/Client-Master/1">Client Master</Link>
                  ),
                },
                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  label: <Link to="/create-domain">Create Domain</Link>,
                },
              ],
            },
            {
              key: "3",
              icon: <PlayCircleOutlined />,
              label: <div>Sports Betting</div>,
              children: [
                {
                  label: <Link to="/Events/sports-details">Inplay Games</Link>,
                },
                {
                  label: <Link to="/finish-game">COMPLETED GAMES</Link>,
                },
              ],
            },
            {
              key: "13",
              icon: <PlayCircleOutlined />,
              label: (
                <div>
                  Casino
                </div>
              ),
              children: [
                {
                  label: <Link to="/inplay-casino">Inplay Casino</Link>,
                },
                {
                  label: <Link to="/completed-casino">Completed Casino</Link>,
                },
                {
                  label: <Link to="/casinoprofitandloss">Casino Details</Link>,
                },
              ],
            },
              {
                key: "14",
                icon: <PlayCircleOutlined />,
                label: <div>Matka</div>,
                children: [
                  {
                    label: <Link to="/matka/inplay">INPLAY MATKA</Link>,
                  },
                  {
                    label: <Link to="/matka/completed">COMPLETED MATKA</Link>,
                  },
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: <Link to="/matka/set-result">SET MATKA RESULT</Link>,
                  },
                ],
              },
            {
              key: "4",
              icon: <PlayCircleOutlined />,
              label: (
                <div>
                  Ledger
                </div>
              ),
              children: [
                {
                  label: <Link to="/Events/matchledger">Profit/Loss</Link>,
                },
                {
                  label: <Link to="/client/my-ledger">My LEDGER</Link>,
                },
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  label: (
                    <Link to="/client/ledger-super/6/Admin">Admin LEDGER</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/ledger-super/5/Mini-Admin">
                      Mini Admin LEDGER
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/ledger-super/4/Master">Master LEDGER</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/ledger-super/3/Super">
                      Super agent LEDGER
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/ledger-super/2/Agent">Agent LEDGER</Link>
                  ),
                },
                {
                  label: (
                    <Link to="/client/ledger-super/1/Client">Client LEDGER</Link>
                  ),
                },
              ],
            },
            userType === "7" && {
              key: "15",
              icon: <ProfileOutlined />,
              label: (
                <div>
                  Post Ledger
                </div>
              ),
              children: [
                {
                  label: <Link to="/create-ledger">Create Ledger</Link>,
                },
                {
                  label: <Link to="/rollback">Rollback</Link>,
                },
              ],
            },

            userType === "7" && {
              key: "25",
              icon: <PlayCircleOutlined />,
              label: (
                <div>
                  Event Controller
                </div>
              ),
              children: [
                {
                  label: <Link to="/event-lock">Event Lock</Link>,
                },
                {
                  label: (
                    <Link to="/completd-actibe-bet">
                      Complete Match Active Bet
                    </Link>
                  ),
                },
                {
                  label: <Link to="/delete-bets">Delete Bet</Link>,
                },
              ],
            },

            {
              key: "5",
              icon: <BankOutlined />,
              label: (
                <div>
                  Cash Transaction
                </div>
              ),
              children: [
                                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  label: (
                    <Link to="/client/txn-super/Admin/6">
                      ADMIN MASTER
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/txn-super/Mini-Admin/5">
                      MINI MASTER
                    </Link>
                  ),
                },

                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/txn-super/Master-Master/4">
                      MASTER MASTER
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/txn-super/Super-Master/3">
                      SUPER MASTER
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  label: (
                    <Link to="/client/txn-super/Agent-Master/2">
                      AGENT MASTER
                    </Link>
                  ),
                },
                {
                  label: (
                    <Link to="/client/txn-super/Client-Master/1">
                      CLIENT MASTER
                    </Link>
                  ),
                },
                // {
                //   // className: `${userType == "5" ? "" : "d-none"}`,
                //   label: (
                //     <Link to="/client/txn-super/Master/4">
                //       (M) Debit/Credit Entry
                //     </Link>
                //   ),
                // },


              ],
            },
            {
              className: `${userType === "7" ? "" : "d-none"}`,
              key: "28",
              icon: <BellOutlined />,
              label: (
                <Link
                  to="/set-message">
                  Set Message
                </Link>
              ),
            },
            {
              key: "8",
              icon: <ProfileOutlined />,
              label: (
                <Link
                  to="/commissionLenden">
                  Comm. Report
                </Link>
              ),
            },
            {
              key: "6",
              icon: <FileTextOutlined />,
              label: (
                <div>
                  Reports
                </div>
              ),
              children: [
                {
                  label: <Link to="/client/login-report">Login Report</Link>,
                },
                {
                  label: (
                    <Link to="/client/secure-code">Secure Code Report</Link>
                  ),
                },
              ],
            },
            {
              key: "18",
              icon: <SettingOutlined />,
              label: (
                <Link
                  to="/app/settings">
                  {window?.location.hostname?.split(".")?.[1]?.toUpperCase()}{" "}
                  Setting
                </Link>
              ),
            },
            {
              key: "200",
              icon: <UserDeleteOutlined />,
              label: (
                <div>
                  {uType == 6
                    ? "Dead Admin Details"
                    : uType == 5
                    ? "Dead Mini Admin Master"
                    : uType == 4
                    ? "Dead Master Master"
                    : uType == 3
                    ? "Dead Super Agent Master"
                    : userType == 7
                    ? "Dead SuperAdmin"
                    : userType == 2
                    ? "Dead Agent Master"
                    : ""}
                </div>
              ),
              children: [
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  label: <Link to="/dead-user-list/Admin/6">Dead Admin</Link>,
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  label: (
                    <Link to="/dead-user-list/Mini-Admin/5">
                      Dead Mini Admin Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  label: (
                    <Link to="/dead-user-list/Master-Master/4">
                      Dead Master Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  label: (
                    <Link to="/dead-user-list/Super-Master/3">
                      Dead Super Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  label: (
                    <Link to="/dead-user-list/Agent-Master/2">
                      Dead Agent Master
                    </Link>
                  ),
                },
                {
                  label: (
                    <Link to="/dead-user-list/Client-Master/1">
                      Dead Client Master
                    </Link>
                  ),
                },
              ],
            },
          ])}
        />
      </Sider>

      <div className="mob_side">
        <Drawer
          title={
            <img
              onClick={props.action}
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : imgUrl
              }
            />
          }
          className="drawer_main"
          placement="left"
          closable={false}
          onClose={props.action}
          open={props.open}
          width="275"
          // key={placement}
        >
          <Menu
            theme=""
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={openKeys}
            items={normalizeMenuItems([
              {
                key: "1",
                icon: <HomeOutlined />,
                label: (
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      props?.action();
                      setOpenKeys([]);
                    }}>
                    Dashboard
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: (
                  <div>
                    {uType == 6
                      ? " Admin Details"
                      : uType == 5
                      ? "Sub Detail"
                      : uType == 4
                      ? "Master Detail"
                      : uType == 3
                      ? "Super Detail"
                      : userType == 7
                      ? "Super Admin"
                      : "Agent Detail"}
                  </div>
                ),
                children: [
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link
                        to="/user-list/Admin/6"
                        onClick={() => props?.action()}>
                        Admin
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Mini-Admin/5"
                        onClick={() => props?.action()}>
                        Mini Admin
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Master-Master/4"
                        onClick={() => props?.action()}>
                        Master Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Super-Master/3"
                        onClick={() => props?.action()}>
                        Super Agent Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    label: (
                      <Link
                        to="/user-list/Agent-Master/2"
                        onClick={() => props?.action()}>
                        Agent Master
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/user-list/Client/1"
                        onClick={() => props?.action()}>
                        Client Master
                      </Link>
                    ),
                  },
                  {
                    className: `${userType === "7" ? "" : "d-none"}`,
                    label: (
                      <Link onClick={() => props?.action()} to="/create-domain">
                        Create Domain
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "3",
                icon: <PlayCircleOutlined />,
                label: <div>Sports Betting</div>,
                children: [
                  {
                    label: (
                      <Link
                        to="/Events/sports-details"
                        onClick={() => props?.action()}>
                        INPLAY Games
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link to="/finish-game" onClick={() => props?.action()}>
                        COMPLETED GAMES
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "13",
                icon: <PlayCircleOutlined />,
                label: (
                  <div>
                    Casino
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link to="/inplay-casino" onClick={() => props?.action()}>
                        Inplay Casino
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/completed-casino"
                        onClick={() => props?.action()}>
                        Completed Casino
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/casinoprofitandloss"
                        onClick={() => props?.action()}>
                        Casino Details
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "14",
                icon: <PlayCircleOutlined />,
                label: <div>Matka</div>,
                children: [
                  {
                    label: (
                      <Link to="/matka/inplay" onClick={() => props?.action()}>
                        INPLAY MATKA
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link to="/matka/completed" onClick={() => props?.action()}>
                        COMPLETED MATKA
                      </Link>
                    ),
                  },
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link to="/matka/set-result" onClick={() => props?.action()}>
                        SET MATKA RESULT
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "4",
                icon: <PlayCircleOutlined />,
                label: (
                  <div>
                    Ledger
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/Events/matchledger">
                        Profit/Loss
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/my-ledger">
                        My Ledger
                      </Link>
                    ),
                  },
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/6/Admin">
                        Admin LEDGER
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/5/Mini-Admin">
                        Mini Admin LEDGER
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/4/Master">
                        Master LEDGER
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/3/Super-Agent">
                        Super agent LEDGER
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/2/Agent">
                        Agent LEDGER
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/1/Client">
                        Client LEDGER
                      </Link>
                    ),
                  },
                ],
              },
              userType === "7" && {
                key: "15",
                icon: <ProfileOutlined />,
                label: (
                  <div>
                    Post Ledger
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link onClick={() => props?.action()} to="/create-ledger">
                        Create Ledger
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link onClick={() => props?.action()} to="/rollback">
                        Rollback
                      </Link>
                    ),
                  },
                ],
              },
              userType === "7" && {
                key: "25",
                icon: <PlayCircleOutlined />,
                label: (
                  <div>
                    Event Controller
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link onClick={() => props?.action()} to="/event-lock">
                        Event Lock
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/completd-actibe-bet">
                        Complete Match Active Bet
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link onClick={() => props?.action()} to="/delete-bets">
                        Delete Bet
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "5",
                icon: <BankOutlined />,
                label: (
                  <div>
                    Cash Transaction
                  </div>
                ),
                children: [
                  {
                    className: `${userType === "7" ? "" : "d-none"}`,

                    label: (
                      <Link
                        to="/client/txn-super/Admin/6"
                        onClick={() => props?.action()}>
                        (ADM) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/client/txn-super/Mini-Admin/5"
                        onClick={() => props?.action()}>
                        (AD) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/client/txn-super/Master-Master/4"
                        onClick={() => props?.action()}>
                        (MA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/client/txn-super/Super-Master/3"
                        onClick={() => props?.action()}>
                        (SA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    label: (
                      <Link
                        to="/client/txn-super/Agent-Master/2"
                        onClick={() => props?.action()}>
                        (A) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/client/txn-super/Client-Master/1"
                        onClick={() => props?.action()}>
                        (C) Debit/Credit Entry
                      </Link>
                    ),
                  },
                ],
              },
              {
                className: `${userType === "7" ? "" : "d-none"}`,
                key: "28",
                icon: <BellOutlined />,
                label: (
                  <Link
                    onClick={() => props?.action()}
                    to="/set-message">
                    Set Message
                  </Link>
                ),
              },
              {
                key: "18",
                icon: <ProfileOutlined />,
                label: (
                  <Link
                    onClick={() => props?.action()}
                    to="/commissionLenden">
                    Comm. Report
                  </Link>
                ),
              },
              {
                key: "6",
                className: "data_report_list",
                icon: <FileTextOutlined />,
                label: (
                  <div>
                    Reports
                  </div>
                ),
                children: [
                  {
                    key: "6-1",
                    label: (
                      <Link
                        to="/client/login-report"
                        onClick={() => props?.action()}>
                        Login Report
                      </Link>
                    ),
                  },
                  {
                    key: "6-2",
                    label: (
                      <Link
                        to="/client/secure-code"
                        onClick={() => props?.action()}>
                        Secure Code Report
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "7",
                icon: <SettingOutlined />,
                label: (
                  <Link
                    to="/app/settings"
                    onClick={() => {
                      props?.action();
                      setOpenKeys([]);
                    }}>
                    {window?.location.hostname?.split(".")[1]?.toUpperCase()}{" "}
                    Setting
                  </Link>
                ),
              },

              {
                key: "200",
                icon: <UserDeleteOutlined />,
                label: (
                  <div>
                    {uType == 6
                      ? "Dead Admin Details"
                      : uType == 5
                      ? "Dead Mini Admin Master"
                      : uType == 4
                      ? "Dead Master Master"
                      : uType == 3
                      ? "Dead Super Agent Master"
                      : userType == 7
                      ? "Dead SuperAdmin"
                      : userType == 2
                      ? "Dead Agent Master"
                      : ""}
                  </div>
                ),
                children: [
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Admin/6">
                        Dead Admin
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Mini-Admin/5">
                        Dead Mini Admin Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Master-Master/4">
                        Dead Master Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Super-Master/3">
                        Dead Super Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Agent-Master/2">
                        Dead Agent Master
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Client-Master/1">
                        Dead Client Master
                      </Link>
                    ),
                  },
                ],
              },
            ])}
          />
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
