import { add, update } from "@/services/category/api";
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormSwitch,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

export default (prop: any) => {
  const [form] = Form.useForm<CATEGORY.CategoryAdd>();
  return (
    <ModalForm<CATEGORY.CategoryAdd>
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
        values: CATEGORY.CategoryAdd | CATEGORY.CategoryUpdate
      ) => {
        console.log("1111212", values.status);

        values.status = values.status ? "1" : "0";
        if ((values as CATEGORY.CategoryItem).id) {
          let resp = await update(values as CATEGORY.CategoryUpdate);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values as CATEGORY.CategoryAdd);
          if (resp.code === 0) {
            prop.tableRef?.current?.reload();
            message.success("提交成功");
          }
        }
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="分类名"
        placeholder="请输入分类名"
        rules={[{ required: true, message: "请输入分类名" }]}
      />
      <ProFormText name="id" label="id" hidden />
      <ProFormSelect
        valueEnum={{
          "0": { text: "笔记" },
          "1": { text: "视频" },
          "2": { text: "题库" },
          "3": { text: "资源" },
        }}
        initialValue={'0'}
        width="md"
        name="type"
        label="类型"
        rules={[{ required: true, message: "请选择分类类型" }]}
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
      <ProFormDigit
        width="md"
        name="order"
        label="排序"
        placeholder="请输入排序值"
        fieldProps={{ precision: 0 }}
      />
    </ModalForm>
  );
};
