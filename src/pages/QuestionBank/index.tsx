import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Table, Tag, message, Modal } from "antd";
import { useRef, useState } from "react";
import { changeStatus, deleteByIds, getById, page } from "@/services/questionBank/api";
import AddModal from "./Modal";

const { confirm } = Modal;


const columns: ProColumns<CATEGORY.CategoryItem>[] = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
    hidden: true,
    search: false,
    key: "id",
  },
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
    title: "题库名",
    width: 120,
    dataIndex: "name",
    ellipsis: true,
    key: "name",
  },
  {
    title: "题库难度",
    width: 120,
    ellipsis: true,
    key: "difficulty",
    dataIndex: "difficulty",
    valueEnum: {
      "": { text: "全部" },
      "0": { text: "简单" },
      "1": { text: "一般" },
      "2": { text: "困难" },
    },
  },
  {
    title: "分类",
    width: 120,
    dataIndex: "categoryId",
    ellipsis: true,
    key: "categoryId",
    render: (_, record) => <>{record.category?.name}</>,
  },
  {
    title: "浏览量",
    width: 120,
    dataIndex: "views",
    key: "views",
    hideInSearch:true
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    key: "status",
    valueEnum: {
      "": { text: "全部" },
      "1": { text: "正常" },
      "0": { text: "停用" },
    },
    render: (_, record) => (
      <Tag color={record.status === "1" ? "green" : "red"}>
        {record.status === "1" ? "正常" : "停用"}
      </Tag>
    ),
  },
  {
    title: "创建者",
    width: 120,
    dataIndex: "createBy",
    key: "createBy",
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
    title: "创建时间",
    width: 100,
    dataIndex: "createTime",
    valueType: "dateRange",
    hideInTable: true,
    key: "createTime",
    search: {
      transform: (value) => {
        return {
          createTime: value,
        };
      },
    },
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
        title="编辑题库"
        flush={() => {
          action?.reload();
        }}
        request={async () => {
          let { data } = await getById(record.id as string);
          data.status = data.status === "0" ? false : true;
          data.coverImg = data.coverImg
            ? [{ thumbUrl: data.coverImg, name: data.coverImg }]
            : [];
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
  return (
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
      headerTitle="题库列表"
      toolBarRender={() => [
        <AddModal
          key="add"
          title="添加题库"
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
                label: "停用",
                key: "1",
                disabled: selectedRowKeys.length === 0 ? true : false,
                onClick: async () => {
                  confirm({
                    title: "提示",
                    content: "确定停用所选项吗？",
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
                        message.success("停用成功");
                        actionRef.current.reload();
                      }
                    },
                    onCancel() {},
                  });
                },
              },
              {
                label: "启用",
                key: "2",
                disabled: selectedRowKeys.length === 0 ? true : false,
                onClick: async () => {
                  confirm({
                    title: "提示",
                    content: "确定启用所选项吗？",
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
                        message.success("启用成功");
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
          <Button key="more">更多</Button>
        </Dropdown>,
      ]}
    />
  );
};
