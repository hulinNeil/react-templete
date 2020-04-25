import React from 'react';
import { Card, Form, Input, Cascader, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Page from '@/components/Page';
import './index.less';
import { validateMailContent } from '@/utils/validateForm';

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

const Create: React.FC<{}> = () => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
    ],
  };

  const onFinish = (e: any) => {
    console.log('=======', e);
  };

  const initialValues = {
    title: null,
    system: null,
    mailTitle: null,
    content: '<p><br></p>',
  };

  return (
    <Page title="创建新模板" showArrow={true}>
      <Card className="mail-editor">
        <Form name="mail-editor" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="模板名称" name="title" rules={[{ required: true, message: '必须输入模板名称' }]}>
            <Input type="text" placeholder="请输入模板名称" />
          </Form.Item>
          <Form.Item label="所属系统" name="system" rules={[{ required: true, message: '必须指定所属系统' }]}>
            <Cascader options={options} placeholder="请选择业务方和所属系统"></Cascader>
          </Form.Item>
          <Form.Item label="邮件标题" name="mailTitle" rules={[{ required: true, message: '必须输入邮件标题' }]}>
            <Input placeholder="请输入邮件标题" />
          </Form.Item>
          <Form.Item
            className="mail-editor-content"
            label="邮件正文"
            name="content"
            rules={[{ required: true, message: '必须输入邮件内容' }, { validator: validateMailContent }]}
          >
            <ReactQuill theme="snow" modules={modules} placeholder="请输入邮件模板" />
          </Form.Item>
          <Form.Item className="mail-editor-submit">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button onClick={() => history.back()}>取消</Button>
          </Form.Item>
        </Form>
      </Card>
    </Page>
  );
};

export default Create;
