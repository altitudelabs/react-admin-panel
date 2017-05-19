import './style.scss';

import React, { Component, PropTypes } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  getCurrentPage() {
    return Math.floor(this.props.routingQuery.offset / this.props.routingQuery.limit) + 1;
  }

  getClass() {
    const currentPage = this.getCurrentPage();
    return (currentPage === Number(this.props.content)) ? 'box active' : 'box';
  }

  _onClick() {
    const currentPage = this.getCurrentPage();
    switch (this.props.content) {
      case 'First':
        this.props.changePage(1);
        break;
      case 'Previous':
        if (currentPage > 1) {
          this.props.changePage(currentPage - 1);
        }
        break;
      case 'Next':
        if (currentPage < this.props.maxPage) {
          this.props.changePage(currentPage + 1);
        }
        break;
      case 'Last':
        this.props.changePage(this.props.maxPage);
        break;
      default:
        this.props.changePage(Number(this.props.content));
    }
  }

  render() {
    return (
      <div className={this.getClass()} onClick={this._onClick}>{this.props.content}</div>
    );
  }
}

Box.propTypes = {
  routingQuery: PropTypes.object,
  maxPage: PropTypes.number,
  content: PropTypes.string,
  changePage: PropTypes.func,
};

export default Box;
