import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Header = (props) => {
  const itemClass = classNames(
    'header',
  );

  return (
    <div
      className={itemClass}
    >
      <div className={props.headerLogoClassName} />
    </div>
  );
};

Header.defaultProps = {
};

Header.propTypes = {
  headerLogoClassName: PropTypes.string,
};


export default Header;
