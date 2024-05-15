import { list } from "@/services/category/api";
import { add, update } from "@/services/notice/api";
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
      onFinish={async (values: NOTICE.NoticeItem) => {
        if ((values as NOTICE.NoticeItem).id) {
          let resp = await update(values as NOTICE.NoticeItem);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values as NOTICE.NoticeItem);
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
        name="title"
        label="标题"
        placeholder="请输入公告标题"
        rules={[{ required: true, message: "请输入公告标题" }]}
      />
      <ProFormText name="id" label="id" hidden />
      <ProFormTextArea
        width="md"
        name="content"
        label="公告内容"
        placeholder="请输入公告内容"
        fieldProps={{
          autoSize: { minRows: 10, maxRows: 10 },
          showCount: true,
        }}
        rules={[{ required: true, message: "请输入公告内容" }]}
      />
    </DrawerForm>
  );
};
