import {
  Button,
  Empty,
  Form,
  Input,
  Menu,
  notification,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  useLazyDepositAndWithdrawQuery,
  useSuperuserListMutation,
} from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode, convertCodeReverse } from "../../../../store/constant";
import { openNotification, openNotificationError } from "../../../../App";
import TablePagination from "../../../common/TablePagination";

const AddSuperLimites = () => {
  const [codeForm] = Form.useForm();
  const [nameForm] = Form.useForm();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const [activeSearchColumn, setActiveSearchColumn] = useState(null);

  const [userToSearch, setUserToSearch] = useState("");
  const [inputValues, setInputValues] = useState({});
  const pageSize = 50;
  const [indexData, setIndexData] = useState(0);
  const [getSuperuserList] = useSuperuserListMutation();
  const [triggerDeposit] = useLazyDepositAndWithdrawQuery();

  const [userDetailsData, setUserDetailsData] = useState([]);
  const [limitLoading, setLimitLoading] = useState({});
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    currentPage: 0,
  });

  const codeRef = useRef(null);
  const nameRef = useRef(null);

  const fetchData = async (searchValue = userToSearch) => {
    const res = await getSuperuserList({
      userType: id,
      parentId: "",
      noOfRecords: pageSize,
      index: indexData,
      userToSearch: convertCodeReverse(searchValue) || "",
    }).unwrap();
    if (res?.status) {
      setUserDetailsData(res?.data?.userListV2 || []);
      setPaginationInfo({
        totalPages: res?.data?.totalPages || 1,
        currentPage: res?.data?.currentPage || 0,
      });
    } else {
      setUserDetailsData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, indexData, userToSearch]);

  // 🔹 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (codeRef.current && codeRef.current.contains(event.target)) ||
        (nameRef.current && nameRef.current.contains(event.target))
      ) {
        return; // inside click → do nothing
      }
      setActiveSearchColumn(null); // outside click → close
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (userId, value) => {
    setInputValues((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const handleLimitAction = (user, isAdd) => {
    const amount = Number(inputValues[user.userId]);
    if (!amount || amount <= 0) {
      openNotificationError("Enter valid amount");
      return;
    }

    const loadingKey = `${user.userId}_${isAdd ? "add" : "minus"}`;
    setLimitLoading((prev) => ({ ...prev, [loadingKey]: true }));

    const payload = {
      userId: user.userId,
      limit: amount,
      limitPlus: isAdd,
      limitInCash: false,
    };

    triggerDeposit(payload)
      .unwrap()
      .then((res) => {
        if (res?.status) {
          openNotification(
            `${isAdd ? "Added" : "Deducted"} ${amount} to ${user.userName}`
          );
          fetchData();
          setInputValues((prev) => ({ ...prev, [user.userId]: "" }));
        } else {
          openNotificationError(res?.message);
        }
      })
      .catch(() => {
        openNotificationError("Transaction failed");
      })
      .finally(() => {
        setLimitLoading((prev) => ({ ...prev, [loadingKey]: false }));
      });
  };

  const onSearchFinish = (values) => {
    setUserToSearch(values?.username?.trim() || "");
    setIndexData(0);
    setActiveSearchColumn(null);
  };

  const handleResetData = async () => {
    codeForm.resetFields();
    nameForm.resetFields();
    setUserToSearch("");
    setIndexData(0);
    fetchData("");
    setActiveSearchColumn(null);
  };

  return (
    <>
      {contextHolder}
      <div
        className="table_section mwt sport_detail"
        style={{ paddingBottom: "12px" }}>
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <table className="live_table limit_update">
            <thead>
              <tr>
                {/* Code column */}
                <th>
                  <div
                    className="main_search_droup"
                    style={{ position: "relative" }}
                    ref={codeRef}>
                    <p>Code</p>
                    {activeSearchColumn === "code" && (
                      <Menu className="menu_item">
                        <Form
                          name="code"
                          form={codeForm}
                          onFinish={onSearchFinish}
                          autoComplete="off"
                          onSubmitCapture={(e) => e.preventDefault()}>
                          <Form.Item name="username">
                            <Input placeholder="Enter code" />
                          </Form.Item>
                          <div className="agent_search_deatil">
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "86px", marginRight: "8px" }}>
                                <SearchOutlined /> Search
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="button"
                                onClick={handleResetData}
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
                            setActiveSearchColumn(
                              activeSearchColumn === "code" ? null : "code"
                            )
                          }
                        />
                      </Space>
                    </div>
                  </div>
                </th>

                {/* Name column */}
                <th>
                  <div
                    className="main_search_droup"
                    style={{ position: "relative" }}
                    ref={nameRef}>
                    <p>Name</p>
                    {activeSearchColumn === "name" && (
                      <Menu
                        className="menu_item"
                        style={{ right: 0, left: "unset" }}>
                        <Form
                          name="name"
                          form={nameForm}
                          onFinish={onSearchFinish}
                          autoComplete="off"
                          onSubmitCapture={(e) => e.preventDefault()}>
                          <Form.Item name="username">
                            <Input placeholder="Enter name" />
                          </Form.Item>
                          <div className="agent_search_deatil">
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "86px", marginRight: "8px" }}>
                                <SearchOutlined /> Search
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="button"
                                onClick={handleResetData}
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
                            setActiveSearchColumn(
                              activeSearchColumn === "name" ? null : "name"
                            )
                          }
                        />
                      </Space>
                    </div>
                  </div>
                </th>

                <th>C. Chips</th>
                <th>Add / Minus Limit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetailsData?.length > 0 ? (
                userDetailsData.map((user, key) => (
                  <tr key={key}>
                    <td>{convertCode(user?.userId)}</td>
                    <td>{user?.userName}</td>
                    <td>{user?.balance + user?.balanceWithPnl}</td>
                    <td>
                      <Form.Item>
                        <Input
                          type="number"
                          value={inputValues[user.userId] || ""}
                          onChange={(e) =>
                            handleInputChange(user.userId, e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "6px",
                            background: "#fff",
                            borderRadius: "8px",
                          }}
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <div className="minus_btn">
                        <Button
                          className="add"
                          loading={limitLoading[`${user.userId}_add`]}
                          disabled={limitLoading[`${user.userId}_add`] || limitLoading[`${user.userId}_minus`]}
                          onClick={() => handleLimitAction(user, true)}>
                          <span className="action_icon">+</span> Add
                        </Button>
                        <Button
                          className="minus"
                          loading={limitLoading[`${user.userId}_minus`]}
                          disabled={limitLoading[`${user.userId}_add`] || limitLoading[`${user.userId}_minus`]}
                          onClick={() => handleLimitAction(user, false)}>
                          <span className="action_icon">−</span> Minus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <TablePagination
              current={paginationInfo.currentPage + 1}
              total={paginationInfo.totalPages * pageSize}
              pageSize={pageSize}
              onChange={(page) => setIndexData(page - 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSuperLimites;
