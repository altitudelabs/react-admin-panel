import './style.scss';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { checked } = this.props;
    if (checked !== this.state.checked) this.setState({ checked });
  }

  componentWillReceiveProps(props) {
    const { checked } = props;
    if (checked !== this.state.checked) this.setState({ checked });
  }

  onChange() {
    const { onCheck } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked });
    if (onCheck) onCheck(checked);
  }

  render() {
    const {
      className,
    } = this.props;
    const { checked } = this.state;

    return (
      <div
        style={this.style}
        onClick={this.onChange}
        className={classnames(
          'checkbox',
          className
        )}
      >
        <input
          type={'checkbox'}
          checked={checked}
        />
        <label
          htmlFor={'checkbox'}
        >this is label</label>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  checked: false,
};

Checkbox.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  checked: PropTypes.bool,
  onCheck: PropTypes.func,
  className: PropTypes.string,
};


export default Checkbox;
