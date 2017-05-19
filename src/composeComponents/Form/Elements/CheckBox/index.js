import React, { PropTypes } from 'react';

const styles = {
  container: {
    display: 'flex',
  },
};

const CheckBox = (props) => {
  const fieldStyle = Object.assign({}, styles.container, props.fieldCustomStyle);
  return (
    <div style={fieldStyle}>
      <input
        disabled={props.disabled}
        style={props.boxCustomStyle}
        type={"checkbox"}
        checked={props.checked}
        onClick={(event) => {
          event.stopPropagation();
          props.check();
        }}
      />
      <div
        style={props.labelCustomStyle}
      >
        {props.label}
      </div>
    </div>
  );
};

CheckBox.defaultProps = {
  label: '',
  disabled: false,
};

CheckBox.propTypes = {
  check: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelCustomStyle: PropTypes.object,
  boxCustomStyle: PropTypes.object,
  fieldCustomStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CheckBox;
