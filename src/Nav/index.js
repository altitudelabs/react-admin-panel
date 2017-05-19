import './style.scss';

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from './Breadcrumb';

// HEADER > menu1 > menu2 > ....

const Nav = (props) => {
  const pathArray = props.router.pathname.split('/').slice(1);
  const header = pathArray[0];
  const menu = pathArray.slice(1);

  const breadcrumbOnClick = (index) => {
    // ['', header, menu[0], menu[1]]
    const path = props.router.pathname.split('/').slice(0, index + 3);
    browserHistory.push(path.join('/'));
  };

  const formatPath = (text) => {
    const textArray = text.split('-');
    textArray.forEach((element, index) => {
      textArray[index] = element.charAt(0).toUpperCase() + element.substr(1);
    });
    return textArray.join(' ');
  };

  return (
    <div className={'nav'}>
      <Breadcrumb
        key={'bcHeader'}
        onClick={breadcrumbOnClick}
        index={-1}
        label={formatPath(header)}
        header
      />
    {menu.map((path, index) => {
      return (
        <div key={index} className={'menu'}>
          <div className={'arrow'}>{'>'}</div>
          <Breadcrumb
            label={formatPath(path)}
            onClick={breadcrumbOnClick}
            index={index}
          />
        </div>
      );
    })}
    </div>
  );
};

Nav.defaultProps = {
  router: {},
};

Nav.propTypes = {
  router: PropTypes.object,
};


export default Nav;

