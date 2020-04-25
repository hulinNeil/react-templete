import React, { useState, useEffect } from 'react';
import { Card, Button, Table } from 'antd';
import { router, connect } from 'dva';
import { History } from 'history';
import Page from '@/components/Page';
import { ColumnProps } from 'antd/es/table';
import { TableListItem } from './data';
import './index.less';
import { ConnectState } from '@/models';
import { RouteComponentProps } from 'dva/router';
import moment from 'moment';
import CustomModal from '@/components/CustomModal';
import { delTemplate } from '@/services/mail/template';
const { withRouter } = router;

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

interface TemplateProps extends RouteComponentProps {
  history: History;
  permission: number; // 1:add/del/put 2:get
}

const Template: React.FC<TemplateProps> = ({ history, permission }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tempList, setTempList] = useState<TableListItem[]>([]);
  const pageIndex = 1;
  useEffect(() => {
    setTimeout(() => {
      setTempList(JSON.parse(JSON.stringify(tempListLocal)));
      setLoading(false);
    }, 1000);
  }, []);

  // edit item
  const handleEdit = (item: TableListItem) => {
    const index = tempList.findIndex((e) => e.id === item.id);
    console.log('编辑模板', index);
  };

  // del item
  const handleDel = (item: TableListItem) => {
    const index = tempList.findIndex((e) => e.id === item.id);
    CustomModal.warning({
      title: '删除模板',
      content: `您确定要删除邮件模板：${item.title} 吗？`,
      onOk: async () => {
        tempList.splice(index, 1);
        setTempList([...tempList]);
        const result = await delTemplate({ id: item.id });
        if (result && result.status === 0) {
          // getList();
        }
      },
    });
  };

  const handleTableChange = (pagination: any, filters: any) => {
    console.log(pagination, filters);
    console.log('将要重新请求数据');
  };

  const jumpCreate = () => {
    console.log('点击跳转页面');
    history.push('/mail/create-template');
  };
  const open = (item: any) => {
    console.log('===========', item);
    const reviewWindow: any = window.open();
    reviewWindow.document.body.innerHTML = '<p>asdas</p>';
  };
  const title = (
    <Button type="primary" onClick={() => jumpCreate()}>
      创建新模版
    </Button>
  );
  const renderColButton = (item: TableListItem) => {
    return (
      <span className="template-operation">
        <Button size="small" onClick={() => open(item)}>
          预览
        </Button>
        {permission === 1 && (
          <>
            <Button size="small" onClick={() => handleEdit(item)}>
              修改
            </Button>
            <Button size="small" onClick={() => handleDel(item)}>
              删除
            </Button>
          </>
        )}
      </span>
    );
  };
  const renderColTime = (time: number) => <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>;
  const renderColStatus = (status: number) => <span>{status === 1 ? '启用中' : '禁用中'}</span>;
  const renderColSystem = (system: string[]) => <span>{system.join('-')}</span>;
  const columns: ColumnProps<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '模板名称',
      dataIndex: 'title',
    },
    {
      title: '所属系统',
      dataIndex: 'system',
      render: renderColSystem,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text: '启用中', value: 1 },
        { text: '禁用中', value: 2 },
      ],
      render: renderColStatus,
    },
    {
      title: '最后编辑时间',
      dataIndex: 'editTime',
      render: renderColTime,
    },
    {
      title: '操作',
      render: renderColButton,
    },
  ];

  return (
    <Page title="模版管理">
      <Card title={permission === 1 ? title : ''} loading={false} bordered={true}>
        <Table
          size="small"
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={tempList}
          bordered
          onChange={handleTableChange}
          pagination={{ defaultPageSize: 10, showQuickJumper: true, current: pageIndex }}
        />
      </Card>
    </Page>
  );
};

export default connect(({ user }: ConnectState) => ({
  permission: user.userInfo.permission,
}))(withRouter(Template));
