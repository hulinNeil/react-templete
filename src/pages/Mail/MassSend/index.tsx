import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card, Button, Table, Form, DatePicker, Radio, Select, Input } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import Page from '@/components/Page';
import { ColumnProps } from 'antd/es/table';
import { SassSendItem } from './data';
import { TableListItem } from '../Template/data';
import ModalForm from '@/components/ModalForm';
import './index.less';
import { ConnectState } from '@/models';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
import CustomModal from '@/components/CustomModal';
import { deleteCronjob } from '@/services/mail/cronjob';
import { validateMailAddressee } from '@/utils/validateForm';
window.moment = moment;
const localList: SassSendItem[] = [
  {
    id: 51123,
    title: 'Home验证码',
    content: '验证码为：{1}，您正在登录，若非本人操作，请勿泄露。',
    kinds: 3,
    status: 1,
    count: 12043,
    sendType: 2,
    sendTime: 1587452489000,
  },
  {
    id: 51123,
    title: '新年营销活动',
    content: '新年快乐！登录 http://n.cn/SXn78aA 领取好礼！',
    kinds: 1,
    status: 2,
    count: 120385,
    sendType: 0,
    sendTime: 1587366088000,
  },
];

const tempListLocal: TableListItem[] = [
  {
    id: 51123,
    title: 'Home验证码',
    content: '验证码为：{1}，您正在登录，若非本人操作，请勿泄露。',
    kinds: 3,
    status: 1,
    business: 1,
    system: ['aasdas', 'xxx营销活动'],
    editTime: 1587452489000,
  },
  {
    id: 51124,
    title: 'Pay验证码',
    content: '您正在申请手机号码注册，验证码为：{1}，{2}分钟有效，为保障帐户安全，请勿向任何人提供此验证码。',
    kinds: 3,
    status: 2,
    business: 2,
    system: ['Home', '新用户注册'],
    editTime: 1587366088000,
  },
];

const renderColKinds = (kinds: number) => <span>{kinds === 1 ? '营销类' : kinds === 2 ? '报警类' : kinds === 3 ? '验证码' : '其他'}</span>;
const renderColTime = (time: number) => <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>;
const renderColStatus = (status: number) => <span>{status === 1 ? '待发送' : '已发送'}</span>;

interface MassSendProps extends RouteComponentProps {
  permission: number; // 1:add/del/put 2:get
}

const MassSend: React.FC<MassSendProps> = (props) => {
  const { permission } = props;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<SassSendItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [datePikerVisible, setDatePikerVisible] = useState<boolean>(false);
  const [pageno, setPageno] = useState<number>(1);

  const getList = async () => {
    setLoading(true);
    // try {
    //   const result = await getCronjobList({ pageno });
    //   setDataList(result.data);
    // } catch (error) {
    //   console.error('出现错误');
    // }
    // setLoading(false);
    setTimeout(() => {
      setDataList(localList);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getList();
  }, [pageno]);

  // edit item
  const handleEdit = (item: SassSendItem) => {
    const index = dataList.findIndex((e) => e.id === item.id);
    setEditIndex(index);
    setDialogVisible(true);
  };

  // del item
  const handleDel = (item: SassSendItem) => {
    CustomModal.warning({
      title: '删除定时任务',
      content: '您确定要删除此定时任务吗？',
      onOk: async () => {
        const result = await deleteCronjob({ id: item.id });
        if (result && result.status === 0) {
          getList();
        }
      },
    });
  };

  const onCancel = () => {
    setEditIndex(-1);
    setDialogVisible(false);
    setDatePikerVisible(false);
  };

  const onOk = (item: SassSendItem) => {
    console.log('调用页面获取数据', item);
    onCancel();
    if (!item.id) {
      item.id = (dataList[dataList.length - 1] && dataList[dataList.length - 1].id + 1) || 1;
      setDataList([...dataList, item]);
    } else {
      const index = dataList.findIndex((e) => e.id === item.id);
      dataList[index] = item;
      setDataList([...dataList]);
    }
  };

  const statusChange = (e: RadioChangeEvent) => {
    console.log(e.target.value, '下少年的你 ');
    setDatePikerVisible(Number(e.target.value) === 2);
  };
  const title = permission === 1 && (
    <Button type="primary" onClick={() => setDialogVisible(true)}>
      创建群发任务
    </Button>
  );
  const renderColButton = (item: SassSendItem) => {
    return (
      <span>
        <Button size="small" onClick={() => handleEdit(item)}>
          修改
        </Button>
        &nbsp;&nbsp;
        <Button size="small" onClick={() => handleDel(item)}>
          删除
        </Button>
      </span>
    );
  };

  const columns: ColumnProps<SassSendItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'id',
    },
    {
      title: '模板名称',
      dataIndex: 'title',
    },
    {
      title: '短信类型',
      dataIndex: 'kinds',
      render: renderColKinds,
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
      render: renderColTime,
    },
    {
      title: '发送用户数',
      dataIndex: 'count',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: renderColStatus,
    },
  ];
  if (permission === 1) {
    columns.push({
      title: '操作',
      width: 130,
      render: renderColButton,
    });
  }

  return (
    <Page title="群发邮件">
      <Card title={title} loading={false} bordered={true}>
        <Table
          size="small"
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={dataList}
          bordered
          onChange={(e) => setPageno(e.current || 1)}
          pagination={{ total: 85, defaultPageSize: 10, current: pageno }}
        />
        <ModalForm
          title={editIndex === -1 ? '创建群发任务' : '修改任务'}
          initialValues={editIndex === -1 ? undefined : dataList[editIndex]}
          visible={dialogVisible}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form.Item label="模板名称" name="title" rules={[{ required: true, message: '必须选择模板' }]}>
            <Select>
              {tempListLocal.map((value) => (
                <Select.Option key={value.id} value={value.id}>
                  {value.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="模板变量" name="replaceWord" rules={[{ required: true, message: '必须选择模板' }]}>
            <Input type="text" placeholder="以空格分隔需要替换的变量" />
          </Form.Item>
          <Form.Item label="收件人" name="to" rules={[{ validator: validateMailAddressee }]}>
            <Input.TextArea placeholder="以空格分隔收件人邮箱" autoSize={{ minRows: 2 }} />
          </Form.Item>
          <Form.Item label="发送规则" name="sendType" rules={[{ required: true, message: '必须选择发送类型' }]}>
            <Radio.Group onChange={statusChange}>
              <Radio value={1}>立即发送</Radio>
              <Radio value={2}>定时发送</Radio>
            </Radio.Group>
          </Form.Item>
          {datePikerVisible && (
            <Form.Item label="发送时间" name="sendTime" rules={[{ required: true, message: '必须选择发送时间' }]}>
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={(current) => current && current < moment()}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            </Form.Item>
          )}
        </ModalForm>
      </Card>
    </Page>
  );
};

export default connect(({ user }: ConnectState) => ({
  permission: user.userInfo.permission,
}))(MassSend);
