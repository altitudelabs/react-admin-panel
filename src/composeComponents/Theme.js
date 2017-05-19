import React, { PropTypes } from 'react';

const ConstantsProvider = (props) => {
  const {
    constants,
  } = props;

  const childrenWithProps = React.Children.map(
    props.children,
    (child) => {
      if (typeof child.type === 'string') {
        return child;
      }

      return React.cloneElement(child, {
        constants,
      });
    }
  );

  return <div>{childrenWithProps}</div>;
};

ConstantsProvider.defaultProps = {
  constants: {},
};

ConstantsProvider.propTypes = {
  children: PropTypes.node,
  constants: PropTypes.object,
};


export default ConstantsProvider;
