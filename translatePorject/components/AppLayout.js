import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
const AppLayout = ({ children }) => {
  // const [actMenu, setactMenu] = useState('업무 템플릿');

  const [activeItem, setActiveItem] = useState('존댓말 변환');
  const router = useRouter();
  const { user } = useSelector((state) => state.translate);

  const handleItemClick = (e, { name }) => {
    console.log(name);
    if (name === '존댓말 변환') {
      router.replace('/');
    } else {
      router.replace('/template');
    }
    setActiveItem(name);
  };

  return (
    <div>
      <Menu tabular attached="top">
        <Menu.Item
          name="존댓말 변환"
          active={activeItem === '존댓말 변환'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="업무 템플릿"
          active={activeItem === '업무 템플릿'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right" style={{ padding: '10px' }}>
          {user == null ? <Login /> : <Logout />}
        </Menu.Menu>
      </Menu>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};
export default AppLayout;
