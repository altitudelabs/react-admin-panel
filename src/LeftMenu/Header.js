import React from 'react';
import calssNames from 'classnames';

const Header = () => {
  const itemClass = calssNames(
    'header',
  );
  return (
    <div
      className={itemClass}
    >
       <img className='logo' src="/asset/image/logo.png" alt="Logo" />
    </div>
  );
};

Header.defaultProps = {
};

Header.propTypes = {
};


export default Header;
