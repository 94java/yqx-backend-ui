import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Table, Tag, message, Modal } from "antd";
import { useRef, useState } from "react";
import {
  changeStatus,
  deleteByIds,
  getById,
  page,
  update,
} from "@/services/user/api";
import AddModal from "./Modal";
import { ModalForm, ProFormSelect } from "@ant-design/pro-components";
import { list } from "@/services/role/api";
const { confirm } = Modal;

type UserItem = {
  id: string;
  username?: string;
  nickname?: string;
  age?: number;
  sex?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  sign?: string;
  status?: string;
  role?: string;
  province?: string;
  city?: string;
  visitorCount?: number;
  lastLoginTime?: Date;
  lastLoginIp?: string;
  createBy?: string;
  createTime?: Date;
  updateBy?: string;
  updateTime?: Date;
};

const columns: ProColumns<UserItem>[] = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
    hidden: true,
    search: false,
    key: "id",
  },
  {
    title: "用户名",
    width: 120,
    dataIndex: "username",
    ellipsis: true,
    key: "username",
  },
  {
    title: "头像",
    dataIndex: "avatar",
    width: 80,
    key: "image",
    valueType: "image",
    search: false,
  },
  {
    title: "昵称",
    width: 120,
    ellipsis: true,
    key: "nickname",
    dataIndex: "nickname",
  },
  {
    title: "角色",
    width: 120,
    ellipsis: true,
    key: "role",
    dataIndex: "role",
  },
  {
    title: "性别",
    width: 80,
    dataIndex: "sex",
    key: "sex",
    valueEnum: {
      "": { text: "全部" },
      "1": { text: "男" },
      "0": { text: "女" },
    },
    search: false,
  },
  {
    title: "年龄",
    width: 80,
    dataIndex: "age",
    search: false,
    key: "age",
  },
  {
    title: "邮箱",
    width: 120,
    ellipsis: true,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    key: "status",
    valueEnum: {
      "": { text: "全部" },
      "1": { text: "正常" },
      "0": { text: "禁用" },
    },
    render: (_, record) => (
      <Tag color={record.status === "1" ? "green" : "red"}>
        {record.status === "1" ? "正常" : "禁用"}
      </Tag>
    ),
  },
  {
    title: "最后登录时间",
    width: 155,
    key: "showLastLoginTime",
    dataIndex: "lastLoginTime",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "最后登录时间",
    width: 100,
    dataIndex: "lastLoginTime",
    valueType: "dateRange",
    hideInTable: true,
    key: "searchLastLoginTime",
    search: {
      transform: (value) => {
        return {
          lastLoginTime: value,
        };
      },
    },
  },
  {
    title: "最后登录ip",
    width: 155,
    dataIndex: "lastLoginIp",
    search: false,
    key: "lastLoginIp",
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
    width: 150,
    render: (text, record, _, action) => [
      <ModalForm<{
        name: string;
        company: string;
      }>
        key="1"
        trigger={
          <a rel="noopener noreferrer" key="delete" onClick={() => {}}>
            分配角色
          </a>
        }
        autoFocusFirstInput
        width={350}
        submitTimeout={2000}
        onFinish={async (values) => {
          update({ id: record.id, ...values }).then((resp) => {
            if (resp.code === 0) {
              // 修改成功
              message.success("修改成功");
              action?.reload();
            }
          });
          return true;
        }}
      >
        <ProFormSelect
          name="role"
          width="md"
          label="用户角色"
          placeholder="请选择用户角色"
          initialValue={record.role}
          request={async () => {
            // 查询所有用户角色信息
            let { data } = await list({});
            const roleList = data.map((item: ROLE.RoleItem) => {
              return {
                label: item.name,
                value: item.roleTag,
              };
            });
            return roleList;
          }}
        />
      </ModalForm>,
      <AddModal
        key="edit"
        title="编辑用户"
        flush={() => {
          action?.reload();
        }}
        request={async () => {
          let { data } = await getById({
            id: record.id,
          });
          data.avatar = data.avatar
            ? [{ thumbUrl: data.avatar, name: data.avatar }]
            : [];
          data.status = data.status === "0" ? false : true;
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
    <PageContainer>
      <ProTable<UserItem>
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
        headerTitle="用户列表"
        toolBarRender={() => [
          <AddModal
            key="add"
            title="添加用户"
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
                  label: "禁用",
                  key: "1",
                  disabled: selectedRowKeys.length === 0 ? true : false,
                  onClick: async () => {
                    confirm({
                      title: "提示",
                      content: "确定禁用所选项吗？",
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
                          message.success("禁用成功");
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
    </PageContainer>
  );
};
