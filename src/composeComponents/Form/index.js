import React, { PropTypes } from 'react';

import Button from './../../ThemedElements/Button';

const styles = {
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const Form = (props) => {
  const onKeyPress = (keyCode) => {
    if (keyCode === 13) {
      props.onSubmit();
    }
  };
  const renderChildren = () => {
    return React.Children.map(props.children, child => {
      return (child && props.enableEnterKeyPress) ? React.cloneElement(child, {
        onKeyPress,
      }) : child;
    });
  };
  return (
    <div
      className={'form'}
      style={props.customStyle}
    >
      {renderChildren()}
      <div style={styles.buttonGroup}>
        <Button
          customStyle={props.submitButtonCustomStyle}
          hoveredStyle={props.submitButtonHoveredStyle}
          disabled={props.disableSubmit}
          onClick={() => {
            props.onSubmit();
          }}
        >
          {props.submitLabel}
        </Button>
        {
          props.cancelable ? (
            <Button
              customStyle={props.cancelButtonCustomStyle}
              hoveredStyle={props.cancelButtonHoveredStyle}
              onClick={() => {
                props.onCancel();
              }}
            >
              {props.cancelLabel}
            </Button>
          ) : null
        }
      </div>
    </div>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
  disableSubmit: false,
  customStyle: {},
  cancelable: false,
  cancelLabel: 'Discard',
  enableEnterKeyPress: false,
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onSubmit: PropTypes.func,
  disableSubmit: PropTypes.bool,
  submitLabel: PropTypes.string,
  customStyle: PropTypes.object,
  submitButtonCustomStyle: PropTypes.object,
  submitButtonHoveredStyle: PropTypes.object,
  cancelable: PropTypes.bool,
  cancelButtonCustomStyle: PropTypes.object,
  cancelButtonHoveredStyle: PropTypes.object,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  enableEnterKeyPress: PropTypes.bool,
};

export default Form;
