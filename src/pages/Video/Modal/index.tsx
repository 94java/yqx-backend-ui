import { add, update, list } from "@/services/video/api";
import {
  DrawerForm,
  ProFormUploadButton,
  ProFormSelect,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormUploadDragger,
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
      maxWidth={window.innerWidth * 0.8}
      minWidth={200}
      width={400}
      {...prop}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("cancel"),
      }}
      onFinish={async (
        values: CATEGORY.CategoryAdd | CATEGORY.CategoryUpdate
      ) => {
        if (values.coverImg) {
          values.coverImg = values.coverImg[0]?.response?.data;
        }
        values.url = values.url[0]?.response?.data;
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
      <ProFormUploadButton
        width="md"
        name="coverImg"
        label="封面图片"
        tooltip="设置封面图，获取更多流量"
        placeholder="请添加封面"
        max={1}
        action="/api/file/upload"
      />
      <ProFormText
        width="md"
        name="title"
        label="视频标题"
        placeholder="请输入视频标题"
        rules={[{ required: true, message: "请输入视频标题" }]}
      />
      <ProFormRadio.Group
        name="type"
        width="md"
        label="视频类型"
        tooltip="创作类型声明，会展示在文章头部等明显位置"
        valueEnum={{
          "0": { text: "原创" },
          "1": { text: "搬运" },
          "2": { text: "剪辑" },
          "3": { text: "翻拍" },
        }}
        initialValue={"0"}
      />
      <ProFormSelect
        name="categoryId"
        width="md"
        label="视频分类"
        tooltip="请选择符合视频的分类，便于更多读者观看"
        placeholder="请选择分类"
        request={async () => {
          // 查询所有笔记的分类信息
          let { data } = await list({
            type: "1",
          });
          const categoryList = data.map((item: CATEGORY.CategoryItem) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
          return categoryList;
        }}
        rules={[{ required: true, message: "请选择视频分类" }]}
      />

      <ProFormUploadDragger
        width="md"
        name="url"
        label="视频资源"
        fieldProps={{ multiple: true, name :'file'}}
        rules={[{ required: true, message: "请上传视频资源" }]}
        max={1}
        action="/api/file/upload"
      />
      <ProFormTextArea
        width="md"
        name="summary"
        label="视频简介"
        placeholder="请输入视频简介"
        fieldProps={{
          autoSize: { minRows: 6, maxRows: 6 },
          showCount: true,
        }}
      />
      <ProFormText name="id" label="id" hidden />
    </DrawerForm>
  );
};
