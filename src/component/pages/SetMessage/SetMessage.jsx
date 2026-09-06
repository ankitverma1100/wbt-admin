import { Button, Card, Row, Col, Select, message as AntMessage } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useAppDetailsQuery,
  useGetMessageQuery,
  useSetMessageMutation,
} from "../../../store/service/userlistService";
import TextArea from "antd/es/input/TextArea";

const SetMessage = () => {
  const nav = useNavigate();

  const {
    data: appDetails,
    isLoading: isLoadingApps,
    isError: isAppError,
  } = useAppDetailsQuery();
  const [setMessageApi, { isLoading: isSaving }] = useSetMessageMutation();

  const [msg, setMsg] = useState("");
  const [selectedAppUrl, setSelectedAppUrl] = useState();
  const {
    currentData: data,
    isFetching: isLoadingMessage,
    isError: isMessageError,
    refetch,
  } = useGetMessageQuery(
    { panelName: selectedAppUrl },
    { skip: !selectedAppUrl, refetchOnMountOrArgChange: true }
  );
  const messageLoadFailed = isMessageError || data?.status === false;
  const messageDisabled = !selectedAppUrl || isLoadingMessage || messageLoadFailed || !data || isSaving;
  const appOptions = Array.isArray(appDetails?.data)
    ? [...new Set(appDetails.data.map((app) => app.appUrl).filter(Boolean))].map(
        (appUrl) => ({ label: appUrl, value: appUrl })
      )
    : [];
  const appLoadFailed = isAppError || appDetails?.status === false;

  useEffect(() => {
    setMsg(selectedAppUrl && !messageLoadFailed ? data?.data ?? "" : "");
  }, [data, selectedAppUrl, messageLoadFailed]);

  const handleSave = async () => {
    if (messageDisabled) return;

    try {
      const result = await setMessageApi({
        message: msg,
        panelName: selectedAppUrl,
      }).unwrap();
      if (result?.status === false) {
        AntMessage.error(result.message || "Failed to update message.");
        return;
      }
      AntMessage.success("Message updated successfully!");
    } catch (err) {
      AntMessage.error("Failed to update message.");
    }
  };

  return (
    <Card
      className="sport_detail"
      title="Set Message"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row style={{ padding: "10px 12px" }}>
        <Col lg={12} xs={24}>
          <div style={{ marginBottom: "12px" }}>
            <label
              htmlFor="message-app-url"
              style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
              App URL:
            </label>
            <Select
              id="message-app-url"
              style={{ width: "100%" }}
              placeholder="Select App URL"
              value={selectedAppUrl}
              onChange={(appUrl) => {
                setSelectedAppUrl(appUrl);
                setMsg("");
              }}
              options={appOptions}
              loading={isLoadingApps}
              disabled={isLoadingApps || appLoadFailed || isSaving}
              showSearch
              allowClear
              optionFilterProp="label"
              notFoundContent="No app URLs available"
            />
            {appLoadFailed && (
              <div role="alert" style={{ color: "#ff4d4f", marginTop: "4px" }}>
                Failed to load app URLs.
              </div>
            )}
          </div>
          <div
            style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            Set Message:
          </div>
          <TextArea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            placeholder="Enter Message.."
            disabled={messageDisabled}
          />
          {selectedAppUrl && messageLoadFailed && (
            <div role="alert" style={{ color: "#ff4d4f", marginTop: "4px" }}>
              Failed to load the message for this panel.
              <Button type="link" onClick={refetch} loading={isLoadingMessage}>
                Retry
              </Button>
            </div>
          )}
          <Button
            style={{ marginTop: "12px" }}
            type="primary"
            onClick={handleSave}
            disabled={messageDisabled}
            loading={isSaving}>
            Set Message
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default SetMessage;
