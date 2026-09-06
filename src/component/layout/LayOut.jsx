import { Button, Layout, Modal } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../common/sidebar/Sidebar";
const { Header, Content } = Layout;
import Navbar from "../common/navbar/Navbar";
import "./Layout.scss";
import MarqueeTag from "../common/marquee/MarqueeTag";
import { Outlet, useNavigate } from "react-router-dom";
import HomeRules from "../pages/HomeRules";

const LayOut = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDarawer = () => setOpen((prev) => !prev);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);


  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      nav("/");
    }
  }, [nav]);

  const handleOk = () => {
    handleCloseBtn();
  };

  const handleCloseBtn = () => {
    localStorage.removeItem("rulesStatus");
    setOpenRules(false);
  };

  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  useEffect(() => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setOpenRules(false);
    } else {
      setOpenRules(localStorage.getItem("rulesStatus") === "true");
    }
  }, [pType, uType]);

  return (
    <>
      <Layout className="main_layout">
        <Sidebar collapsed={collapsed} open={open} action={toggleDarawer} />
        <Layout>
          <Header
            className="header_com">
            <Navbar
              open={open}
              action={toggleDarawer}
              collapsed={collapsed}
              onToggleCollapse={toggleCollapsed}
            />
          </Header>
          <div className="marqu_tag">
            <MarqueeTag />
          </div>
          <Content
            // style={{ margin: "2px 1px", padding: "21px 19px 0" }}
            className="main_section">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Modal
        open={openRules}
        className="modals_rule"
        title={`${(() => {
          const parts = window.location.hostname.split(".");
          if (parts.length >= 3) {
            return `${parts[1]}.${parts[2]}`;
          }
          return window.location.hostname;
        })()} Rule`}
        onOk={handleOk}
        onCancel={handleCloseBtn}
        footer={[
          <Button key="cancel" onClick={handleCloseBtn}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}>
        <HomeRules onCancel={handleCloseBtn} onOk={handleOk} />
      </Modal>
    </>
  );
};

export default LayOut;
