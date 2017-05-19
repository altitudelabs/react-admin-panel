import './style.scss';

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Box from './Box';

class PageBox extends Component {
  constructor(props) {
    super(props);
    // TODO: Method to define the number of number box to be displayed (=limit)
    this.limit = 3;
    this.displayAllPageBox = this.displayAllPageBox.bind(this);
  }

  displayPageBox(start, end) {
    return (
      <div className="group">
        {
          _.times(end - start + 1, (index) => {
            const page = start + index;
            return (
              <Box
                key={index}
                content={page.toString()}
                {...this.props}
              />
            );
          })
        }
      </div>
    );
  }

  displayAllPageBox() {
    const pageOffset = this.props.routingQuery.offset;
    const pageLimit = this.props.routingQuery.limit;
    const currentPage = Math.floor(pageOffset / pageLimit) + 1;
    const fullLimit = this.limit;
    const halfLimit = Math.floor(fullLimit / 2);
    const maxPage = this.props.maxPage;

    const start1 = 1;
    const end1 = fullLimit;
    const start2 = currentPage - halfLimit;
    const end2 = currentPage + halfLimit;
    const start3 = maxPage - fullLimit + 1;
    const end3 = maxPage;

    // show only 1 group of boxes
    if ((end1 >= start3 - 1) || (end1 >= start2 - 1 && end2 >= start3 - 1)) {
      return (
        <div className="page-box">
          {this.displayPageBox(start1, end3)}
        </div>
      );
    } else
    // show 2 groups of boxes
    if (end1 >= start2 - 1) {
      return (
        <div className="page-box">
          {this.displayPageBox(start1, Math.max(end1, end2))}
          <div className="dot">. . .</div>
          {this.displayPageBox(start3, end3)}
        </div>
      );
    } else
    if (end2 >= start3 - 1) {
      return (
        <div className="page-box">
          {this.displayPageBox(start1, end1)}
          <div className="dot">. . .</div>
          {this.displayPageBox(Math.min(start2, start3), end3)}
        </div>
      );
    }
    // show 3 groups of boxes
    return (
      <div className="page-box">
        {this.displayPageBox(start1, end1)}
        <div className="dot">. . .</div>
        {this.displayPageBox(start2, end2)}
        <div className="dot">. . .</div>
        {this.displayPageBox(start3, end3)}
      </div>
    );
  }

  render() {
    return this.displayAllPageBox();
  }
}

PageBox.propTypes = {
  routingQuery: PropTypes.object,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
};

export default PageBox;
