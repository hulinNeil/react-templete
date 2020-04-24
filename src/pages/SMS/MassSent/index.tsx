import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { Card, Button, Table, Form, DatePicker, Select, Input, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import Page from '@/components/Page';
import { formateDate } from '@/utils/tools';
import { ColumnProps } from 'antd/es/table';
import { SentListItem } from './data.d';
import './index.less';

const localList: SentListItem[] = [
  {
    id: 51123,
    tel: 13349899620,
    content: '验证码为：4336，您正在登录，若非本人操作，请勿泄露。',
    kinds: 3,
    status: 0,
    sendTime: 1587452489000,
  },
  {
    id: 51123,
    tel: 13307194943,
    content: '新年快乐！登录 http://n.cn/SXn78aA 领取好礼！',
    kinds: 1,
    status: 2,
    sendTime: 1587366088000,
  },
];

const renderColKinds = (kinds: number) => <span>{kinds === 1 ? '营销类' : kinds === 2 ? '报警类' : kinds === 3 ? '验证码' : '其他'}</span>;
const renderColTime = (time: number) => <span>{formateDate(time)}</span>;
const renderColStatus = (status: number) => <span>{status === 0 ? '发送成功' : '发送失败'}</span>;

const MassSent: React.FC<{}> = () => {
  const [startDate, setStartDate] = useState<Moment>(moment());
  const [endDate, setEndDate] = useState<Moment>(moment());
  const [loading, setLoading] = useState<boolean>(true);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [dataList, setDataList] = useState<SentListItem[]>([]);
  const pageIndex = 1;
  useEffect(() => {
    setTimeout(() => {
      setDataList(localList);
      setLoading(false);
    }, 1000);
  }, []);

  const onDateChange = (e: RadioChangeEvent) => {
    const time = e.target.value;
    let endDateUnix: number = moment().unix();
    const startDateUnix: number = endDateUnix - time * 24 * 60 * 60;
    if (time === 1) {
      endDateUnix -= 24 * 60 * 60;
    }
    setStartDate(moment.unix(startDateUnix));
    setEndDate(moment.unix(endDateUnix));
  };

  const onCalendarChange = (dates: any) => {
    console.log('日期选择', dates);
    setDateIndex(-1);
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const exportDate = () => {
    console.log('导出数据！！！！');
  };

  const onFinish = (dates: any) => {
    console.log('=======点击查询=====', dates);
    const date = [moment(startDate.format('YYYY-MM-DD')).unix(), moment(endDate.format('YYYY-MM-DD')).unix()];
    console.log(date);
  };

  const columns: ColumnProps<SentListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      width: 110,
    },
    {
      title: '发送内容',
      dataIndex: 'content',
    },
    {
      title: '短信类型',
      dataIndex: 'kinds',
      render: renderColKinds,
      width: 80,
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
      render: renderColTime,
      width: 150,
    },
    {
      title: '发送状态',
      dataIndex: 'status',
      width: 90,
      render: renderColStatus,
    },
  ];

  const initialValues = {
    id: null,
    tel: null,
    status: 0,
  };

  return (
    <Page className="sms-sent" title="已发送短信">
      <Card className="sms-sent-time">
        <Radio.Group className="sms-sent-time-select" onChange={onDateChange} value={dateIndex}>
          <Radio.Button value={0}>今天</Radio.Button>
          <Radio.Button value={1}>昨天</Radio.Button>
          <Radio.Button value={7}>最近7天</Radio.Button>
          <Radio.Button value={30}>最近30天</Radio.Button>
        </Radio.Group>
        <DatePicker.RangePicker onChange={onCalendarChange} value={[startDate, endDate]} format="YYYY-MM-DD" />
      </Card>
      <Card bordered={true}>
        <Form className="sms-sent-search-form" name="search" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="任务ID" name="id" className="form-task-id">
            <Input type="text" maxLength={12} />
          </Form.Item>
          <Form.Item label="手机号" name="tel" className="form-tel-number">
            <Input type="text" maxLength={12} />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select>
              <Select.Option value={0}>全部</Select.Option>
              <Select.Option value={1}>发送成功</Select.Option>
              <Select.Option value={2}>发送失败</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="submit">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="primary" onClick={exportDate}>
              导出数据
            </Button>
          </Form.Item>
        </Form>
        <Table
          size="small"
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={dataList}
          bordered
          pagination={{ defaultPageSize: 10, showQuickJumper: true, current: pageIndex }}
        />
      </Card>
    </Page>
  );
};

export default MassSent;
