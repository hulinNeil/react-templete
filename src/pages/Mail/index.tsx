import React from 'react';
import { router, connect } from 'dva';
import Template from './Template';
import Overview from './Overview';
import Sensitive from './Sensitive';
import MassSend from './MassSend';
import SentList from './SentList';
import { ConnectState } from '@/models';

const { Route, Switch, Redirect } = router;

const Create = React.lazy(() => import(/* webpackChunkName:"create~mail~tpl" */ './CreateTemplate'));

interface MailProps {
  permission: number;
}

const Mail: React.FC<MailProps> = ({ permission }) => {
  return (
    <Switch>
      <Route path="/mail/overview" component={Overview} />
      <Route path="/mail/template" component={Template} />
      <Route path="/mail/sensitive" component={Sensitive} />
      <Route path="/mail/mass-send" component={MassSend} />
      <Route path="/mail/mass-sent" component={SentList} />
      {permission === 1 && <Route path="/mail/create-template" component={Create} />}
      <Redirect to="/mail/overview" />
    </Switch>
  );
};

export default connect(({ user }: ConnectState) => ({
  permission: user.userInfo.permission,
}))(Mail);
