import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Input, Cascader } from 'antd';
import Page from '@/components/Page';
import { formateDate } from '@/utils/tools';
import { ColumnProps } from 'antd/es/table';
import ModalForm from '@/components/ModalForm';
import { TableListItem } from './data.d';

const FormItem = Form.Item;
const options = [
  {
    value: 'KipleHome',
    label: 'KipleHome',
    children: [
      {
        value: '新年活动',
        label: '新年活动',
      },
      {
        value: '新用户注册',
        label: '新用户注册',
      },
    ],
  },
  {
    value: 'KipleBiz',
    label: 'KipleBiz',
    children: [
      {
        value: '端午活动',
        label: '端午活动',
      },
      {
        value: '新用户注册',
        label: '新用户注册',
      },
    ],
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

// 校验内容，不能有两个相同的{}
const validateContent = (rule: any, value: string) => {
  value = value.trim();
  let msg = '';
  if (!value) {
    msg = '必须输入模板内容';
  } else {
    const replaces = value.match(/{\d+}/gi);
    const repetitiveKeys: string[] = [];
    replaces &&
      replaces.sort().sort((a, b) => {
        if (a === b && !~repetitiveKeys.indexOf(a)) {
          repetitiveKeys.push(a);
        }
        return 0;
      });
    if (repetitiveKeys.length > 0) {
      msg = `不能有重复的模板变量：${repetitiveKeys.join('-')}`;
    }
  }
  return msg ? Promise.reject(msg) : Promise.reject();
};

const Template = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tempList, setTempList] = useState<TableListItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
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
    setEditIndex(index);
    setDialogVisible(true);
  };

  // del item
  const handleDel = (item: TableListItem) => {
    console.log('点击删除', item);
    const index = tempList.findIndex((e) => e.id === item.id);
    tempList.splice(index, 1);
    setTempList([...tempList]);
  };

  const onCancel = () => {
    setEditIndex(-1);
    setDialogVisible(false);
  };

  const onOk = (item: TableListItem) => {
    console.log(JSON.stringify(item));
    onCancel();
    if (!item.id) {
      item.id = (tempList[tempList.length - 1] && tempList[tempList.length - 1].id + 1) || 1;
      setTempList([...tempList, item]);
    } else {
      const index = tempList.findIndex((e) => e.id === item.id);
      tempList[index] = item;
      setTempList([...tempList]);
    }
  };

  const handleTableChange = (pagination: any, filters: any) => {
    console.log(pagination, filters);
    console.log('将要重新请求数据');
  };

  const title = (
    <Button type="primary" onClick={() => setDialogVisible(true)}>
      创建新模版
    </Button>
  );
  const renderColButton = (item: TableListItem) => {
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
  const renderColTime = (time: number) => <span>{formateDate(time)}</span>;
  const renderColStatus = (status: number) => <span>{status === 1 ? '启用中' : '禁用中'}</span>;
  const renderColSystem = (system: string[]) => <span>{system.join('-')}</span>;
  const columns: ColumnProps<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '模板名称',
      dataIndex: 'title',
      width: 100,
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      filters: [
        { text: '启用中', value: 1 },
        { text: '禁用中', value: 2 },
      ],
      render: renderColStatus,
    },
    {
      title: '最后编辑时间',
      dataIndex: 'editTime',
      width: 150,
      render: renderColTime,
    },
    {
      title: '所属系统',
      dataIndex: 'system',
      width: 120,
      render: renderColSystem,
    },
    {
      title: '操作',
      width: 130,
      render: renderColButton,
    },
  ];

  return (
    <Page title="模版管理">
      <Card title={title} loading={false} bordered={true}>
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
        <ModalForm
          title={editIndex === -1 ? '创建新模板' : '修改模板'}
          initialValues={editIndex === -1 ? undefined : tempList[editIndex]}
          visible={dialogVisible}
          onCancel={onCancel}
          onOk={onOk}
        >
          <FormItem label="模板名称" name="title" rules={[{ required: true, message: '必须输入模板名称' }]}>
            <Input type="text" placeholder="请输入模板名称" />
          </FormItem>
          <FormItem label="模板内容" name="content" rules={[{ validator: validateContent }]}>
            <Input.TextArea placeholder="模板内容" autoSize={{ minRows: 2 }} />
          </FormItem>
          <FormItem label="所属系统" name="system" rules={[{ required: true, message: '必须指定所属系统' }]}>
            <Cascader options={options} placeholder="请选择业务方和所属系统"></Cascader>
          </FormItem>
        </ModalForm>
      </Card>
    </Page>
  );
};

export default Template;
