import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import {
  Button,
  Dropdown,
  Popconfirm,
  Table,
  Tag,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
} from "antd";
import { useRef, useState } from "react";
import { changeStatus, deleteByIds, getById, page } from "@/services/note/api";
import { useNavigate,history } from "@umijs/max";

const { confirm } = Modal;
const columns: ProColumns<NOTE.NoteItem>[] = [
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
    title: "标题",
    width: 160,
    ellipsis: true,
    key: "title",
    dataIndex: "title",
    render: (_, record) => (
      <Button type="link" onClick={() => {
          history.push("/note/content?id=" + record.id);
        }}>
        {record.title}
      </Button>
    ),
  },
  {
    title: "类型",
    width: 80,
    key: "type",
    dataIndex: "type",
    valueEnum: {
      "": { text: "全部" },
      "1": { text: "转载" },
      "2": { text: "翻译" },
      "0": { text: "原创" },
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
      "2": { text: "草稿" },
      "0": { text: "待审核" },
    },
  },
  {
    title: "分类",
    width: 120,
    key: "category_id",
    dataIndex: "category_id",
    render: (_, record) => <>{record.category?.name}</>,
  },
  {
    title: "作者",
    width: 120,
    key: "user_id",
    dataIndex: "user_id",
    render: (_, record) => <>{record.user?.nickname}</>,
  },
  {
    title: "阅读量",
    width: 80,
    key: "views",
    dataIndex: "views",
    hideInSearch: true,
  },
  {
    title: "点赞量",
    width: 80,
    key: "likes",
    dataIndex: "likes",
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
    title: "修改时间",
    width: 155,
    key: "updateTime",
    dataIndex: "updateTime",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "修改时间",
    width: 100,
    dataIndex: "updateTime",
    valueType: "dateRange",
    hideInTable: true,
    key: "updateTime",
    search: {
      transform: (value) => {
        return {
          updateTime: value,
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
      <a
        key="settings"
        onClick={() => {
          history.push("/note/content?id=" + record.id);
        }}
      >
        编辑
      </a>,
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
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [statusModal, setStatusModal] = useState(false);
  const [statusChange, setStatusChange] = useState("0");
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
        headerTitle="笔记列表"
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              navigate("/note/content");
            }}
          >
            发布文章
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "状态",
                  key: "1",
                  disabled: selectedRowKeys.length === 0 ? true : false,
                  onClick: async () => {
                    setStatusModal(true);
                  },
                },
                {
                  label: "删除",
                  key: "2",
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
          <Modal
            key="modal"
            title="状态修改"
            open={statusModal}
            onCancel={() => {
              setStatusModal(false);
            }}
            maskClosable
            footer={(_, { OkBtn }) => {
              return <OkBtn />;
            }}
            onOk={async () => {
              // 提交修改后的状态
              console.log(selectedRowKeys);
              let req = {
                ids: selectedRowKeys,
                status: statusChange,
              };
              const resp = await changeStatus(req as any);
              if (resp.code === 0) {
                message.success("修改成功");
                setStatusModal(false);
                actionRef.current.reload();
              }
            }}
          >
            <Radio.Group
              style={{ marginTop: "10px", margin: "auto" }}
              options={[
                { label: "待审核", value: "0" },
                { label: "草稿", value: "2" },
                { label: "已发布", value: "1" },
              ]}
              onChange={({ target: { value } }: RadioChangeEvent) => {
                setStatusChange(value);
              }}
              value={statusChange}
              optionType="button"
              buttonStyle="solid"
            />
          </Modal>,
        ]}
      />
    </PageContainer>
  );
};
