import React from "react";
import CardItem from "../../common/carditem/CardItem";
import { BiUserCircle } from "react-icons/bi";
import { Card, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import ModalFooter from "./ModalFooter";

const SportModal = ({ setOpenModals, openModal }) => {
  const data = [
    {
      name: "ACTIVE GAMES",
      path: "/Events/sports-details",
      size: "20",
      id: 0,
      userType: 0,
    },
    {
      name: "FINISHED GAMES",
      path: `/finish-game`,
      size: "20",
      id: 1,
      userType: 1,
    },
  ];
  const uType = localStorage.getItem("userType");
  const userTypeMatch = {
    0: [1, 2, 3],
    1: [2, 3],
    2: [3],
    5: [0, 1, 2, 3],
  };
  return (
    <>
      <Modal
        title="SPORTS DETAILS"
        onCancel={() => setOpenModals(!openModal)}
        footer={<ModalFooter onCancel={() => setOpenModals(!openModal)} />}
        className="antd_dsh_madals"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          {data?.map((items, index) => {
            return (
              <Col
                md={12}
                xs={12}
                key={items?.id ?? items?.path ?? index}>
                <Card bordered={false}>
                  <Link to={items?.path}>
                    <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                      <div className="ant-card-body">
                        <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                          <div
                            className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                            style={{ borderRadius: 20 }}>
                            <div className="gx-mr-1 gx-mr-xl-3">
                              {/* <i className="icon icon-family gx-fs-2xl" /> */}
                             <img src="/Images/sheare.png" width={30} />
                            </div>
                            <div className="gx-media-body">
                              <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                                {items?.name}
                              </h1>
                              <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                              <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
};

export default SportModal;
