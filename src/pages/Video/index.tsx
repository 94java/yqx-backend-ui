import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Table, Tag, message, Modal } from "antd";
import { useRef, useState } from "react";
import { changeStatus, deleteByIds, getById, page } from "@/services/video/api";
import AddModal from "./Modal";
import { useModel } from "@umijs/max";

const { confirm } = Modal;

const columns: ProColumns<VIDEO.VideoItem>[] = [
  {
    title: "封面图",
    width: 145,
    dataIndex: "coverImg",
    key: "coverImg",
    valueType: "image",
    fieldProps: {
      height: 80,
      width: 120,
    },
    hideInSearch: true,
  },
  {
    title: "id",
    dataIndex: "id",
    width: 80,
    hidden: true,
    search: false,
    key: "id",
  },
  {
    title: "标题",
    width: 120,
    dataIndex: "title",
    ellipsis: true,
    key: "title",
    render: (_, record) => (
      <Button type="link" href={record.url} target="_blank">
        {record.title}
      </Button>
    ),
  },
  {
    title: "简介",
    width: 120,
    dataIndex: "summary",
    ellipsis: true,
    key: "summary",
    hideInSearch: true,
  },
  // {
  //   title: "视频链接",
  //   width: 120,
  //   dataIndex: "url",
  //   ellipsis: true,
  //   key: "url",
  //   hideInSearch: true,
  // },
  {
    title: "类型",
    width: 120,
    ellipsis: true,
    key: "type",
    dataIndex: "type",
    valueEnum: {
      "": { text: "全部" },
      "0": { text: "原创" },
      "1": { text: "搬运" },
      "2": { text: "剪辑" },
      "3": { text: "翻拍" },
    },
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    key: "status",
    valueEnum: {
      "": { text: "全部" },
      "1": { text: "已发布" },
      "0": { text: "待审核" },
    },
    render: (_, record) => (
      <Tag color={record.status === "1" ? "green" : "red"}>
        {record.status === "1" ? "已发布" : "待审核"}
      </Tag>
    ),
  },
  {
    title: "分类",
    width: 120,
    dataIndex: "categoryId",
    ellipsis: true,
    key: "categoryId",
    hideInSearch: true,
    render: (_, record) => <>{record.category?.name}</>,
  },
  {
    title: "作者",
    width: 120,
    dataIndex: "userId",
    ellipsis: true,
    key: "userId",
    hideInSearch: true,
    render: (_, record) => <>{record.user?.nickname}</>,
  },
  {
    title: "播放量",
    width: 120,
    dataIndex: "views",
    key: "views",
    hideInSearch: true,
  },
  {
    title: "点赞量",
    width: 120,
    dataIndex: "likes",
    key: "likes",
    hideInSearch: true,
  },
  {
    title: "创建时间",
    width: 155,
    key: "showTime",
    dataIndex: "createTime",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "修改时间",
    width: 155,
    key: "updateTime",
    dataIndex: "updateTime",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    fixed: "right",
    width: 100,
    render: (text, record, _, action) => [
      <AddModal
        key="edit"
        title="编辑视频"
        flush={() => {
          action?.reload();
        }}
        request={async () => {
          let { data } = await getById(record.id as string);
          data.coverImg = data.coverImg
            ? [{ thumbUrl: data.coverImg, name: data.coverImg }]
            : [];
          data.url = data.url ? [{ thumbUrl: data.url, name: data.url }] : [];
          return data;
        }}
        trigger={<a>编辑</a>}
      />,
      <Popconfirm
        title="你确认删除此条记录吗？"
        onConfirm={async () => {
          let res = await deleteByIds({ ids: [+record.id] });
          if (res.code === 0) {
            message.success("删除成功");
            action?.reload();
          } else {
            message.error(res.message);
          }
        }}
        onCancel={() => {
          console.log("取消");
        }}
        key="delete"
      >
        <a rel="noopener noreferrer" key="delete">
          删除
        </a>
      </Popconfirm>,
    ],
  },
];

export default () => {
  const actionRef: any = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    initialState: { currentUser },
  } = useModel("@@initialState");
  return (
    <PageContainer>
      <ProTable<CATEGORY.CategoryItem>
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        scroll={{ x: 1200 }}
        request={async (params, sort, filter) => {
          let res = await page({
            ...params,
            pageNum: params.current,
          });
          return {
            data: res.data.list,
            success: true,
            total: res.data.total,
          };
        }}
        search={{
          labelWidth: "auto",
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="视频列表"
        toolBarRender={() => [
          <AddModal
            key="add"
            title="添加视频"
            tableRef={actionRef}
            trigger={
              <Button key="button" icon={<PlusOutlined />} type="primary">
                新建
              </Button>
            }
          />,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "审核不通过",
                  key: "1",
                  disabled: selectedRowKeys.length === 0 ? true : false,
                  onClick: async () => {
                    confirm({
                      title: "提示",
                      content: "确定设置所选项为审核不通过吗？",
                      icon: <ExclamationCircleOutlined />,
                      okText: "确定",
                      okType: "danger",
                      cancelText: "取消",
                      onOk: async () => {
                        let resp = await changeStatus({
                          ids: selectedRowKeys,
                          status: "0",
                        });
                        if (resp.code === 0) {
                          message.success("设置成功");
                          actionRef.current.reload();
                        }
                      },
                      onCancel() {},
                    });
                  },
                },
                {
                  label: "审核通过",
                  key: "2",
                  disabled: selectedRowKeys.length === 0 ? true : false,
                  onClick: async () => {
                    confirm({
                      title: "提示",
                      content: "确定设置所选项为审核通过吗？",
                      icon: <ExclamationCircleOutlined />,
                      okText: "确定",
                      okType: "danger",
                      cancelText: "取消",
                      onOk: async () => {
                        let resp = await changeStatus({
                          ids: selectedRowKeys,
                          status: "1",
                        });
                        if (resp.code === 0) {
                          message.success("设置成功");
                          actionRef.current.reload();
                        }
                      },
                      onCancel() {},
                    });
                  },
                },
                {
                  label: "删除",
                  key: "3",
                  disabled: selectedRowKeys.length === 0 ? true : false,
                  onClick: async () => {
                    confirm({
                      title: "提示",
                      content: "确定删除所选项吗？",
                      icon: <ExclamationCircleOutlined />,
                      okText: "确定",
                      okType: "danger",
                      cancelText: "取消",
                      onOk: async () => {
                        let resp = await deleteByIds({
                          ids: selectedRowKeys,
                        });
                        if (resp.code === 0) {
                          message.success("删除成功");
                          actionRef.current.reload();
                        }
                      },
                      onCancel() {},
                    });
                  },
                },
              ],
            }}
          >
            <Button key="more" hidden={currentUser.role !== "ADMIN"}>
              更多
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};
