import { useEffect, useState } from "react";
import "./Navbar.scss";
import { Dropdown, Space, Modal, Button } from "antd";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/service/authService";
import { useDashboardQuery } from "../../../store/service/userlistService";
import ChangePassword from "../ChangePassword/ChangePassword";
import SelfDeposit from "../DepositModal/SelfDeposit";
import { imgUrl } from "../../../store/constant";

const Navbar = ({ action, collapsed, onToggleCollapse }) => {
  const userData = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const usernameLabel = userData || "User";
  const { data: dashboardData } = useDashboardQuery(undefined, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });
  const balanceValue = Number(dashboardData?.data?.balance);
  const balanceLabel = Number.isFinite(balanceValue)
    ? balanceValue.toFixed(2)
    : "--";

  const [trigger] = useLogoutMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    trigger();
    localStorage.clear();
    nav("/");
  };

  const items = [
    ...(userType == "7"
      ? [
          {
            label: "Deposit",
            key: "2",
          },
        ]
      : []),
    {
      label: "Change Password",
      key: "0",
    },

    {
      label: <span onClick={handleLogout}>Logout</span>,
      key: "1",
    },
  ];
  const handleModal = (e) => {
    if (e.key == 0) {
      setIsModalOpen(true);
    } else if (e.key == 2) {
      setIsDepositeModalOpen(true);
    }
  };

  const handleCancel = () => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  useEffect(() => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    }
  }, [pType, uType]);

  const hostName = window.location.hostname;

  return (
    <>
      <div className="nav">
        <div style={{display: "flex", alignItems: "center"}}>
          <Button
            type="text"
            className="collapse_btn"
            icon={
              collapsed ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )
            }
            onClick={onToggleCollapse}
          />
          <Space className="open_btn">
            <Button type="" className="sub_open_btn" onClick={action}>
              <MenuUnfoldOutlined />
            </Button>
          </Space>

          <img
            alt="example"
            src={
              hostName.includes("mumbaiexchange9") ? "/img/mum-img.png" : imgUrl
            }
            height={60}
            style={{ cursor: "pointer" }}
            onClick={() => nav("/dashboard")}
          />
        </div>
        <div className="nav_drop">
          <div className="sub_menu_nav">
            <Dropdown
              style={{ zIndex: "999999" }}
              className="droup_nav"
              menu={{
                className: "app_dropdown_menu",
                items,
                onClick: handleModal,
              }}
              trigger={["hover"]}>
              <span
                className="user_deatils"
                style={{ cursor: "pointer" }}
                onClick={(e) => e.preventDefault()}>
                <span className="user_deatils_text">
                  <span className="user_name_text">
                    <span className="user_identity_line">
                      <span className="user_name_line" title={usernameLabel}>
                        {usernameLabel}
                      </span>
                      {userId && (
                        <span className="user_id_line" title={userId}>
                          ({userId})
                        </span>
                      )}
                    </span>
                    <span className="user_balance_line">
                      Bal: {balanceLabel}
                    </span>
                  </span>
                  <DownOutlined
                    className="user_deatils_icon"
                    style={{ fontSize: "14px" }}
                  />
                </span>
              </span>
            </Dropdown>
          </div>
        </div>
      </div>

      <Modal
        className="change_pass"
        title="Change Password"
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose
        footer={false}>
        <div className="ch_pass">
          <ChangePassword setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
      <SelfDeposit
        isDepositeModalOpen={isDepositeModalOpen}
        setIsDepositeModalOpen={setIsDepositeModalOpen}
      />
    </>
  );
};

export default Navbar;
