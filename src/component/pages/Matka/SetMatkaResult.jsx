import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, InputNumber, Modal, Row, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetMatkaListQuery,
  useSetMatkaResultMutation,
} from "../../../store/service/MatkaServices";

const marketTypes = [
  { value: "JODI", label: "Jodi", min: 0, max: 99 },
  { value: "HARUP_ANDAR", label: "Harup Andar", min: 0, max: 9 },
  { value: "HARUP_BAHAR", label: "Harup Bahar", min: 0, max: 9 },
];

const generateConfirmNumbers = (originalNumber, min, max) => {
  const numbers = [originalNumber];
  const offsets = [2, 4, -3, -1, 3];

  offsets.forEach((offset) => {
    let newNum = originalNumber + offset;
    if (newNum < min) newNum = min + Math.abs(offset);
    if (newNum > max) newNum = max - Math.abs(offset);
    if (!numbers.includes(newNum) && newNum >= min && newNum <= max) {
      numbers.push(newNum);
    }
  });

  while (numbers.length < 6) {
    const randomOffset = Math.floor(Math.random() * 10) - 5;
    let newNum = originalNumber + randomOffset;

    if (newNum < min) newNum = min;
    if (newNum > max) newNum = max;

    if (!numbers.includes(newNum)) {
      numbers.push(newNum);
    }
  }

  return numbers.sort(() => Math.random() - 0.5).slice(0, 6);
};

const SetMatkaResult = () => {
  const nav = useNavigate();
  const userType = localStorage.getItem("userType");

  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [result, setResult] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmNumbers, setConfirmNumbers] = useState([]);

  const {
    data: listData,
    isLoading: listLoading,
    isFetching: listFetching,
    error: listError,
  } = useGetMatkaListQuery({}, { refetchOnMountOrArgChange: true });

  const [setMatkaResult, { isLoading: submitLoading }] =
    useSetMatkaResultMutation();

  useEffect(() => {
    if (userType !== "7") {
      nav("/dashboard");
    }
  }, [userType, nav]);

  const matches = Array.isArray(listData?.data) ? listData.data : [];
  const selectedMarketType = marketTypes.find(
    (market) => market.value === selectedMarket
  );

  const errorMessage =
    (listData?.status === false && listData?.message) ||
    listError?.data?.message;

  const handleSubmit = () => {
    if (!selectedMatch || !selectedMarket || result === null) {
      message.error("Please fill in all fields");
      return;
    }

    const resultNum = Number(result);
    const confirmNums = generateConfirmNumbers(
      resultNum,
      selectedMarketType?.min ?? 0,
      selectedMarketType?.max ?? 99
    );
    setConfirmNumbers(confirmNums);
    setConfirmOpen(true);
  };

  const handleConfirmNumber = async (selectedNum) => {
    const resultNum = Number(result);

    if (selectedNum !== resultNum) {
      message.error("You selected the wrong number. Please try again.");
      setConfirmOpen(false);
      setConfirmNumbers([]);
      return;
    }

    try {
      const payload = {
        matkaId: String(selectedMatch),
        marketId: selectedMarket,
        result: String(resultNum),
      };

      const res = await setMatkaResult(payload).unwrap();
      if (!res?.status) {
        throw new Error(res?.message || "Failed to save result");
      }

      message.success("Result saved successfully!");
      setSelectedMatch("");
      setSelectedMarket("");
      setResult(null);
    } catch (error) {
      message.error(error?.message || "Failed to save result");
    } finally {
      setConfirmOpen(false);
      setConfirmNumbers([]);
    }
  };

  const matchOptions = useMemo(
    () =>
      matches.map((match) => ({
        label: match.name,
        value: match.id,
      })),
    [matches]
  );

  return (
    <div className="match_slip">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title="SET MATKA RESULT"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div style={{ padding: "16px" }}>
          {errorMessage && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px 12px",
                background: "#fff1f0",
                color: "#cf1322",
                border: "1px solid #ffa39e",
                borderRadius: "6px",
              }}>
              {errorMessage}
            </div>
          )}

          <Row gutter={[16, 16]} align="bottom">
            <Col xs={24} md={6}>
              <label style={{ display: "block", marginBottom: "6px" }}>
                Select Match Type
              </label>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Market"
                loading={listLoading || listFetching}
                value={selectedMatch || undefined}
                onChange={(value) => {
                  setSelectedMatch(value);
                  setSelectedMarket("");
                  setResult(null);
                }}
                options={matchOptions}
              />
            </Col>
            <Col xs={24} md={6}>
              <label style={{ display: "block", marginBottom: "6px" }}>
                Select Market Type
              </label>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Market Type"
                value={selectedMarket || undefined}
                onChange={(value) => {
                  setSelectedMarket(value);
                  setResult(null);
                }}
                disabled={!selectedMatch}
                options={marketTypes.map((market) => ({
                  label: market.label,
                  value: market.value,
                }))}
              />
            </Col>
            <Col xs={24} md={6}>
              <label style={{ display: "block", marginBottom: "6px" }}>
                Result
              </label>
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter Result"
                min={selectedMarketType?.min ?? 0}
                max={selectedMarketType?.max ?? 99}
                value={result}
                onChange={(value) => {
                  if (value === null || value === undefined) {
                    setResult(null);
                    return;
                  }
                  const numericValue = Number(value);
                  if (
                    numericValue >= (selectedMarketType?.min ?? 0) &&
                    numericValue <= (selectedMarketType?.max ?? 99)
                  ) {
                    setResult(numericValue);
                  }
                }}
                disabled={!selectedMarket}
              />
            </Col>
            <Col xs={24} md={6}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                disabled={!selectedMatch || !selectedMarket || result === null}
                loading={submitLoading}
                onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      <Modal
        open={confirmOpen}
        title="Confirm Result"
        onCancel={() => {
          setConfirmOpen(false);
          setConfirmNumbers([]);
        }}
        footer={null}
        centered>
        <p style={{ marginBottom: "16px" }}>
          Please click on the number you entered to confirm:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "12px",
          }}>
          {confirmNumbers.map((num) => (
            <Button
              key={num}
              type="primary"
              onClick={() => handleConfirmNumber(num)}
              style={{ height: "56px", fontSize: "18px", fontWeight: 700 }}>
              {String(num).padStart(2, "0")}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SetMatkaResult;
