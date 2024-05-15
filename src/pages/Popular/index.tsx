import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Table, message, Modal } from "antd";
import { useRef, useState } from "react";
import { deleteByIds, page } from "@/services/popular/api";

const { confirm } = Modal;
const columns: ProColumns<POPULAR.PopularItem>[] = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
    hidden: true,
    search: false,
    key: "id",
  },
  {
    title: "发布用户",
    width: 100,
    ellipsis: true,
    key: "create_by",
    dataIndex: "create_by",
    hideInSearch: true,
    render: (_, record) => <>{record.user?.nickname}</>,
  },
  {
    title: "动态内容",
    width: 230,
    ellipsis: true,
    key: "content",
    hideInSearch: true,
    dataIndex: "content",
  },
  {
    title: "发布时间",
    width: 140,
    key: "showTime",
    dataIndex: "createTime",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    fixed: "right",
    width: 80,
    render: (text, record, _, action) => [
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
        search={false}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="动态列表"
        toolBarRender={() => [
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
