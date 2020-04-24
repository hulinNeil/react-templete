import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { router } from 'dva';
import { DownOutlined, LinkOutlined } from '@ant-design/icons';
import { storage } from '@/utils/tools';
import './index.less';
const { NavLink } = router;

const ProductDropdown: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const menuList = storage.getItem('menu_list') || [];

  const ProductList = () => (
    <div className="header-product-list">
      {menuList.map((item, index: number) => (
        <div className="product-col" key={`product-${index}`}>
          <div className="product-col-title">
            <img src={item.icon} alt={item.title} />
            <span>{item.title}</span>
          </div>
          {item.children &&
            item.children.map((pro) =>
              pro.children && pro.children.length ? (
                <NavLink className="product-col-item" activeClassName="active" key={pro.key} to={pro.key} onClick={() => setVisible(false)}>
                  <div className="product-col-item-title">{pro.title}</div>
                </NavLink>
              ) : (
                <a
                  className="product-col-item"
                  key={pro.key}
                  rel="noopener noreferrer"
                  onClick={() => setVisible(false)}
                  target="_blank"
                  href={pro.key}
                >
                  <div className="product-col-item-title">{pro.title}</div>
                  <LinkOutlined />
                </a>
              )
            )}
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown overlay={React.createElement(ProductList)} onVisibleChange={(visible) => setVisible(visible)} visible={visible}>
      <div className={`header-overview header-overview-product ${visible ? 'header-overview-product--open' : ''}`}>
        <span className="name">产品</span>
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default ProductDropdown;
