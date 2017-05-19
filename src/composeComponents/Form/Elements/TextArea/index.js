import React, { Component, PropTypes } from 'react';

import HeaderText from './../HeaderText';

const styles = {
  input: {
    borderRadius: '3px',
    border: '1px solid #D5D5D5',
    padding: '5px 10px',
  },
  errorMessage: {
    color: 'red',
  },
};

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationResult: {
        valid: true,
      },
    };
  }
  validate() {
    const validationResult = this.props.validate(this.props.value);
    this.setState({ validationResult });
    return validationResult.valid;
  }
  render() {
    const style = Object.assign({}, styles.input, this.props.customStyle);
    return (
      <div>
        {
          !!this.props.headerText ?
            <HeaderText
              title={this.props.headerText}
            /> :
            null
        }
        <textarea
          style={style}
          rows={this.props.rows}
          cols={this.props.cols}
          value={this.props.value || ''}
          placeholder={this.props.placeholder}
          onKeyPress={(target) => { this.props.onKeyPress(target.charCode); }}
          onChange={(event) => {
            const newText = event.target.value;
            this.props.onTextChange(newText);
            this.setState({
              value: newText,
              validationResult: this.props.validate(newText),
            });
          }}
          maxLength={this.props.maxLength}
        />
        {
          this.state.validationResult.valid ?
            null :
            <div style={styles.errorMessage}>
              {this.state.validationResult.message}
            </div>
        }
      </div>
    );
  }
}

TextArea.defaultProps = {
  type: 'text',
  onTextChange: () => {},
  maxLength: 1000,
  disabled: false,
  validate: () => { return { valid: true }; },
  onKeyPress: () => {},
  placeholder: '',
  customStyle: {},
  value: '',
};

TextArea.propTypes = {
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
  rows: PropTypes.number,
  cols: PropTypes.number,
};

export default TextArea;
