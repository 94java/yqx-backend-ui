import { PageContainer } from "@ant-design/pro-components";
import "@umijs/max";
import { Avatar, Card, Col, List, Row, Statistic, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  SmileOutlined,
  VideoCameraOutlined,
  UngroupOutlined,
  CommentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import ReactECharts from "echarts-for-react";

import "./index.less";
import { getStatistics } from "@/services/user/api";
import { list } from "@/services/notice/api";
const Dashboard: React.FC = () => {
  const [statistics, setStatistics] = useState({});
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    getStatistics().then((resp) => {
      setStatistics(resp.data);
    });
    // 获取公告信息
    list({}).then((resp) => {
      setNoticeList(resp.data);
    });
  }, []);
  // 返回折线图的配置对象
  const fansLineData = statistics.fansLineData;

  const dateList = fansLineData?.map((item) => {
    return item["createTime"];
  });
  const valueList = fansLineData?.map((item) => {
    return Number.parseInt(item["fansCount"]);
  });
  const max = Math.max.apply(null, valueList);
  const min = Math.min.apply(null, valueList);
  // 折线图配置
  const lineOption = {
    visualMap: {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min,
      max,
    },
    title: [
      {
        left: "center",
        text: "粉丝增长曲线图",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 设置类别轴
      data: dateList,
    },
    yAxis: {},
    series: [
      {
        type: "line",
        showSymbol: true,
        data: valueList,
      },
    ],
  };
  // 饼图配置
  let pieOption = {
    title: {
      text: "数据统计",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: 0,
      bottom: 0,
    },
    series: [
      {
        name: "数据统计",
        type: "pie",
        radius: "50%",
        data: [
          { value: statistics.viewCount, name: "浏览总数" },
          { value: statistics.likesCount, name: "点赞总数" },
          { value: statistics.commentCount, name: "评论总数" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="dashboard">
      <PageContainer>
        {/* 基本信息 */}
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="粉丝数"
                value={statistics.fansCount}
                valueStyle={{ color: "#3f8600" }}
                prefix={<SmileOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="笔记数"
                value={statistics.noteCount}
                valueStyle={{ color: "#1677ff" }}
                prefix={<UngroupOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="视频数"
                value={statistics.videoCount}
                valueStyle={{ color: "#36cfc9" }}
                prefix={<VideoCameraOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="动态数"
                value={statistics.popularCount}
                valueStyle={{ color: "#ff7a45" }}
                prefix={<CommentOutlined />}
              />
            </Card>
          </Col>
        </Row>
        {/* 图表区 */}
        <div className="charts">
          {/* 内容数饼图 */}
          <div className="pie">
            <ReactECharts option={pieOption} />
          </div>
          {/* 折线图 */}
          <div className="line">
            <ReactECharts option={lineOption} />
          </div>
        </div>
        {/* 公告区 */}
        <div className="notice">
          <div className="title">最新公告</div>
          <List
            itemLayout="horizontal"
            dataSource={noticeList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-more"
                    onClick={() => {
                      notification.open({
                        icon: <InfoCircleOutlined />,
                        message: item.title,
                        description: item.content,
                        placement: "topRight",
                        maxCount: 3,
                      });
                    }}
                  >
                    more
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.user?.avatar} />}
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      </PageContainer>
    </div>
  );
};
export default Dashboard;
