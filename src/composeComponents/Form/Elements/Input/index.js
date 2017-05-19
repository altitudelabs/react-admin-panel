import React, { Component, PropTypes } from 'react';

import HeaderText from './../HeaderText';

const styles = {
  input: {
    borderRadius: '3px',
    border: '1px solid #D5D5D5',
    padding: '5px 10px',
    color: '#363636',
  },
  errorMessage: {
    color: 'red',
    margin: '5px 0 0 5px',
  },
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationResult: {
        valid: true,
      },
    };
  }

  componentDidUpdate() {
  }

  validate() {
    const validationResult = this.props.validate(this.props.value);
    this.setState({ validationResult });
    return validationResult.valid;
  }
  render() {
    let style = Object.assign({}, styles.input, this.props.customStyle);
    if (!this.state.validationResult.valid) {
      style = Object.assign({}, style, {
        border: '1px solid red',
      });
    }
    return (
      <div>
        {
          !!this.props.headerText ?
            <HeaderText
              title={this.props.headerText}
              customStyle={{ textTransform: 'capitalize' }}
            /> :
            null
        }
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={this.props.disabled}
          style={style}
          value={_.isNull(this.props.value) ? '' : this.props.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onKeyPress={(target) => { this.props.onKeyPress(target.charCode); }}
          onChange={(event) => {
            const newText = event.target.value;
            this.props.onTextChange(newText);
            this.setState({
              validationResult: this.props.validate(newText),
            });
          }}
          maxLength={this.props.maxLength}
        />
        {
          this.state.validationResult.valid ?
            null :
            <div className='error-message' style={styles.errorMessage}>
              {this.props.validationMessage}
            </div>
        }
      </div>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  onTextChange: () => {},
  maxLength: 100,
  disabled: false,
  validate: () => { return { valid: true }; },
  onKeyPress: () => {},
  placeholder: '',
  customStyle: {},
  value: '',
};

Input.propTypes = {
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
  headerText: PropTypes.string,
  onTextChange: PropTypes.func,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  validationMessage: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Input;
