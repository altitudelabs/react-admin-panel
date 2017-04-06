import React, { Component, PropTypes } from 'react';
import './style.scss';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }
  componentDidMount() {
    window.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeDropdown);
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  }

  closeDropdown() {
    if (this.state.dropdownIsOpen) {
      this.setState({ dropdownIsOpen: false });
    }
  }
  renderDropdown() {
    const trianglePosition = this.state.dropdownIsOpen ? 'triangle-up' : 'triangle';
    return (
      <div onClick={this.toggleDropdown}>
        <div className="link">
          <div className="wrapcontent">{this.props.title}</div>
          <div className={trianglePosition} >
            <img src="/asset/image/dropdownTriangle@2x.png" alt="triangle" />
          </div>
        </div>
        {this.state.dropdownIsOpen &&
          <div className="dropdown-list">
            {this.props.children}
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      <div >
        {this.renderDropdown()}
      </div>
    );
  }
}

DropdownMenu.defaultProps = {
  title: 'Pass title as prop to replace this',
  children: [<div>item1</div>, <div>item2</div>],
};

DropdownMenu.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default DropdownMenu;
