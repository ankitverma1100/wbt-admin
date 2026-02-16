import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Space,
  Spin,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  SearchOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalsData from "../pages/supermaster/listsuper/ModalsData/ModalsData";

import moment from "moment";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import BetlockModal from "./BetlockModal";
import TablePagination from "./TablePagination";
import {
  useSuperuserListMutation,
  useUserBetLockMutation,
} from "../../store/service/supermasteAccountStatementServices";
import { usePartnershipMutation } from "../../store/service/userlistService";
import { openNotification } from "../../App";

// const routeFromUSerType = {
//   0: "/user-list/Super/3/",
//   1: "/user-list/Agent/2/",
//   2: "/client/list-clent/",
// };

const ClientUserListTable = ({ userType, Listname, UserId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState();
  const [isDepositeModalOpen, SetisDepositeModalOpen] = useState(false);
  const [WithdrawnModal, SetWithdrawnModal] = useState(false);
  const [betLockModals, setBetLockModals] = useState(false);
  const [balance, setBalance] = useState();
  const [parentUserId, setParentUserId] = useState();
  const [dataVal, setDataVal] = useState();
  const pageSize = 50;
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIds, setUserIds] = useState("");
  const [parentUserids, setParentUserIds] = useState("");
  const [betStatus, setBetStatus] = useState(false);
  const [accStatus, setAccStatus] = useState(false);
  const [droupSearch, setDroupSearch] = useState(false);
  const [userName, setUserName] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);

  const [form] = Form.useForm();

  const [partnerShipData, { data: partnerShipDetail, isLoading: loading }] =
    usePartnershipMutation();

  const showModal = (val) => {
    setUserIds(val);
    const partnerShipDetail = {
      userId: val,
    };
    partnerShipData(partnerShipDetail);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setPartnershipDetails(partnerShipDetail?.data);
  }, [partnerShipDetail?.data]);

  const showWithdrawnModal = () => {
    SetWithdrawnModal(true);
    setDropdownStates([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDropdownStates([]);
  };
  const handleDepositeOk = () => {
    SetisDepositeModalOpen(false);
    setDropdownStates([]);
  };
  const handleDepositeCancel = () => {
    SetisDepositeModalOpen(false);
    setDropdownStates([]);
  };
  const showDepositModal = () => {
    SetisDepositeModalOpen(true);
    setDropdownStates([]);
  };

  const { id } = useParams();
  //API CALL

  const onFinish = (values) => {
    getData({
      userType: userType,
      parentUserId: id || null,
      noOfRecords: pageSize,
      index: indexData,
      userId: values?.username,
    });
    if (results?.status === true) {
      form.resetFields();
      setDroupSearch(false);
    }
  };

  const [getData, { data: results, isLoading, isFetching, isError }] =
    useSuperuserListMutation();

  const [activeData, { data: Activestatus }] = useUserBetLockMutation();

  const handleActive = () => {
    setDropdownStates([]);
    activeData({
      userId: dataVal,
      isLock:
    });
  };

  useEffect(() => {
    getData({
      userType: userType,
      parentUserId: id || null,
      noOfRecords: pageSize,
      index: indexData,
      userId: "",
    });
  }, [id, userType, indexData]);

  const [userIdData, setUserIdData] = useState("");

  const handleParentId = (
    val,
    bal,
    user,
    parentUserID,
    betStatus,
    accStatus
  ) => {
    setParentUserId(val);
    setBalance(bal);
    setUserIdData(user);
    setParentUserIds(parentUserID);
    setBetStatus(betStatus), setAccStatus(accStatus);
  };

  const handleEditData = (val, active, userName, balanc) => {
    setDataVal(val);
    setActiveStatus(active);
    setUserBalance(balanc);
    setUserName(userName);
  };

  const userId = localStorage.getItem("userId");

  const handleBlockBettting = () => {
    setDropdownStates([]);
    // setBetLockModals(true);
  };

  const nav = useNavigate();

  const handleUpdateLimites = (data) => {
    setDropdownStates([]);
    const infoData = {
      name: userName,
      uBalance: userBalance,
    };
    nav(`/client/limitplusminus-super/${dataVal}`, { state: infoData });
  };

  const items = [
    {
      className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={showDepositModal}>Deposit</div>,
      key: "0",
    },
    {
      className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={showWithdrawnModal}>Withdrawn</div>,
      key: "1",
    },
    // {
    //   className: `${parentUserids == userId ? "" : "d_none"}`,
    //   label: (
    //     <div onClick={handleActive}>{`${
    //       activeStatus === true ? "inActive" : "Active"
    //     }`}</div>
    //   ),
    //   key: "2",
    // },
    {
      className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={handleBlockBettting}>Block Betting</div>,
      key: "3",
    },
    {
      className: `${parentUserids == userId ? "" : "d_none"}`,
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`${
            Listname === "Super Agent"
              ? `/client/update-super/${dataVal}`
              : Listname === "Master"
              ? `/client/update-agent/${dataVal}`
              : Listname === "Dealer"
              ? `/client/update-dealer/${dataVal}`
              : `/client/update-client/${dataVal}`
          }`}>
          Edit
        </Link>
      ),
      key: "5",
    },
    {
      className: `${parentUserids == userId ? "" : "d_none"}`,
      label: (
        <div onClick={() => handleUpdateLimites(dataVal)}>Update Limit</div>
      ),
      key: "6",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/account-statement/${dataVal}`}>
          Statement
        </Link>
      ),
      key: "7",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/client/account-operations/${dataVal}`}>
          Account Operations
        </Link>
      ),
      key: "8",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/client/login-report/${dataVal}`}>
          Login Report
        </Link>
      ),
      key: "9",
    },
    // {
    //   label: (
    //     <Link onClick={()=> setDropdownStates([])}
    //       className={userType == 3 ? "d_none" : ""}
    //       to={routeFromUSerType[userType] + parentUserId}>
    //       Downline
    //     </Link>
    //   ),
    //   key: "10",
    // },
  ];

  useEffect(() => {
    if (Activestatus?.status === true) {
      openNotification(Activestatus?.message);
    }
  }, [Activestatus?.status]);

  const uType = localStorage.getItem("userType");

  useEffect(() => {
    const initialStates = new Array(results?.data?.user?.length).fill(false);
    setDropdownStates(initialStates);
  }, [results?.data?.user]);

  const handleScroll = () => {
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownStates(updatedDropdownStates);
  };
  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  return (
    <div>
      {droupSearch && (
        <div className="over_view" onClick={() => setDroupSearch(false)}></div>
      )}
      <div
        ref={myElementRef}
        className="sport_detail m-0 ant-spin-nested-loading">
        {
          <div
            className="table_section statement_tabs_data ant-spin-nested-loading"
            style={{
              overflow: `${isLoading || isFetching ? "hidden" : "scroll"}`,
            }}>
            {isLoading || isFetching ? (
              <div className="spin_icon user_spin">
                <Spin size="large" />
              </div>
            ) : (
              ""
            )}
            <table className={`live_table ${id && "mt-0"}`}>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}></th>
                <th rowSpan={2}>
                  <div className="main_search_droup">
                    <p>Code</p>
                    {droupSearch && (
                      <Menu className="menu_item">
                        <Form
                          name="code"
                          form={form}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                          autoComplete="off">
                          <Form.Item name="username">
                            <Input />
                          </Form.Item>

                          <div className="agent_search_deatil">
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                  width: "86px",
                                  marginRight: "8px",
                                }}>
                                <SearchOutlined /> Search
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                onClick={() => form.resetFields()}
                                className="ant_reset_btn"
                                style={{ width: "86px" }}>
                                Reset
                              </Button>
                            </Form.Item>
                          </div>
                        </Form>
                      </Menu>
                    )}
                    <div className="search_code">
                      <Space>
                        <SearchOutlined
                          onClick={() => setDroupSearch(!droupSearch)}
                        />
                      </Space>
                    </div>
                  </div>
                </th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>
                  {uType == 5
                    ? "Mini Admin"
                    : uType == 0
                    ? "Master"
                    : uType == 1
                    ? "Super"
                    : uType == 2
                    ? "Agent"
                    : ""}
                </th>
                <th rowSpan={2}>Contact</th>
                <th rowSpan={2}>D.O.J </th>
                <th rowSpan={2}>Share%</th>
                <th rowSpan={2}>PWD</th>
                <th colSpan={3} className="text-center">
                  Super Agent Comm %
                </th>
                <th rowSpan={2} className="text-right">
                  C.Chips
                </th>
                <th rowSpan={2} className="text-right">
                  Credit Reference
                </th>
                <th rowSpan={2}>Status</th>
              </tr>
              <tr>
                <th>Type</th>
                <th>Match</th>
                <th>SSN</th>
              </tr>

              {!isError &&
                results?.data?.users?.map((res, id) => {
                  return (
                    <tr key={id}>
                      <td>
                        <div
                          onClick={() => showModal(res?.userid)}
                          className="plus_btn">
                          <PlusOutlined />
                        </div>
                      </td>
                      <td
                        onClick={() =>
                          handleParentId(
                            res?.id,
                            res?.availablebalance,
                            res?.userid,
                            res?.parent,
                            res?.betlock,
                            res?.accountlock
                          )
                        }>
                        <Dropdown
                          className="droup_menu"
                          open={dropdownStates[id]}
                          onOpenChange={() => toggleDropdown(id)}
                          menu={{ items, className: "app_dropdown_menu" }}
                          trigger={["click", "contextMenu"]}>
                          <div
                            className="droup_link"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleEditData(
                                res?.userid,
                                res?.active,
                                res?.username,
                                res?.availablebalance
                              )
                            }>
                            <Space>
                              <CaretDownOutlined />
                            </Space>
                          </div>
                        </Dropdown>
                      </td>
                      <td>{res?.userid}</td>
                      <td>{res?.username}</td>
                      <td>{res?.parent}</td>
                      <td>{res?.mobile}</td>
                      <td>
                        {moment(res?.dateOfJoining).format(
                          "YYYY-MM-DD, h:mm A"
                        )}
                      </td>
                      <td>{res?.partnerShip}</td>
                      <td>{res?.password}</td>
                      <td>
                        {res?.matchCommission == 0 &&
                        res?.sessionCommission == 0
                          ? "No Comm"
                          : "bbb"}
                      </td>
                      <td>{Number(res?.matchCommission)?.toFixed(2)}</td>
                      <td>{Number(res?.sessionCommission)?.toFixed(2)}</td>
                      <td className="text-right">
                        {Number(res?.balancePlusPnl)?.toFixed(2)}
                      </td>
                      <td className="text-right">
                        {Number(res?.creditref)?.toFixed(2)}
                      </td>
                      <td>{res?.active === true ? "Active" : "InActive"}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        }

        {results?.data?.users === undefined || isError ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            <Divider />
            <div className="pagination_cus">
              <TablePagination
                className="pagination_main ledger_pagination"
                total={results?.data?.totalPages * pageSize}
                pageSize={pageSize}
                current={indexData + 1}
                onChange={(e) => setIndexData(e - 1)}
              />
            </div>
          </>
        )}
        <Modal
          className="partnership"
          width={750}
          title={`PARTNERSHIP DETAILS - ${userIds}`}
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}>
          <ModalsData
            loading={loading}
            partnershipDetails={partnershipDetails}
          />
        </Modal>
      </div>

      <Modal
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>Deposit</span>
          </h1>
        }
        open={isDepositeModalOpen}
        onOk={handleDepositeOk}
        onCancel={handleDepositeCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <Deposit
          handleClose={() => SetisDepositeModalOpen(false)}
          userIdData={userIdData}
          data={dataVal}
        />
      </Modal>

      <Modal
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>Withdraw Chips</span>
          </h1>
        }
        open={WithdrawnModal}
        onOk={handleDepositeOk}
        onCancel={() => SetWithdrawnModal(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <Withdraw
          userIdData={userIdData}
          handleClose={() => SetWithdrawnModal(false)}
          data={dataVal}
        />
      </Modal>

      <Modal
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>Betting Lock</span>
          </h1>
        }
        open={betLockModals}
        // onOk={handleBetLockOk}
        onCancel={() => setBetLockModals(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <BetlockModal
          userIdData={userIdData}
          setBetStatus={setBetStatus}
          betStatus={betStatus}
          setAccStatus={setAccStatus}
          accStatus={accStatus}
          handleClose={() => setBetLockModals(false)}
        />
      </Modal>
    </div>
  );
};

export default ClientUserListTable;
