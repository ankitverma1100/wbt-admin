/* eslint-disable react/prop-types */
import { Form, Row, Col, Select } from "antd";

const FilterBets = ({
  form,
  onFinish,
  clientId,
  onClientChange,
  currentUserType,
  selectedMini,
  setSelectedMini,
  selectedMaster,
  setSelectedMaster,
  selectedSuper,
  setSelectedSuper,
  selectedAgent,
  setSelectedAgent,
  miniOptions,
  masterOptions,
  superOptions,
  agentOptions,
  clientOptions,
  oddsType,
  setOddsType,
  handleReset,
}) => {
  const showMini = currentUserType > 6;
  const showMaster = currentUserType > 5;
  const showSuper = currentUserType > 4;
  const showAgent = currentUserType > 3;
  const showClient = currentUserType > 2;

  return (
    <div className="filter-bets-section">
      <div className="section-header">Filter Bets</div>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="form_data">
        <Row className="fancy_data_sess mr">
          {showMini && (
            <Col xs={24} md={12} lg={6} xl={6}>
              <Form.Item name="mini" label="Mini*">
                <Select
                  placeholder="Select Mini"
                  value={selectedMini}
                  onChange={(value) => setSelectedMini(value)}
                  options={miniOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
          )}
          {showMaster && (
            <Col xs={24} md={12} lg={6} xl={6}>
              <Form.Item name="master" label="Master*">
                <Select
                  placeholder="Select Master"
                  value={selectedMaster}
                  onChange={(value) => setSelectedMaster(value)}
                  options={masterOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
          )}
          {showSuper && (
            <Col xs={24} md={12} lg={6} xl={6}>
              <Form.Item name="super" label="Super*">
                <Select
                  placeholder="Select Super"
                  value={selectedSuper}
                  onChange={(value) => setSelectedSuper(value)}
                  options={superOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
          )}
          {showAgent && (
            <Col xs={24} md={12} lg={6} xl={6}>
              <Form.Item name="agent" label="Agent*">
                <Select
                  placeholder="Select Agent"
                  value={selectedAgent}
                  onChange={(value) => setSelectedAgent(value)}
                  options={agentOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
          )}
          {showClient && (
            <Col xs={24} md={12} lg={6} xl={6}>
              <Form.Item
                name="username"
                label="Client*"
                required={false}
                rules={[{ required: true, message: "Please Select User" }]}>
                <Select
                  placeholder="Select User"
                  showSearch
                  value={clientId}
                  allowClear
                  onChange={(value) =>
                    onClientChange?.(value === "ALL" ? "" : value || "")
                  }
                  options={[{ label: "All User", value: "ALL" }, ...clientOptions]}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={12} lg={6} xl={6}>
            <Form.Item name="oddType" label="Odds Type">
              <Select
                placeholder="Select Market"
                value={oddsType}
                options={[
                  {
                    value: "Bookmaker",
                    label: "bookmaker",
                  },
                ]}
                showSearch
                allowClear
                onSelect={(value) => setOddsType(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6} xl={6} className="filter-reset-col">
            <button
              type="button"
              className="filter-reset-btn"
              onClick={handleReset}>
              Reset
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterBets;
