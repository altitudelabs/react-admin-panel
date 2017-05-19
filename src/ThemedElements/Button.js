import React, { Component, PropTypes } from 'react';

const styles = {
  button: {
    borderRadius: '5px',
    border: '1px solid #DDDDDD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const style = Object.assign({}, styles.button, this.props.customStyle);
    const hoveredStyle = Object.assign({}, style, this.props.hoveredStyle);
    const {
      hovered,
    } = this.state;
    return (this.props.disabled) ? (
      <div style={style}>
        {this.props.children}
      </div>
    ) : (
      <div
        className={'button'}
        style={hovered ? hoveredStyle : style}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </div>
    );
  }
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  customStyle: {},
  hoveredStyle: {},
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  customStyle: PropTypes.object,
  hoveredStyle: PropTypes.object,
};

export default Button;
