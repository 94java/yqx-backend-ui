import { PageContainer } from "@ant-design/pro-components";
import "@umijs/max";
import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
const Admin: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Admin;
