import React, { PropTypes } from 'react';

const styles = {
  headerText: {
    fontWeight: 'bold',
  },
};

const HeaderText = (props) => {
  const style = Object.assign({}, styles.headerText, props.customStyle);
  return (
    <div style={style}>
      {props.title}
    </div>
  );
};

HeaderText.defaultProps = {
  customStyle: {},
};

HeaderText.propTypes = {
  title: PropTypes.string,
  customStyle: PropTypes.object,
};

export default HeaderText;
