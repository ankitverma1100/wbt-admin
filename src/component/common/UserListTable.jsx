import { useEffect, useRef, useState } from "react";
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
  Tag,
  Tooltip,
} from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import {
  SearchOutlined,
  ShareAltOutlined,
  DownOutlined,
} from "@ant-design/icons";
import ModalsData from "../pages/supermaster/listsuper/ModalsData/ModalsData";

import moment from "moment";
import Deposit from "./Deposit";
import {
  useGetUserActiveDeactiveMutation,
  useSuperuserListMutation,
  useUserBetLockMutation,
  useUserCasinoLockMutation,
  useUserMatkaLockMutation,
} from "../../store/service/supermasteAccountStatementServices";
import {
  useGetGenerateMutation,
  usePartnershipMutation,
} from "../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../App";
import { SlEye } from "react-icons/sl";
import Exposure from "./Exposure";
import CustomLoading from "./CustomLoading/CustomLoading";
import TablePagination from "./TablePagination";
import { convertCode, convertCodeReverse, isNsg } from "../../store/constant";

const routeFromUSerType = {
  6: "/user-list/Mini-Admin/5",
  5: "/user-list/Master/4",
  4: "/user-list/Super/3",
  3: "/user-list/Agent/2",
  2: "/user-list/Client/1",
};

const routeDeadFromUSerType = {
  6: "/dead-user-list/Mini-Admin/5",
  5: "/dead-user-list/Master/4",
  4: "/dead-user-list/Super/3",
  3: "/dead-user-list/Agent/2",
  2: "/dead-user-list/Client/1",
};

