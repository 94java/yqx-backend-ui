import { add, update } from "@/services/subject/api";
import { list } from "@/services/questionBank/api";
import {
  DrawerForm,
  ProFormUploadButton,
  ProFormTextArea,
  ProFormSelect,
  ProFormText,
  ProFormSwitch,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

export default (prop: any) => {
  const [form] = Form.useForm<CATEGORY.CategoryAdd>();
  return (
    <DrawerForm<SUBJECT.SubjectAdd>
      title={prop.title}
      trigger={prop.trigger}
      form={form}
      autoFocusFirstInput
      isKeyPressSubmit
      width={380}
      {...prop}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("cancel"),
      }}
      onFinish={async (values: SUBJECT.SubjectAdd | SUBJECT.SubjectUpdate) => {
        if (values.contentImg) {
          values.contentImg = values.contentImg[0]?.response?.data;
        }
        values.status = values.status ? "1" : "0";
        if ((values as SUBJECT.SubjectItem).id) {
          let resp = await update(values as SUBJECT.SubjectUpdate);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values as SUBJECT.SubjectAdd);
          if (resp.code === 0) {
            prop.tableRef?.current?.reload();
            message.success("提交成功");
          }
        }
        return true;
      }}
    >
      <ProFormTextArea
        width="md"
        name="content"
        label="题目内容"
        placeholder="请输入题目内容"
        fieldProps={{
          autoSize: { minRows: 3, maxRows: 5 },
          showCount: true,
        }}
        rules={[{ required: true, message: "请输入题目内容" }]}
      />
      <ProFormUploadButton
        width="md"
        name="contentImg"
        label="内容图片"
        max={1}
        action="http://localhost:8866/api/file/upload"
      />
      <ProFormText name="id" label="id" hidden />
      <ProFormSelect
        name="bankId"
        width="md"
        label="所属题库"
        placeholder="请选择题库"
        request={async () => {
          // 查询所有笔记的分类信息
          let { data } = await list({});
          const bankList = data.map((item: QUESTIONBANK.QuestionBankItem) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
          return bankList;
        }}
        rules={[{ required: true, message: "请选择题库信息" }]}
      />
      <ProFormSelect
        valueEnum={{
          "0": { text: "单选" },
          "1": { text: "多选" },
          "2": { text: "填空" },
        }}
        initialValue={"0"}
        width="md"
        name="type"
        label="题目类型"
        rules={[{ required: true, message: "请选择题目类型" }]}
      />
      <ProFormSelect
        valueEnum={{
          "0": { text: "简单" },
          "1": { text: "一般" },
          "2": { text: "困难" },
        }}
        initialValue={"0"}
        width="md"
        name="difficulty"
        label="题目难度"
      />
      <ProFormSwitch
        width="md"
        name="status"
        label="状态"
        checkedChildren="启用"
        unCheckedChildren="停用"
        initialValue={true}
        fieldProps={{
          value: true,
        }}
      />
      <ProFormTextArea
        width="md"
        name="analysis"
        label="题目解析"
        placeholder="请输入题目解析"
        fieldProps={{
          autoSize: { minRows: 6, maxRows: 6 },
          showCount: true,
        }}
      />
    </DrawerForm>
  );
};
