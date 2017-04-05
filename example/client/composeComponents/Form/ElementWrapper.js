import React, { Component, PropTypes } from 'react';
import getDisplayName from 'recompose/getDisplayName';
import setDisplayName from 'recompose/setDisplayName';

const ElementWrapper = WrappedComponent => {
  class FormElementBase extends Component {
    constructor(props) {
      super(props);

      this.shouldShowError = this.shouldShowError.bind(this);
    }

    getErrorText() {
      const {
        validator,
        value,
      } = this.props;
      const validatorArray = _.isArray(validator) ? validator : [validator];

      const firstValidatorToFail = _.find(validatorArray, validate => {
        return !validate(value, getDisplayName(WrappedComponent)).valid;
      });
      const errorText = firstValidatorToFail == null
        ? ''
        : firstValidatorToFail(value, getDisplayName(WrappedComponent)).message;
      return errorText;
    }

    shouldShowError() {
      const {
        formSubmitted,
        shouldShowError,
      } = this.props;

      // by default, show error when form is submitted
      const defaultShouldShow = formSubmitted;

      const shouldShow = defaultShouldShow || shouldShowError();

      /**
       * NOTE
       * this means wrapped component's shouldshowError can override
       * default behaviour to show error message, but not to hide it.
       *
       * i.e. shouldShow is always true if formSubmitted = true
       */
      return shouldShow;
    }

    validate() {
      const {
        validator,
        value,
      } = this.props;

      const validatorArray = _.isArray(validator) ? validator : [validator];
      return _.every(validatorArray, validate => {
        const validationResult = validate(value, getDisplayName(WrappedComponent));
        return validationResult.valid;
      });
    }

    render() {
      const {
        formSubmitted, // eslint-disable-line no-unused-vars
        validator, // eslint-disable-line no-unused-vars
        ...others,
      } = this.props;
      const errorText = this.getErrorText();
      return (
        <WrappedComponent
          {...others}
          shouldShowError={this.shouldShowError}
          errorText={errorText}
        />
      );
    }
  }

  FormElementBase.defaultProps = {
    shouldShowError: () => false,
    formSubmitted: false, // Form-passed prop
  };

  FormElementBase.propTypes = {
    shouldShowError: PropTypes.func,
    formSubmitted: PropTypes.bool,
    validator: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      ),
      PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    ]),
    value: PropTypes.any, // depends on the form input
  };


  return setDisplayName(`FormInput(${getDisplayName(WrappedComponent)})`)(FormElementBase);
};

export default ElementWrapper;
