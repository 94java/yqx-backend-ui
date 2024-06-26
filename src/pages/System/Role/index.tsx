import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Table, message, Modal } from "antd";
import { useRef, useState } from "react";
import { deleteByIds, getById, page } from "@/services/role/api";
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
    title: "角色名",
    width: 120,
    dataIndex: "name",
    ellipsis: true,
    key: "name",
  },
  {
    title: "角色标识",
    width: 120,
    ellipsis: true,
    key: "roleTag",
    dataIndex: "roleTag",
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
        title="编辑分类"
        flush={() => {
          action?.reload();
        }}
        request={async () => {
          let { data } = await getById(record.id);
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
        headerTitle="分类列表"
        toolBarRender={() => [
          <AddModal
            key="add"
            title="添加分类"
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
                  label: "删除",
                  key: "1",
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
