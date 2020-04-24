import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Input } from 'antd';
import Page from '@/components/Page';
import { formateDate } from '@/utils/tools';
import { ColumnProps } from 'antd/es/table';
import { SensitiveItem } from './data.d';
// import ModalForm from './ModalForm';
import ModalForm from '@/components/ModalForm';

const localList: SensitiveItem[] = [
  {
    id: 51123,
    content: '傻逼',
    editTime: 1587452489000,
  },
  {
    id: 51124,
    content: 'sb',
    editTime: 1587366088000,
  },
];

const Sensitive = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<SensitiveItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const pageIndex = 1;
  useEffect(() => {
    setTimeout(() => {
      setDataList(localList);
      setLoading(false);
    }, 1000);
  }, []);

  // edit item
  const handleEdit = (item: SensitiveItem) => {
    const index = dataList.findIndex((e) => e.id === item.id);
    setEditIndex(index);
    setDialogVisible(true);
  };

  // del item
  const handleDel = (item: SensitiveItem) => {
    const index = dataList.findIndex((e) => e.id === item.id);
    dataList.splice(index, 1);
    setDataList([...dataList]);
  };

  const onCancel = () => {
    setEditIndex(-1);
    setDialogVisible(false);
  };

  const onOk = (item: SensitiveItem) => {
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
  const title = (
    <Button type="primary" onClick={() => setDialogVisible(true)}>
      创建敏感词
    </Button>
  );
  const renderColButton = (item: SensitiveItem) => {
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
  const columns: ColumnProps<SensitiveItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '敏感词',
      dataIndex: 'content',
    },
    {
      title: '更新时间',
      dataIndex: 'editTime',
      render: renderColTime,
    },
    {
      title: '操作',
      render: renderColButton,
    },
  ];

  return (
    <Page title="敏感词管理">
      <Card title={title} loading={false} bordered={true}>
        <Table
          size="small"
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={dataList}
          bordered
          pagination={{ defaultPageSize: 10, showQuickJumper: true, current: pageIndex }}
        />
        <ModalForm
          title={editIndex === -1 ? '创建新敏感词' : '修改敏感词'}
          initialValues={editIndex === -1 ? undefined : dataList[editIndex]}
          visible={dialogVisible}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form.Item label="敏感词" name="content" rules={[{ required: true, message: '必须输入敏感词' }]}>
            <Input type="text" placeholder="请输入敏感词" />
          </Form.Item>
        </ModalForm>
      </Card>
    </Page>
  );
};

export default Sensitive;
