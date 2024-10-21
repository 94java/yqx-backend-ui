import { list } from "@/services/category/api";
import { add, update } from "@/services/questionBank/api";
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
    <DrawerForm<CATEGORY.CategoryAdd>
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
      onFinish={async (
        values: QUESTIONBANK.QuestionBankAdd | QUESTIONBANK.QuestionBankUpdate
      ) => {
        if (values.coverImg) {
          values.coverImg = values.coverImg[0]?.response?.data;
        }
        values.status = values.status ? "1" : "0";
        if ((values as QUESTIONBANK.QuestionBankItem).id) {
          let resp = await update(values as QUESTIONBANK.QuestionBankUpdate);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values as QUESTIONBANK.QuestionBankAdd);
          if (resp.code === 0) {
            prop.tableRef?.current?.reload();
            message.success("提交成功");
          }
        }
        return true;
      }}
    >
      <ProFormUploadButton
        width="md"
        name="coverImg"
        label="封面图片"
        tooltip="设置封面图，获取更多流量"
        placeholder="请添加封面"
        max={1}
        action="http://localhost:8866/api/file/upload"
        rules={[{ required: true, message: "请上传题库封面" }]}
      />
      <ProFormText
        width="md"
        name="name"
        label="题库名"
        placeholder="请输入题库名"
        rules={[{ required: true, message: "请输入题库名" }]}
      />
      <ProFormText name="id" label="id" hidden />
      <ProFormSelect
        name="categoryId"
        width="md"
        label="题库分类"
        tooltip="请选择符合题库内容的分类，便于更多用户练习"
        placeholder="请选择分类"
        request={async () => {
          // 查询所有笔记的分类信息
          let { data } = await list({
            type: "2",
          });
          const categoryList = data.map((item: CATEGORY.CategoryItem) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
          return categoryList;
        }}
        rules={[{ required: true, message: "请选择题库分类" }]}
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
        label="题库难度"
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
        name="summary"
        label="题库简介"
        placeholder="请输入题库简介"
        fieldProps={{
          autoSize: { minRows: 6, maxRows: 6 },
          showCount: true,
        }}
      />
    </DrawerForm>
  );
};
