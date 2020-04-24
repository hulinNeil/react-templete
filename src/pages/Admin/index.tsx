import React from 'react';
import { Layout, Spin } from 'antd';
import { connect, router, Dispatch } from 'dva';
import { RouteComponentProps } from 'dva/router';
import './index.less';
import { storage } from '@/utils/tools';
import { Menu } from '@/services/login';
import LeftNav from '../../components/LeftNav';
import Header from '@/components/Header';
import Home from '../Home';
import { Location, History } from 'history';
import { ConnectState } from '@/models/index';
const { withRouter, Route, Switch, Redirect } = router;

// 路由懒加载
const Merchant = React.lazy(() => import(/* webpackChunkName:"Merchant" */ '../Merchant'));
const Charts = React.lazy(() => import(/* webpackChunkName:"Charts" */ '../Charts'));
const SMS = React.lazy(() => import(/* webpackChunkName:"SMS" */ '../SMS'));
const Mail = React.lazy(() => import(/* webpackChunkName:"Mail" */ '../Mail'));

interface IndexProps extends RouteComponentProps {
  currentMenuIndex: number;
  location: Location;
  history: History;
  loggedIn: boolean;
  userInfo: any;
  dispatch: Dispatch;
}

const Index: React.FC<IndexProps> = ({ currentMenuIndex, location, loggedIn, dispatch }) => {
  const userInfo = storage.getItem('user_key');
  if (!loggedIn && userInfo) {
    console.log('是记住了密码的，需要验证下');
    loggedIn = true;
    dispatch({
      type: 'user/checkStatus',
      payload: { userInfo },
    });
  }
  // Verify login status
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  let menuList: Menu[] = [];
  const menuListLocal: Menu[] = storage.getItem('menu_list');
  menuListLocal &&
    menuListLocal.forEach((item) => {
      if (item.children) {
        menuList = menuList.concat(item.children);
      }
    });
  const path = location.pathname;
  const menu = menuList[currentMenuIndex];
  return (
    <div className="page">
      <Header />
      <Layout className="container">
        {menu ? <LeftNav menu={menu} path={path} /> : ''}
        {/* React.Suspense will show loading when the page loads  */}
        <React.Suspense
          fallback={
            <div className="page-loading">
              <Spin size="large" />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/merchant" component={Merchant} />
            <Route path="/charts" component={Charts} />
            <Route path="/sms" component={SMS} />
            <Route path="/mail" component={Mail} />
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </Layout>
    </div>
  );
};

export default connect(({ admin, user }: ConnectState) => {
  const { currentMenuIndex } = admin;
  return {
    currentMenuIndex,
    userInfo: user.userInfo,
    loggedIn: user.loggedIn,
  };
})(withRouter(Index));
