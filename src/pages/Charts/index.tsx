import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect, router } from 'dva';

import { storage } from '@/utils/tools';
import Bar from './Bar';
import Radar from './Radar';

const { withRouter, Route, Switch, Redirect } = router;

class Charts extends Component {
  render() {
    return (
      <Switch>
        <Route path="/charts/bar" component={Bar} />
        <Route path="/charts/radar" component={Radar} />
        <Redirect to="/charts/bar" />
      </Switch>
    );
  }
}
export default Charts;
