import React, { PropTypes, Component } from 'react';
import ElementWrapper from './ElementWrapper';

// Just an example
// TODO delete the file to example or ThemedComponents

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      errorText,
      shouldShowError,
      ...others,
    } = this.props;
    const showError = shouldShowError();

    return (
      <div>
        <input
          {...others}
        />
        {showError ?
          <span>{errorText}</span>
        : null}
      </div>
    );
  }
}

TextInput.defaultProps = {
};

TextInput.propTypes = {
  shouldShowError: PropTypes.func,
  errorText: PropTypes.string,
};

export default ElementWrapper(TextInput);
