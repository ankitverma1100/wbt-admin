import { Col, Row } from "antd";

const DashboardCard = ({ icon, title, desc, onClick }) => (
  <Col xs={12} sm={12} md={12} lg={12} xl={6} className="colo_name" onClick={onClick}>
    <div>
      <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
        <div className="ant-card-body">
          <div className="gx-fillchart gx-overlay-fillchart gx-bg-transparent">
            <div
              className="gx-media gx-align-items-center gx-pointer gx-flex-nowrap gx-fillchart-content"
              style={{ borderRadius: 20 }}>
              <div className="gx-mr-1 gx-mr-xl-3">{icon ? icon : <></>}</div>
              <div className="gx-media-body">
                <h1
                  className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white"
                  style={{ fontSize: "12px" }}>
                  {title}
                </h1>
                {desc && <p className="gx-mb-0">{desc}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Col>
);

const DashboardCardSection = ({ items }) => (
  <Row className="gx-pb-10">
    {items.map((item, index) => (
      <DashboardCard
        key={index}
        icon={item.icon}
        title={item.title}
        desc={item.desc}
        onClick={item.onClick}
      />
    ))}
  </Row>
);

export { DashboardCard, DashboardCardSection };
