import React from "react";
import CardItem from "../../common/carditem/CardItem";
import { BiUserCircle } from "react-icons/bi";
import { Card, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import ModalFooter from "../Dashboard/ModalFooter";

const MasterDetails = ({ setOpenModals, openModal }) => {
  const data = [
    {
      image: <BiUserCircle />,
      name: "Super Admin",
      path: "/user-list/Admin/6",
      size: "20",
      id: 0,
      userType: 7,
    },
    {
      image: <BiUserCircle />,
      name: "Admin",
      path: "/user-list/Admin/6",
      size: "20",
      id: 0,
      userType: 6,
    },
    {
      image: <BiUserCircle />,
      name: "Mini Master",
      path: "/user-list/madmin/5",
      size: "20",
      id: 0,
      userType: 5,
    },
    {
      image: <BiUserCircle />,
      name: "Master",
      path: "/user-list/Master/4",
      size: "20",
      id: 0,
      userType: 4,
    },
    {
      image: <BiUserCircle />,
      name: "Super",
      path: `/user-list/Super/3`,
      size: "20",
      userType: 3,
    },
    {
      image: <BiUserCircle />,
      name: "Agent",
      path: `/user-list/Agent/2`,
      size: "20",
      userType: 2,
    },
    {
      image: <BiUserCircle />,
      name: "Client",
      path: "/user-list/Client/1",
      size: "20",
      userType: 1,
    },
  ];
  const uType = localStorage.getItem("userType");
  const userTypeMatch = {
    2: [1],
    3: [1, 2],
    4: [1, 2, 3],
    5: [1, 2, 3, 4],
    6: [1, 2, 3, 4, 5],
    7: [1, 2, 3, 4, 5, 6],
  };

  return (
    <>
      <Modal
        title="SUPER ADMIN DETAILS"
        onCancel={() => setOpenModals(!openModal)}
        footer={<ModalFooter onCancel={() => setOpenModals(!openModal)} />}
        className="antd_dsh_madals antd_dsh_madals--master"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          {data
            ?.filter((res) => userTypeMatch[uType]?.includes(res?.userType))
            ?.map((items) => {
              return (
                <Col md={12} xs={12} key={items?.userType || items?.path}>
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
                                {items?.image}
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

export default MasterDetails;
