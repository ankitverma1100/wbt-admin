import { Card, Col, Empty, Modal, Row } from "antd";
import "./Settings.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChangePassword from "../../common/ChangePassword/ChangePassword";
import moment from "moment";
import AccountStatement from "./AccountStatement/AccountStatement";
import SettingTable from "./SettingTable";

const data = [];

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="setting_main">
      <div>
        <Row gutter={[8]}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div
              className="setting_data"
              onClick={() => navigate("/account-statement")}>
              <span>STATEMENT</span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div
              className="setting_data"
              onClick={() => navigate("/account-operation")}>
              <span>A/C OPERATIONS</span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div
              className="setting_data"
              onClick={() => navigate("/Events/matchledger")}>
              <span>PROFIT & LOSS</span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div
              className="setting_data"
              onClick={() => navigate("/casinoprofitandloss")}>
              <span>CASINO PROFIT & LOSS</span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div
              className="setting_data"
              onClick={() => navigate("/searchUser")}>
              <span>SEARCH USER</span>
            </div>
          </Col>
          {/* <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data" onClick={() => setIsModalOpen(true)}>
              <p>Change Password</p>
            </div>
          </Col> */}
        </Row>

        {/* <Card className=""> */}
        {/* <SettingTable /> */}
        {/* </Card> */}
      </div>

      <Modal
        className="change_pass"
        title="Change Password"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <div className="ch_pass">
          <ChangePassword setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </Card>
  );
};

export default Settings;