const UserListTable = ({
  userType,
  Listname,
  setParentUserIds,
  forDeadClient,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedUserIdForActions, setSelectedUserIdForActions] =
    useState(null);
  const pageSize = 25;
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIdForPartnership, setUserIdForPartnership] = useState("");
  const [depositData, setDepositData] = useState({});

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openResetPassModal, setOpenResetPassModal] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const [isBlockActionsModalOpen, setIsBlockActionsModalOpen] =
    useState(false);
  const [blockActionsUserId, setBlockActionsUserId] = useState(null);
  const [blockActionLoading, setBlockActionLoading] = useState({
    betting: false,
    casino: false,
    matka: false,
  });
  const [userToSearch, setUserToSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState(null);
  const [codeForm] = Form.useForm();
  const [nameForm] = Form.useForm();
  const { parentId: parentIdFromParams, userTyep } = useParams();
  const myElementRef = useRef(null);
  const codeRef = useRef(null);
  const nameRef = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    console.log("UserListTable userType:", userType);
  }, [userType]);

  useEffect(() => {
    // Reset search value
    setUserToSearch("");

    // Reset both search forms
    codeForm.resetFields();
    nameForm.resetFields();

    setActiveSearch(null);
    setShowSearchDropdown(false);
  }, [pathname]);

  const [getSuperuserList, { data: superuserListData, isLoading, isFetching }] =
    useSuperuserListMutation();
  const [getBetLock] = useUserBetLockMutation();
  const [getUserActiveDeactive] = useGetUserActiveDeactiveMutation();
  const [getCasinoLock] = useUserCasinoLockMutation();
  const [getMatkaLock] = useUserMatkaLockMutation();
  const [
    getPartnershipData,
    { data: partnershipDetail, isLoading: loadingPartnership },
  ] = usePartnershipMutation();

  const [userDetailsData, setUserDetailsData] = useState();
  const fetchData = async (userId) => {
    const res = await getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: pageSize,
      index: indexData,
      userToSearch: convertCodeReverse(userToSearch) || userId,
      forDeadClient: forDeadClient,
    }).unwrap();
    if (res?.status) {
      setActiveSearch(null);
      setShowSearchDropdown(false);
      setUserDetailsData(res?.data?.userListV2);
    } else {
      setUserDetailsData([]);
    }
  };

  const handleShowPartnershipModal = (userId) => {
    setUserIdForPartnership(userId);
    getPartnershipData({ userId });
    setIsModalOpen(true);
  };

  const handleClosePartnershipModal = () => {
    setIsModalOpen(false);
    resetDropdownStates();
  };

  const handleShowDepositModal = (data, isDeposit) => {
    setIsDepositModalOpen(true);
    resetDropdownStates();
    setDepositData({ ...data, isDeposit });
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
    resetDropdownStates();
  };

  const handleShowBlockActionsModal = (res) => {
    setBlockActionsUserId(res?.userId ?? res?.userid ?? null);
    setIsBlockActionsModalOpen(true);
    resetDropdownStates();
  };

  const handleCloseBlockActionsModal = () => {
    setIsBlockActionsModalOpen(false);
    resetDropdownStates();
  };

  const handleToggleAccountStatus = async (res) => {
    const result = await getUserActiveDeactive({
      activate: !res?.isActive,
      userIdList: [res?.userId],
    }).unwrap();
    if (result?.status) {
      openNotification(result?.message);
      fetchData();
      resetDropdownStates();
    } else {
      openNotificationError(result?.message);
    }
  };

  const handleBlockBetting = async (res) => {
    setBlockActionLoading((prev) => ({ ...prev, betting: true }));
    try {
      const result = await getBetLock({
        userId: res?.userId,
        isLock: !res?.betLock,
      }).unwrap();
      if (result?.status) {
        openNotification(result?.message);
        fetchData();
        resetDropdownStates();
      } else {
        openNotificationError(result?.message);
      }
    } catch (error) {
      openNotificationError(
        error?.data?.message || error?.message || "Something went wrong"
      );
    } finally {
      setBlockActionLoading((prev) => ({ ...prev, betting: false }));
    }
  };

  const handleBlockCasino = async (res) => {
    setBlockActionLoading((prev) => ({ ...prev, casino: true }));
    try {
      const result = await getCasinoLock({
        userId: res?.userId,
        isLock: !res?.casinoLock,
      }).unwrap();
      if (result?.status) {
        openNotification(result?.message);
        fetchData();
        resetDropdownStates();
      } else {
        openNotificationError(result?.message);
      }
    } catch (error) {
      openNotificationError(
        error?.data?.message || error?.message || "Something went wrong"
      );
    } finally {
      setBlockActionLoading((prev) => ({ ...prev, casino: false }));
    }
  };

  const handleBlockMatka = async (res) => {
    setBlockActionLoading((prev) => ({ ...prev, matka: true }));
    try {
      const result = await getMatkaLock({
        userId: res?.userId,
        isLock: !res?.matkaBetLock,
      }).unwrap();
      if (result?.status) {
        openNotification(result?.message);
        fetchData();
        resetDropdownStates();
      } else {
        openNotificationError(result?.message);
      }
    } catch (error) {
      openNotificationError(
        error?.data?.message || error?.message || "Something went wrong"
      );
    } finally {
      setBlockActionLoading((prev) => ({ ...prev, matka: false }));
    }
  };

  const handleEditUserData = (userId) => {
    setSelectedUserIdForActions(userId);
  };

  const handleParentIdChange = (userId, parentUserID) => {
    setSelectedUserIdForActions(userId);
    setParentUserIds(parentUserID);
  };

  const selectedBlockUser = userDetailsData?.find(
    (user) => (user?.userId ?? user?.userid) === blockActionsUserId
  );

  const [dropdownOpenStates, setDropdownOpenStates] = useState([]);

  const resetDropdownStates = () => {
    const updatedDropdownStates = dropdownOpenStates.map(() => false);
    setDropdownOpenStates(updatedDropdownStates);
    setIsOverlayOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownOpenStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownOpenStates(updatedDropdownStates);
    setIsOverlayOpen(updatedDropdownStates[index]);
  };

  const handleScroll = () => {
    resetDropdownStates();
  };

  useEffect(() => {
    if (partnershipDetail?.data) {
      setPartnershipDetails(partnershipDetail.data);
    }
  }, [partnershipDetail?.data]);

  useEffect(() => {
    fetchData();
  }, [
    parentIdFromParams,
    userType,
    indexData,
    userToSearch,
    forDeadClient,
  ]);

  useEffect(() => {
    if (userDetailsData) {
      setDropdownOpenStates(new Array(userDetailsData.length).fill(false));
    }
  }, [userDetailsData]);

  useEffect(() => {
    const element = myElementRef.current;
    if (element) {
      window.addEventListener("scroll", handleScroll);
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        window.removeEventListener("scroll", handleScroll);
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const totalPages = superuserListData?.data?.totalPages || 1;
  const currentPage = superuserListData?.data?.currentPage || 0;

  const onSearchFinish = (values) => {
    setUserToSearch(values?.username);
  };

  const handleResetData = async () => {
    codeForm.resetFields();
    nameForm.resetFields();
    setUserToSearch();
    const res = await getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: pageSize,
      index: indexData,
      userToSearch: "",
      forDeadClient: forDeadClient,
    }).unwrap();
    if (res?.status) {
      setActiveSearch(null);
      setShowSearchDropdown(false);
      setUserDetailsData(res?.data?.userListV2);
    } else {
      setUserDetailsData([]);
    }
  };

  const [resetPassword, { data: resetPassData }] = useGetGenerateMutation();

  const handleResetPass = (res) => {
    resetPassword();
    setUserId(res?.userId);
  };

  const getActionMenuItems = (res) => {
    const isDeadClient = forDeadClient;

    return [
      // Deposit
      !isDeadClient && {
        label: (
          <div
            className="menu_item_emphasis"
            onClick={() => handleShowDepositModal(res, true)}>
            Deposit
          </div>
        ),
        key: "0",
      },

      // Withdraw
      !isDeadClient && {
        label: (
          <div
            className="menu_item_emphasis"
            onClick={() => handleShowDepositModal(res, false)}>
            Withdraw
          </div>
        ),
        key: "1",
      },

      // Toggle Active/Inactive
      {
        label: (
          <div onClick={() => handleToggleAccountStatus(res)}>
            {res?.isActive ? "InActive" : "Active"}
          </div>
        ),
        key: "2",
      },

      !isDeadClient && {
        label: (
          <div onClick={() => handleShowBlockActionsModal(res)}>
            Block Actions
          </div>
        ),
        key: "3",
      },

      // Edit Client
      !isDeadClient && {
        label: (
          <Link
            onClick={resetDropdownStates}
            to={`/client/update-client/${userType}/${res?.userId}`}>
            Edit
          </Link>
        ),
        key: "5",
      },

      // Account Statement
      {
        label: (
          <Link
            onClick={resetDropdownStates}
            to={`/account-statement/${res?.userId}`}>
            Statement
          </Link>
        ),
        key: "6",
      },

      // Account Operations
      {
        label: (
          <Link
            onClick={resetDropdownStates}
            to={`/account-operation/${res?.userId}`}>
            Account Operations
          </Link>
        ),
        key: "7",
      },

      // Login Report
      {
        label: (
          <Link
            onClick={resetDropdownStates}
            to={`/client/login-report/${res?.userId}`}>
            Login Report
          </Link>
        ),
        key: "8",
      },

      // Downline
      {
        label: (
          <Link
            onClick={resetDropdownStates}
            className={userType === "1" ? "d_none" : ""}
            to={`${
              forDeadClient
                ? routeDeadFromUSerType?.[userType]
                : routeFromUSerType[userType]
            }/${res?.userId}`}>
            Downline
          </Link>
        ),
        key: "9",
      },

      // Reset Password
      !isDeadClient && {
        label: (
          <Link
            onClick={() => {
              setOpenResetPassModal(!openResetPassModal);
              resetDropdownStates();
              handleResetPass(res);
            }}
            to="#">
            Reset Password
          </Link>
        ),
        key: "10",
      },
    ].filter(Boolean); // Remove any false/null entries
  };

  const nav = useNavigate();

  const handleExposure = (useId) => {
    setOpenExp(true);
    setUserId(useId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (codeRef.current && codeRef.current.contains(event.target)) ||
        (nameRef.current && nameRef.current.contains(event.target))
      ) {
        return; // inside click → do nothing
      }
      setActiveSearch(null); // outside click → close
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOverlayOpen && <div className="overlay_layout"></div>}
      <div>
        {showSearchDropdown && (
          <div
            className="over_view"
            onClick={() => setShowSearchDropdown(false)}></div>
        )}
        <div
          className="sport_detail m-0 ant-spin-nested-loading"
          style={{ position: "relative" }}>
          <div
            ref={myElementRef}
            className="table_section statement_tabs_data ant-spin-nested-loading"
            style={{
              overflow: `${isLoading || isFetching ? "hidden" : "scroll"}`,
            }}>
            {(isLoading || isFetching) && <CustomLoading />}
            <table className={`live_table ${forDeadClient ? "mt-0" : ""}`}>
              <thead>
                <tr>
                  <th rowSpan={2}>#</th>
                  <th rowSpan={2}></th>
                  <th rowSpan={2}>
                    <div
                      className="main_search_droup"
                      style={{ position: "relative" }}
                      ref={codeRef}>
                      <p>Code</p>
                      {activeSearch === "code" && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={codeForm}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onSearchFinish}
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
                                  type="button"
                                  onClick={() => handleResetData()}
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
                            onClick={() =>
                              setActiveSearch(
                                activeSearch === "code" ? null : "code"
                              )
                            }
                          />
                        </Space>
                      </div>
                    </div>
                  </th>
                  <th rowSpan={2}>
                    <div
                      className="main_search_droup"
                      style={{ position: "relative" }}
                      ref={nameRef}>
                      <p>Name</p>
                      {activeSearch === "name" && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={nameForm}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onSearchFinish}
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
                                  type="button"
                                  onClick={() => handleResetData()}
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
                            onClick={() =>
                              setActiveSearch(
                                activeSearch === "name" ? null : "name"
                              )
                            }
                          />
                        </Space>
                      </div>
                    </div>
                  </th>
                  <th rowSpan={2}>
                    {userType == 7
                      ? "SuperAdmin"
                      : userType == 6
                      ? "SuperAdmin"
                      : userType == 5
                      ? "Admin"
                      : userType == 4
                      ? "Mini Master"
                      : userType == 3
                      ? "Master"
                      : userType == 2
                      ? "Super"
                      : "Agent"}
                  </th>
                  <th rowSpan={2}>D.O.J </th>
                  <th rowSpan={2}>PASSWORD</th>
                  <th rowSpan={2}>Share</th>
                  {userType == 1 && (
                    <th rowSpan={2} style={{ textAlign: "right" }}>
                      Exposure
                    </th>
                  )}
                  <th colSpan={3} className="text-center">
                    {Listname} Comm
                  </th>
                  <th rowSpan={2} className="text-right">
                    Chips
                  </th>
                  <th rowSpan={2}>Status</th>
                </tr>
                <tr>
                  <th>Type</th>
                  <th>Match</th>
                  <th>Session</th>
                </tr>
              </thead>
              <tbody>
                {userDetailsData?.length > 0 ? (
                  userDetailsData?.map((res, id) => (
                    <tr key={id}>
                      <td>
                        <Tooltip title="Share info">
                          <div
                            onClick={() =>
                              handleShowPartnershipModal(res?.userId)
                            }>
                            <ShareAltOutlined className="icon-share" />
                          </div>
                        </Tooltip>
                      </td>
                      <td
                        onClick={() =>
                          handleParentIdChange(res?.userid, res?.parent)
                        }>
                        <Dropdown
                          className="droup_menu"
                          open={dropdownOpenStates[id]}
                          onOpenChange={() => {
                            toggleDropdown(id);
                          }}
                          menu={{
                            items: getActionMenuItems(res),
                            className: "app_dropdown_menu",
                          }}
                          trigger={["click", "contextMenu"]}>
                          <div
                            className="droup_link"
                            style={{ cursor: "pointer", width: "35px" }}
                            onClick={() => handleEditUserData(res?.userid)}>
                            <Space>
                              <DownOutlined className="icon-down" />
                            </Space>
                          </div>
                        </Dropdown>
                      </td>
                      <td>{convertCode(res?.userId)}</td>
                      <td>
                        <span
                          onClick={() => {
                            if (userType == 1) {
                              nav(`/account-statement/${res?.userId}`);
                              setIndexData(0);
                              return;
                            }

                            if (userTyep != 1) {
                              nav(
                                `${
                                  forDeadClient
                                    ? routeDeadFromUSerType?.[userType]
                                    : routeFromUSerType[userType]
                                }/${res?.userId}`
                              );
                              setIndexData(0);
                            } else if (res?.liability !== 0) {
                              handleExposure(res?.userId);
                            }
                          }}
                          className={`${"gx-text-blue gx-pointer"}  gx-text-nowrap`}>
                          <SlEye /> {res?.userName}
                        </span>
                      </td>
                      <td>
                        {res?.parentName} ({convertCode(res?.parentId)})
                      </td>
                      <td>{moment(res?.createdOn).format("DD-MMM-YYYY")}</td>
                      <td>
                        {(() => {
                          const pwd = res?.password ?? "";
                          const maskedLength = String(pwd).length || 1;
                          return "*".repeat(maskedLength);
                        })()}
                      </td>
                      <td>
                        {res?.partnerShip !== undefined &&
                        res?.partnerShip !== null
                          ? `${Number(res?.partnerShip)}%`
                          : "-"}
                      </td>
                      {userType == 1 && (
                        <td style={{ textAlign: "right" }}>
                          <span
                            onClick={() => {
                              !forDeadClient &&
                                res?.liability !== 0 &&
                                handleExposure(res?.userId);
                            }}
                            style={{
                              border: "1px solid #fff",
                              fontWeight: 600,
                              color: res?.liability !== 0 ? "#78152B" : "#000",
                              cursor: "pointer",
                            }}>
                            {/* <Tag color="#f50"> */}
                            {res?.liability === 0
                              ? "0"
                              : res?.liability?.toFixed(2) || 0}
                            {/* </Tag> */}
                          </span>
                        </td>
                      )}
                      <td>
                        {res?.matchCommission === 0 &&
                        res?.sessionCommission === 0
                          ? "NOC"
                          : "BBB"}
                      </td>
                      <td>
                        {res?.matchCommission !== undefined &&
                        res?.matchCommission !== null
                          ? Number(res?.matchCommission).toFixed(2)
                          : "-"}
                      </td>
                      <td>
                        {res?.sessionCommission !== undefined &&
                        res?.sessionCommission !== null
                          ? Number(res?.sessionCommission).toFixed(2)
                          : "-"}
                      </td>
                      <td className="text-right">
                        {userType == 1
                          ? (
                              Number(res?.balance) +
                              Number(res?.balanceWithPnl) -
                              Number(res?.liability?.toFixed(2) || 0)
                            )?.toFixed()
                          : (
                              Number(res?.balance) + Number(res?.balanceWithPnl)
                            )?.toFixed()}
                      </td>
                      <td>
                        <span
                          className={`status_badge ${
                            res?.isActive ? "status_active" : "status_inactive"
                          }`}>
                          {res?.isActive ? "Active" : "InActive"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={15}>
                      <Empty />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Divider />
          <div className="pagination_cus" style={{ textAlign: "right" }}>
            <TablePagination
              current={currentPage + 1}
              total={totalPages * pageSize}
              pageSize={pageSize}
              onChange={(page) => setIndexData(page - 1)}
              className="pagination_main"
            />
          </div>

          <ModalsData
            loading={loadingPartnership}
            partnershipDetails={partnershipDetails}
            isModalOpen={isModalOpen}
            handleCancel={handleClosePartnershipModal}
            userIds={userIdForPartnership}
          />
        </div>

        <Deposit
          handleClose={handleCloseDepositModal}
          data={depositData}
          userIdData={selectedUserIdForActions}
          isDepositeModalOpen={isDepositModalOpen}
          handleDepositeOk={handleCloseDepositModal}
          handleDepositeCancel={handleCloseDepositModal}
          fetchData={fetchData}
          userType={userType}
        />
        <Modal
          title={`Block Actions - ${
            selectedBlockUser?.userId
              ? convertCode(selectedBlockUser?.userId)
              : ""
          }`}
          open={isBlockActionsModalOpen}
          onCancel={handleCloseBlockActionsModal}
          footer={null}>
          <div style={{ display: "flex", gap: 12, marginTop: 8, minHeight: 140 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Button
                type='text'
                style={{ background: "transparent", border: "1px solid #d9d9d9", boxShadow: "none" }}
                loading={blockActionLoading.betting}
                onClick={() => handleBlockBetting(selectedBlockUser)}
                disabled={!selectedBlockUser || blockActionLoading.betting}>
                 {selectedBlockUser?.betLock ? "Unblock" : "Block"} Betting
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Button
                type='text'
                style={{ background: "transparent", border: "1px solid #d9d9d9", boxShadow: "none" }}
                loading={blockActionLoading.casino}
                onClick={() => handleBlockCasino(selectedBlockUser)}
                disabled={!selectedBlockUser || blockActionLoading.casino}>
                {selectedBlockUser?.casinoLock ? "Unblock" : "Block"} Casino
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Button
                type='text'
                style={{ background: "transparent", border: "1px solid #d9d9d9", boxShadow: "none" }}
                loading={blockActionLoading.matka}
                onClick={() => handleBlockMatka(selectedBlockUser)}
                disabled={!selectedBlockUser || blockActionLoading.matka}>
                {selectedBlockUser?.matkaBetLock ? "Unblock" : "Block"} Matka
              </Button>
            </div>
          </div>
        </Modal>
        <Exposure openExp={openExp} setOpenExp={setOpenExp} userId={userId} />

        <ResetPassword
          isDepositeModalOpen={openResetPassModal}
          setOpenResetPass={setOpenResetPassModal}
          data={resetPassData?.data}
          userId={userId}
          userType={userType}
        />
      </div>
    </>
  );
};

export default UserListTable;
