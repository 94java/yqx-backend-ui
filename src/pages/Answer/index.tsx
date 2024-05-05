import { EditableProTable, PageContainer } from "@ant-design/pro-components";
import "@umijs/max";
import { Button, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@umijs/max";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { add, deleteByIds, list, update } from "@/services/answer/api";

const Answer: React.FC = () => {
  const navigate = useNavigate();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [answerList, setAnswerList] = useState([]);

  const [subjectId, setSubjectId] = useState("");

  // 生命周期函数：初始化时，如果携带了id参数
  useEffect(() => {
    // 读取id
    const params = new URLSearchParams(location.search);
    const subjectId = params.get("subjectId") as string;
    setSubjectId(subjectId);
    // 获取初始数据
    list({
      subjectId,
    }).then((resp) => {
      let { data } = resp;
      setAnswerList(data);
    });
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "选项图片",
      dataIndex: "contentImg",
      width: "15%",
      valueType: "image",
      fieldProps: {
        height: 80,
        width: 150,
      },
      renderFormItem: (text, { record }) => {
        return (
          <Upload
            name="file"
            action={"/api/file/upload"}
            maxCount={1}
            defaultFileList={
              record.contentImg
                ? [
                    {
                      uid: "1",
                      name: record.contentImg,
                      url: record.contentImg,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        );
      },
    },
    {
      title: "是否正确",
      key: "isRight",
      dataIndex: "isRight",
      valueType: "select",
      width: "20%",
      valueEnum: {
        "1": { text: "正确", status: "Success" },
        "0": { text: "错误", status: "Error" },
      },
      initialValue: "0",
    },
    {
      title: "选项内容",
      dataIndex: "content",
      width: "50%",
      renderFormItem: () => {
        return <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />;
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            record.isUpdate = true;
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer
      extra={[
        <Button size="large" key="1" onClick={() => navigate(-1)}>
          返回
        </Button>,
      ]}
    >
      <EditableProTable
        rowKey="id"
        toolBarRender={false}
        columns={columns}
        value={answerList}
        onChange={setAnswerList as any}
        recordCreatorProps={{
          position: "bottom",
          record: () => ({
            id: Date.now(),
            isUpdate: false,
          }),
        }}
        editable={{
          type: "single",
          editableKeys,
          onChange: setEditableRowKeys,
          onValuesChange: (record, recordList) => {
            setAnswerList(recordList as any);
          },
          onSave: async (_, row) => {
            row.subjectId = subjectId;

            row.contentImg = row.contentImg
              ? row.contentImg.file?.response?.data
              : "";

            if (row.isUpdate) {
              // 更新操作
              const resp = await update(row as any);
              if (resp.code === 0) {
                message.success("修改成功");
              }
            } else {
              // 新增操作
              const resp = await add(row as any);
              if (resp.code === 0) {
                message.success("保存成功");
              }
            }
          },
          onDelete: async (_, row) => {
            console.log("delete", row);
            let resp = await deleteByIds({ ids: [+row.id] });
            if (resp.code === 0) {
              message.success("删除成功");
            }
          },
        }}
      />
    </PageContainer>
  );
};
export default Answer;
