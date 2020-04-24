import React, { useEffect, useRef } from 'react';
import { Form, Modal } from 'antd';

export interface ModalFormProps {
  title: string;
  initialValues?: any;
  visible: boolean;
  onCancel?: () => void;
  onOk?: (e: any) => void;
}

// reset from
const useResetFormOnCloseModal = ({ form, visible, initialValues }: any) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    console.log('是否重置数据？？？', visible, prevVisible);
    if (!visible && prevVisible) {
      console.log('清除form的值');
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && !prevVisible && initialValues) {
      console.log('设置form的值');
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
};

const ModalForm: React.FC<ModalFormProps> = ({ title, visible, initialValues, onOk, onCancel, children }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({ form, visible, initialValues });

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    form,
    initialValues: initialValues || {},
  };
  return (
    <Form.Provider
      onFormFinish={(name, { values }) => {
        const formValue = Object.assign(initialValues || {}, values);
        formValue.editTime = new Date().getTime();
        onOk && onOk(formValue);
      }}
    >
      <Modal title={title} forceRender visible={visible} onOk={() => form.submit()} onCancel={onCancel}>
        <Form {...formItemLayout}>{React.Children.map(children, (item) => item)}</Form>
      </Modal>
    </Form.Provider>
  );
};

export default ModalForm;
