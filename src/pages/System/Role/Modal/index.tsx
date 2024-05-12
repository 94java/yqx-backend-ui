import { add, update } from "@/services/role/api";
import {
  ModalForm,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

export default (prop: any) => {
  const [form] = Form.useForm<ROLE.RoleItem>();
  return (
    <ModalForm<ROLE.RoleItem>
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
      onFinish={async (values: ROLE.RoleItem) => {
        values.status = values.status ? "1" : "0";
        if ((values as CATEGORY.CategoryItem).id) {
          let resp = await update(values as ROLE.RoleItem);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values as ROLE.RoleItem);
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
        label="角色名"
        placeholder="请输入角色名"
        rules={[{ required: true, message: "请输入角色名" }]}
      />
      <ProFormText
        width="md"
        name="roleTag"
        label="角色标识"
        placeholder="请输入角色标识"
        rules={[{ required: true, message: "请输入角色标识" }]}
      />
      <ProFormText name="id" label="id" hidden />
    </ModalForm>
  );
};
