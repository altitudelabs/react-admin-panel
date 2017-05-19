import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import CheckBox from './../composeComponents/Form/Elements/CheckBox/index';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.putSortArrow = this.putSortArrow.bind(this);
  }

  putSortArrow(key, column) {
    const {
      sortKey,
      sortOrder,
    } = this.props;
    let activeClass = '';
    let ascendClass = '';
    if (sortKey) {
      if (sortOrder === 'asc') {
        ascendClass = 'ascending';
      }
      if (sortKey === column.sort) {
        activeClass = 'active';
      } else {
        ascendClass = ''; // reset
      }
    }
    return (
      <div className={`sort-arrow ${activeClass} ${ascendClass}`}></div>
    );
  }

  render() {
    return (
      <div className={'row header'}>
        {
          this.props.noCheckBox ? (
            null
          ) : (
            <CheckBox
              fieldCustomStyle={{
                marginLeft: '15px',
              }}
              check={() => {
                this.props.checkAll(!this.state.checked);
                this.setState({
                  checked: !this.state.checked,
                });
              }}
              checked={this.state.checked}
            />
          )
        }
        {_.map(this.props.item, (value, key) => {
          const sortable = _.get(value, 'sort', null);
          const sortableClass = sortable ? 'sortable' : '';
          return (
            <div
              key={key}
              className={`column ${sortableClass} header-col-${key}`}
              onClick={() => {
                if (sortable) {
                  this.props.sort(value.sort);
                }
              }}
            >
              {value.key}
              {sortable ? this.putSortArrow(key, value) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

Header.defaultProps = {
  item: [],
  checkAll: () => {},
  noCheckBox: false,
  sortKey: null, // e.g. 'community', '-community' (desc)
  sortOrder: null, // asc / desc
  sort: () => {},
};

Header.propTypes = {
  item: PropTypes.array,
  checkAll: PropTypes.func,
  noCheckBox: PropTypes.bool,
  sortKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // null
  ]),
  sortOrder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // null
  ]),
  sort: PropTypes.func,
};


export default Header;
