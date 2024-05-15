import { Footer } from "@/components";
import { login, loginByEmail, sendEmailCode } from "@/services/user/api";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Helmet, history, useModel } from "@umijs/max";
import { Alert, Tabs, message } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import Settings from "../../../../config/defaultSettings";
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    },
  };
});

// 登录错误信息
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<USER.LoginResult>({});
  const [type, setType] = useState<string>("account");
  const { initialState, setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: USER.LoginParams) => {
    try {
      // 登录
      let resp: USER.LoginResult;
      if (!values.password) {
        // 快捷登录
        resp = await loginByEmail(values as USER.LoginParams);
      } else {
        // 账号密码登录
        resp = await login(values as USER.LoginParams);
      }
      if (resp?.code === 0) {
        message.success("登录成功！");
        // 存储用户token
        localStorage.setItem("token", resp.data);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get("redirect") || "/");
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(resp);
    } catch (error) {
      console.log(error);
      message.error("登录失败，请重试！");
    }
  };
  const { code, message: msg } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {"登录"}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="易启学"
          subTitle={"易启学社区-面向在校学生的学习社区"}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as USER.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: "account",
                label: "账户密码登录",
              },
              {
                key: "mobile",
                label: "手机号登录",
              },
            ]}
          />

          {code !== 0 && msg && <LoginMessage content={msg as string} />}

          {type === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"用户名"}
                rules={[
                  {
                    required: true,
                    message: "用户名是必填项！",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                placeholder={"密码"}
                rules={[
                  {
                    required: true,
                    message: "密码是必填项！",
                  },
                ]}
              />
            </>
          )}

          {type === "mobile" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined />,
                }}
                name="email"
                placeholder={"请输入邮箱账号"}
                rules={[
                  {
                    required: true,
                    message: "邮箱账号是必填项",
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: "不合法的邮箱账号",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                phoneName="email"
                captchaProps={{
                  size: "large",
                }}
                placeholder={"请输入验证码"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"秒后重新获取"}`;
                  }
                  return "获取验证码";
                }}
                name="code"
                rules={[
                  {
                    required: true,
                    message: "验证码是必填项",
                  },
                ]}
                onGetCaptcha={async (email) => {
                  const result = await sendEmailCode({
                    email,
                  });
                  if (!result) {
                    return;
                  }
                  message.success(`获取验证码成功`);
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
