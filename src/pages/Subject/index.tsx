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
} from "@/services/subject/api";
import AddModal from "./Modal";
import { list } from "@/services/questionBank/api";
import { history } from "@umijs/max";


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
    title: "题目内容",
    width: 150,
    dataIndex: "content",
    ellipsis: true,
    key: "content",
    hideInSearch: true,
  },
  {
    title: "题目图片",
    width: 145,
    dataIndex: "contentImg",
    key: "contentImg",
    valueType: "image",
    fieldProps: {
      height: 80,
      width: 120,
    },
    hideInSearch: true,
  },
  {
    title: "题目类型",
    width: 120,
    ellipsis: true,
    key: "type",
    dataIndex: "type",
    valueEnum: {
      "0": { text: "单选" },
      "1": { text: "多选" },
      "2": { text: "填空" },
    },
  },
  {
    title: "题目难度",
    width: 120,
    ellipsis: true,
    key: "difficulty",
    dataIndex: "difficulty",
    valueEnum: {
      "0": { text: "简单" },
      "1": { text: "一般" },
      "2": { text: "困难" },
    },
  },
  {
    title: "所属题库",
    width: 120,
    ellipsis: true,
    key: "bankId",
    dataIndex: "bankId",
    request: async () => {
      // 查询所有笔记的分类信息
      let { data } = await list({});
      const bankList = data.map((item: QUESTIONBANK.QuestionBankItem) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return bankList;
    },
    render: (_, record) => <>{record.questionBank?.name}</>,
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    key: "status",
    valueEnum: {
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
    ellipsis: true,
    key: "createBy",
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
    title: "操作",
    valueType: "option",
    key: "option",
    fixed: "right",
    width: 150,
    render: (text, record, _, action) => [
      <a
        rel="noopener noreferrer"
        key="config"
        // to={"/question-bank/question/answer?id=" + record.id}
        onClick={() => {
          history.push("/question-bank/question/answer?subjectId=" + record.id);
        }}
      >
        配置选项
      </a>,
      <AddModal
        key="edit"
        title="编辑题目"
        flush={() => {
          action?.reload();
        }}
        request={async () => {
          let { data } = await getById(record.id);
          data.contentImg = data.contentImg
            ? [{ thumbUrl: data.contentImg, name: data.contentImg }]
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
        headerTitle="题目列表"
        toolBarRender={() => [
          <AddModal
            key="add"
            title="添加题目"
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
    </PageContainer>
  );
};
