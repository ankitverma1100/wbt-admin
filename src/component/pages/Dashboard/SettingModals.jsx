import { Card, Col, Modal, Row } from "antd";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import ModalFooter from "./ModalFooter";

const SettingModals = ({ setOpenModals, openModal }) => {
  const userId = localStorage.getItem("userId");
  return (
    <>
      <Modal
        title="Settings"
        onCancel={() => setOpenModals(!openModal)}
        footer={<ModalFooter onCancel={() => setOpenModals(!openModal)} />}
        className="antd_dsh_madals"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          <Col md={12} xs={12}>
            <Card bordered={false}>
              <Link to="/account-statement">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <img src="/Images/user.png" height={33} />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Statements
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
          <Col md={12} xs={12}>
            <Card bordered={false}>
              {/* /client/account-operations/${dataVal} */}
              <Link to={`/account-operation/${userId}`}>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            A/c Operations
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
          <Col md={12} xs={12}>
            <Card bordered={false}>
              <Link to="/Events/matchledger">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Profit and Loss
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
          <Col md={12} xs={12}>
            <Card bordered={false}>
              <Link to="/casinoprofitandloss">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Casino Profit&Loss
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SettingModals;
