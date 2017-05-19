import './style.scss';

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import PageBox from './PageBox';
import Box from './Box';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.changePage = this.changePage.bind(this);
    this.pageSearchOnSubmit = this.pageSearchOnSubmit.bind(this);
    this.pageSearchOnChange = this.pageSearchOnChange.bind(this);
  }

  changePage(newPage) {
    // offset = page - 1
    const updatedOffset = (newPage - 1) * this.props.routingQuery.limit;
    this.props.addQuery({ offset: updatedOffset });
  }

  pageSearchOnSubmit(event) {
    event.preventDefault();
    this.changePage(this.state.inputValue);
  }

  pageSearchOnChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="pagination">
        <div className="text">
         {'Go to page:'}
        </div>
        <form onSubmit={this.pageSearchOnSubmit}>
          <input
            type="text"
            onChange={this.pageSearchOnChange}
          />
        </form>
        <Box {...this.props} content="First" changePage={this.changePage} />
        <Box {...this.props} content="Previous" changePage={this.changePage} />
        <PageBox {...this.props} changePage={this.changePage} />
        <Box {...this.props} content="Next" changePage={this.changePage} />
        <Box {...this.props} content="Last" changePage={this.changePage} />
      </div>
    );
  }
}

Pagination.propTypes = {
  addQuery: PropTypes.func,
  routingQuery: PropTypes.object,
  maxPage: PropTypes.number,
};

export default Pagination;
