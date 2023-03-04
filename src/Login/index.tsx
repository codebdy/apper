import React, { memo, useCallback, useRef } from "react"
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import { useLogin, useSetToken } from "../enthooks"
import { INDEX_URL, DESIGNER_TOKEN_NAME } from "../consts"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Login = memo(() => {
  const rememberMeRef = useRef(true);
  const setToken = useSetToken();
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [form] = Form.useForm()
  const [login, { loading }] = useLogin({
    onCompleted(atoken: string) {
      if (atoken) {
        if (rememberMeRef.current) {
          localStorage.setItem(DESIGNER_TOKEN_NAME, atoken);
        } else {
          localStorage.removeItem(DESIGNER_TOKEN_NAME);
        }
        setToken(atoken);
        navigate(INDEX_URL);
      }
    },
    onError(error: any) {
      message.error(error.message)
      // if (error?.response?.status === 401) {
      //   //setErroMessage(intl.get("login-failure"));
      // } else {
      //   //setErroMessage(error?.message);
      // }
    },
  });

  const handleLogin = useCallback((values: {
    loginName: string;
    password: string;
    rememberMe: boolean;
  }) => {
    rememberMeRef.current = values.rememberMe;
    login(values)
  }, [login]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "url(/img/background2.jpg)",
      height: "100vh",
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Card style={{ width: 400 }}>
        <h3>{t("Login")}</h3>
        <Form
          form={form}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label={t("UserName")}
            name="loginName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Password")}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>{t("RememberMe")}</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
})

export default Login;