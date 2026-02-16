import { Card, Col, Modal, Row } from "antd";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import ModalFooter from "../Dashboard/ModalFooter";

const LadgerDetails = ({ setOpenModals, openModal }) => {
  const data = [
    {
      image: <BiUserCircle />,
      name: "PROFIT/LOSS",
      path: "/Events/matchledger",
      size: "20",
      userType: 10,
    },
    {
      image: <BiUserCircle />,
      name: "MY LEDGER",
      path: "/client/my-ledger",
      size: "20",
      userType: 10,
    },
    {
      image: <BiUserCircle />,
      name: "ADMIN",
      path: "/client/ledger-super/6/Admin",
      size: "20",
      userType: 6,
    },
    {
      image: <BiUserCircle />,
      name: "MINI MASTER",
      path: "/client/ledger-super/5/Mini-Admin",
      size: "20",
      userType: 5,
    },
    {
      image: <BiUserCircle />,
      name: "MASTER MASTER",
      path: "/client/ledger-super/4/Master",
      size: "20",
      userType: 4,
    },
    {
      image: <BiUserCircle />,
      name: "SUPER MASTER",
      path: "/client/ledger-super/3/Super",
      size: "20",
      userType: 3,
    },
    {
      image: <BiUserCircle />,
      name: "AGENT MASTER",
      path: `/client/ledger-super/2/Agent`,
      size: "20",
      userType: 2,
    },
    {
      image: <BiUserCircle />,
      name: "CLIENT MASTER",
      path: "/client/ledger-super/1/Client",
      size: "20",
      userType: 1,
    },
  ];

  const uType = localStorage.getItem("userType");
  const userTypeMatch = {
    2: [1, 10],
    3: [1, 2, 10],
    4: [1, 2, 3, 10],
    5: [1, 2, 3, 4, 10],
    6: [1, 2, 3, 4, 5, 10],
    7: [1, 2, 3, 4, 5, 6, 10],
  };

  return (
    <>
      <Modal
        title="LEDGER DETAILS"
        onCancel={() => setOpenModals(false)}
        footer={<ModalFooter onCancel={() => setOpenModals(false)} />}
        className="antd_dsh_madals"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          {data
            .filter((res) => userTypeMatch[uType]?.includes(res?.userType))
            ?.map((items, id) => {
              return (
                <Col md={12} xs={12} key={id}>
                  <Card bordered={false}>
                    <Link to={items?.path}>
                      <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                        <div className="ant-card-body">
                          <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                            <div
                              className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                              style={{ borderRadius: 20 }}>
                              <div className="gx-mr-1 gx-mr-xl-3">
                                <BiUserCircle />
                              </div>
                              <div className="gx-media-body">
                                <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                                  {items?.name}
                                </h1>
                                <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                                <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                                {/* <p className="gx-mb-0">Master</p> */}
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

export default LadgerDetails;
