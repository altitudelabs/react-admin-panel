import React from 'react';
import calssNames from 'classnames';

const Header = () => {
  const itemClass = calssNames(
    'header'
  );
  return (
    <div
      className={itemClass}
    >
      {'LOGO'}
      <div className={'logo'}></div>
    </div>
  );
};

Header.defaultProps = {
};

Header.propTypes = {
};


export default Header;
