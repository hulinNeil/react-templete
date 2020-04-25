import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';

interface ModalType {
  title: string;
  content: string;
  onCancel?: () => void;
  onOk?: () => void;
}

const warning = ({ title, content, onCancel, onOk }: ModalType): void => {
  const modal = Modal.confirm({
    title,
    content: (
      <div className="custom-modal-warning">
        <ExclamationCircleOutlined className="custom-modal-warning-icon" />
        <div className="custom-modal-warning-body">{content}</div>
      </div>
    ),
    className: 'custom-modal',
    onCancel: () => {
      modal.destroy();
      onCancel && onCancel();
    },
    onOk: () => {
      modal.destroy();
      onOk && onOk();
    },
  });
};

export default { warning };
