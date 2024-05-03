import { add, update } from "@/services/user/api";
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormSwitch,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

export default (prop: any) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={prop.title}
      trigger={prop.trigger}
      form={form}
      autoFocusFirstInput
      isKeyPressSubmit
      {...prop}
      modalProps={{
        destroyOnClose: true,
        onCancel: () =>
          console.log("处理垃圾图片", form.getFieldValue("avatar")),
      }}
      onFinish={async (values) => {
        values.avatar = values.avatar[0]?.response?.data;
        values.status = values.status ? "1" : "0";
        if (values.id) {
          let resp = await update(values);
          if (resp.code === 0) {
            prop.flush();
            message.success("更新成功");
          }
        } else {
          let resp = await add(values);
          if (resp.code === 0) {
            prop.tableRef?.current?.reload();
            message.success("提交成功");
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          tooltip="请输入6-10位用户名"
          placeholder="请输入用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        />
        <ProFormText name="id" label="id" hidden />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          tooltip="请输入6-16位密码"
          placeholder="请输入密码"
          rules={[{ required: true, message: "请输入密码" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
        />
        <ProFormUploadButton
          width="md"
          name="avatar"
          label="头像"
          max={1}
          action="/api/file/upload"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="xs"
          name="age"
          label="年龄"
          placeholder="请输入年龄"
          fieldProps={{ precision: 0 }}
        />
        <ProFormSelect
          valueEnum={{
            0: "女",
            1: "男",
          }}
          width="xs"
          name="sex"
          label="性别"
          initialValue={1}
        />
        <ProFormSwitch
          width="xs"
          name="status"
          label="状态"
          checkedChildren="正常"
          unCheckedChildren="禁用"
          fieldProps={{
            defaultValue: true,
          }}
          initialValue={true}
        />
      </ProForm.Group>
      <ProFormTextArea
        width="xl"
        name="sign"
        label="签名"
        placeholder="请输入签名"
      />
    </ModalForm>
  );
};
