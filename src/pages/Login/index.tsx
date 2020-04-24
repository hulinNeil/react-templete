import { GoogleOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { router, connect, Dispatch } from 'dva';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models';
import LoginFrom from './LoginForm';
import './index.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
const { Link } = router;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: any;
  submitting: boolean;
  remember: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting, remember, dispatch } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    dispatch({
      type: 'user/login',
      payload: { ...values, type },
    });
  };

  const setAutoLogin = (remember: boolean) => {
    dispatch({
      type: 'user/change',
      payload: { remember },
    });
  };
  return (
    <div className="login-main">
      <div className="logo"></div>
      <div className="login-desc">Kiple 是xxxx的xxx公司/服务</div>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && <LoginMessage content="账户或密码错误" />}
          <UserName
            name="userName"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {status === 'error' && loginType === 'mobile' && !submitting && <LoginMessage content="验证码错误" />}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div className="form-row">
          <Checkbox checked={remember} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a>忘记密码</a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className="form-row">
          <div>
            其他登录方式
            <GoogleOutlined className="icon" />
            <TwitterOutlined className="icon" />
            <LinkedinOutlined className="icon" />
          </div>
          <Link to="/user/register">注册账户</Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({
  userLogin: user,
  submitting: user.submitting,
  remember: user.remember,
}))(Login);
