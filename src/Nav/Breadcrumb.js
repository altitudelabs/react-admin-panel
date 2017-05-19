import './style.scss';

import React, { PropTypes } from 'react';

const Breadcrumb = (props) => {
  const _onClick = () => {
    props.onClick(props.index);
  };

  const headerClass = (props.header) ? 'header' : '';

  const decode = (label) => {
    const isEncoded = (text) => {
      return typeof text === 'string' && decodeURI(text) !== 'string';
    };
    return (isEncoded(label)) ? decodeURI(label) : label;
  };

  return (
    <div
      className={`breadcrumb ${headerClass}`}
      onClick={_onClick}
    >
        {decode(props.label)}
    </div>
  );
};

Breadcrumb.defaultProps = {
  label: {},
  onClick: () => {},
  index: 0,
  header: false,
};

Breadcrumb.propTypes = {
  header: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
};


export default Breadcrumb;
