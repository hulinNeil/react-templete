import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Input } from 'antd';
import Page from '@/components/Page';
import { ColumnProps } from 'antd/es/table';
import { SensitiveItem } from './data';
import ModalForm from '@/components/ModalForm';
import CustomModal from '@/components/CustomModal';
import { getWordList, deleteWord, createWord } from '@/services/mail/sensitiveword';
import moment from 'moment';

const Sensitive = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<SensitiveItem[]>([]);
  const [pageno, setPageno] = useState<number>(1);

  const getList = async () => {
    setLoading(true);
    try {
      const result = await getWordList({ pageno });
      setDataList(result.data);
    } catch (error) {
      console.error('出现错误');
    }
    setLoading(false);
  };
  // 监听pageno请求数据（Listen for pageno request data）
  useEffect(() => {
    getList();
  }, [pageno]);

  // del item
  const handleDel = (item: SensitiveItem) => {
    const index = dataList.findIndex((e) => e.id === item.id);
    CustomModal.warning({
      title: '删除敏感词',
      content: `您确定要删除敏感词：${item.content} 吗？`,
      onOk: async () => {
        dataList.splice(index, 1);
        setDataList([...dataList]);
        const result = await deleteWord({ id: item.id });
        if (result && result.status === 0) {
          getList();
        }
      },
    });
  };

  const onCancel = () => {
    setDialogVisible(false);
  };

  const onOk = async (item: SensitiveItem) => {
    const result = await createWord({ word: item.content });
    if (result && result.status === 0) {
      getList();
    }
    onCancel();
  };
  const title = (
    <Button type="primary" onClick={() => setDialogVisible(true)}>
      创建敏感词
    </Button>
  );
  const renderColButton = (item: SensitiveItem) => {
    return (
      <>
        <Button size="small" onClick={() => handleDel(item)}>
          删除
        </Button>
      </>
    );
  };
  const renderColTime = (time: number) => <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>;
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
          onChange={(e) => setPageno(e.current || 1)}
          pagination={{ defaultPageSize: 10, showQuickJumper: true, current: pageno }}
        />
        <ModalForm title="创建新敏感词" visible={dialogVisible} onCancel={onCancel} onOk={onOk}>
          <Form.Item label="敏感词" name="content" rules={[{ required: true, message: '必须输入敏感词' }]}>
            <Input type="text" placeholder="请输入敏感词" />
          </Form.Item>
        </ModalForm>
      </Card>
    </Page>
  );
};

export default Sensitive;
