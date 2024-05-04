import "@umijs/max";
import React, { useEffect, useRef, useState } from "react";
// 引入插件
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import breaks from "@bytemd/plugin-breaks";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

// 引入中文包
import zhHans from "bytemd/locales/zh_Hans.json"
// 引入编辑器
import { Editor } from "@bytemd/react";
import { Button, Flex, Input, Form, message } from "antd";

import { LeftOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "@umijs/max";

import {
  DrawerForm,
  ProFormUploadButton,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";


// 主题
import "bytemd/dist/index.min.css";
import './theme/smartblue.css'
import "./theme/atom-one-light.css";
import "./index.less";
import { add, getById, update } from "@/services/note/api";
import { list } from "@/services/category/api";


const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  breaks(),
  math(),
  mediumZoom(),
  mermaid(),
  // Add more plugins here
];


const Content = () => {
  const [artileValue, setArtileValue] = useState("");
  const [drawerVisit, setDrawerVisit] = useState(false);
  const titleRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  // 是发布文章还是保存草稿
  let draftFlag = false;
  // 生命周期函数：初始化时，如果携带了id参数
  useEffect(() => {
    // 读取id
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      // 是修改操作
      setId(id as string);
      // 查询数据
      getById(id as string).then((resp) => {
        const { code, data } = resp;
        if (code === 0) {
          data.coverImg = data.coverImg
            ? [{ thumbUrl: data.coverImg, name: data.coverImg }]
            : [];
          form.setFieldsValue(data);
          setArtileValue(data.content);
          setTitle(data.title);
        }
      });
    }
  }, []);

  // 保存或发布笔记
  const handleSubmit = async (flag) => {
    if (!id) {
      // 是新发布
      draftFlag = flag;
      setDrawerVisit(true);
    } else {
      // 文章编辑
      const req: NOTE.NoteAdd | NOTE.NoteUpdate = {
        id,
        content: artileValue,
        title: titleRef.current.input.value,
        // 状态为草稿状态或待审核状态
        status: flag ? '2' : '0',
      };
      if (req.coverImg) {
        req.coverImg = (req.coverImg[0] as any).response.data;
      }
      const resp = await update(req);
      if (resp.code === 0) {
        message.success("修改成功");
        setTimeout(() => {
          navigate(-1);
        },500)
      }
    }
  };
  return (
    <>
      <Flex
        gap="small"
        wrap={"nowrap"}
        justify="space-around"
        className="content-header"
        align="center"
      >
        <Button
          type="link"
          className="text-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutlined />
          笔记管理
        </Button>
        <Input placeholder="请输入文章标题" ref={titleRef} value={title} onChange={(e) => {
          setTitle(e.target.value)
        }}/>
        <Button onClick={() => handleSubmit(true)}>保存草稿</Button>
        <Button type="primary" onClick={() => handleSubmit(false)}>发布文章</Button>
        <Button
          type="text"
          className="text-btn"
          onClick={() => {
            setDrawerVisit(true);
          }}
        >
          <SettingOutlined />
        </Button>

        {/* settings 抽屉 */}
        <DrawerForm
          title="笔记设置"
          resize={{
            onResize() {
              console.log("resize!");
            },
            maxWidth: window.innerWidth * 0.8,
            minWidth: 380,
          }}
          form={form}
          open={drawerVisit}
          onOpenChange={setDrawerVisit}
          autoFocusFirstInput
          drawerProps={{
            destroyOnClose: true,
          }}
          submitTimeout={2000}
          onFinish={async (values: NOTE.NoteUpdate) => {
            if (titleRef.current.input.value === "") {
              message.error("请输入文章标题");
              return false;
            }
            // 图片处理
            if (values.coverImg) {
              values.coverImg = (values.coverImg[0] as any).response?.data;
            }
            // 构建请求
            const req: NOTE.NoteAdd | NOTE.NoteUpdate = {
              ...values,
              content: artileValue,
              title: titleRef.current.input.value,
            };

            if (!id) {
              // 是文章发布或保存草稿
              // 待审核状态
              req.status = draftFlag ? '2' : '0';
              const { code } = await add(req);
              if (code === 0) {
                message.success("保存成功");
                navigate(-1);
              }
            } else {
              // 是修改操作
              const resp = await update(values)
              if (resp.code === 0) {
                message.success("设置成功")
              }
            }

            // 不返回不会关闭弹框
            return true;
          }}
        >
          <ProFormUploadButton
            name="coverImg"
            width="md"
            label="笔记封面"
            tooltip="设置封面图，获取更多流量"
            placeholder="请添加封面"
            max={1}
            action="/api/file/upload"
          />
          <ProFormText name="id" label="id" hidden={true} key="id" />
          <ProFormSelect
            name="categoryId"
            width="md"
            label="笔记分类"
            tooltip="请选择符合内容的分类，便于更多读者阅读"
            placeholder="请选择分类"
            request={async () => {
              // 查询所有笔记的分类信息
              let { data } = await list({
                type: "0",
              });
              const categoryList = data.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              });
              return categoryList;
            }}
            rules={[{ required: true, message: "请选择文章分类" }]}
          />
          <ProFormRadio.Group
            name="type"
            width="md"
            label="笔记类型"
            tooltip="创作类型声明，会展示在文章头部等明显位置"
            valueEnum={{
              "0": "原创",
              "1": "转载",
              "2": "翻译",
            }}
            initialValue={"0"}
          />
          <ProFormTextArea
            name="summary"
            width="md"
            label="笔记摘要"
            tooltip="摘要描述，帮助读者快速了解内容"
            placeholder="请输入笔记摘要，不填默认截取前256个字符"
            fieldProps={{
              autoSize: { minRows: 6, maxRows: 6 },
              showCount: true,
            }}
          />
        </DrawerForm>
      </Flex>
      <Editor
        value={artileValue}
        plugins={plugins}
        mode="auto"
        locale={zhHans}
        onChange={(v) => {
          setArtileValue(v);
        }}
      />
    </>
  );
};
export default Content;
