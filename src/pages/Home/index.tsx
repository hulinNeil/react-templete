import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './index.less';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="home">{intl.get('index')}</div>;
  }
}
