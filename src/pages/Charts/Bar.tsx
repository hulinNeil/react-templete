import React from 'react';
import { Layout, Col, Row } from 'antd';
const { Content } = Layout;
import Line from './Line';
import Page from '@/components/Page';

class Bar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Page title="概述">
        <Row gutter={20}>
          <Col md={8}>
            <Line />
          </Col>
          <Col md={8}>
            <Line />
          </Col>
          <Col md={8}>
            <Line />
          </Col>
        </Row>
      </Page>
    );
  }
}

export default Bar;
