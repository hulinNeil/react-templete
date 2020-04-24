import React from 'react';
import intl from 'react-intl-universal';
import { Row, Badge } from 'antd';
import { router } from 'dva';
import { MailOutlined } from '@ant-design/icons';
const { NavLink } = router;

import { storage } from '@/utils/tools';
import AvatarDropdown from './AvatarDropdown';
import LangDropdown from './LangDropdown';
import ProductDropdown from './ProductDropdown/index';
import ShortcutList from './Shortcut';
import './index.less';

const Header: React.FC<{}> = () => {
  const menuListLocal = storage.getItem('menu_list');
  let menuList: Array<any> = [];
  menuListLocal &&
    menuListLocal.forEach((item) => {
      menuList = menuList.concat(item.children);
    });
  const isSingleProduct = menuList.filter((item) => item.children).length < 4;

  return (
    <Row className="header">
      <div>
        <div className="header-unit header-logo">
          <span className="header-logo-inner"></span>
        </div>
        <div className="header-unit header-service">
          <NavLink className="header-overview" to="/">
            <span className="header-overview-text">{intl.get('header')}</span>
          </NavLink>
          {!isSingleProduct && <ProductDropdown></ProductDropdown>}
        </div>
        <ShortcutList single={isSingleProduct} />
      </div>
      <ul className="header-right">
        <li className="header-notify">
          <Badge count={1} className="header-notify-badge">
            <MailOutlined />
          </Badge>
        </li>
        <li className="header-language">
          <LangDropdown />
        </li>
        <li className="header-user">
          <AvatarDropdown />
        </li>
      </ul>
    </Row>
  );
};

export default Header;
