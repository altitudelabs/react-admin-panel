import './style.scss';

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Item from './Item';
import Header from './Header';
import FunctionRow from './FunctionRow';
import Pagination from './../Pagination';
import { browserHistory } from 'react-router';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: _.map(props.idList, () => false),
      showFilterModal: false,
    };
    this.addQuery = this.addQuery.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.removeQuery = this.removeQuery.bind(this);
  }

  onDelete() {
    const idToBeDeleted = _.filter(this.props.idList, (id, index) => (this.state.checked[index]));
    this.props.onItemDelete(idToBeDeleted);
  }

  addQuery(object) {
    if (_.get(this.props.router.query, 'sort', null) && _.get(object, 'sort', null)) {
      if (this.props.router.query.sort === object.sort) {
        object.sortOrder = (this.props.router.query.sortOrder === 'asc') ? 'desc' : 'asc';
      }
    } else
    if (_.get(object, 'sort', null)) {
      object.sortOrder = 'asc';
    }
    const query = _.isEmpty(object) ? {
      offset: 0,
      limit: this.props.limit,
    } : Object.assign({}, this.props.router.query, object);
    if (_.has(object, 'keyword')) {
      query.offset = 0;
      if (!object.keyword) {
        delete query.keyword;
      }
    }
    if (_.isNil(object.offset)) query.offset = 0;
    browserHistory.replace({
      pathname: this.props.router.pathname,
      query,
    });
    this.props.refresh(query);
  }

  removeQuery(key) {
    const query = _.omit(this.props.router.query, key);
    browserHistory.replace({
      pathname: this.props.router.pathname,
      query,
    });
    this.props.refresh(query);
  }

  renderList() {
    const paginationStyle = this.props.pagination ? 'withPagination' : '';
    if (this.props.itemList.length) {
      return (
        <div className={`${this.props.listType}-list ${paginationStyle}`}>
          <Header
            noCheckBox={this.props.noCheckBox}
            item={this.props.itemList[0]}
            checkAll={(check) => {
              const checked = _.map(this.state.checked, () => check);
              this.setState({ checked });
            }}
            sortKey={_.get(this.props.router.query, 'sort', null)}
            sortOrder={_.get(this.props.router.query, 'sortOrder', null)}
            sort={(sortKey) => {
              this.addQuery({ sort: sortKey });
            }}
          />
          {this.props.itemList.map((item, i) => {
            return (
              <Item
                coloredValues={this.props.coloredValues}
                rowIndex={i}
                noCheckBox={this.props.noCheckBox}
                key={i}
                onClick={() => {
                  this.props.onItemClick(this.props.idList[i]);
                }}
                id={this.props.idList[i]}
                item={item}
                checked={this.state.checked[i]}
                check={() => {
                  const checked = this.state.checked.slice();
                  checked[i] = !checked[i];
                  this.setState({ checked });
                }}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className={'no-item'}>No item to be displayed...</div>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.noFunctionRow ? (
            null
          ) : (
            <div>
              <FunctionRow
                searchable={this.props.searchable}
                searchFieldPlaceholder={this.props.searchFieldPlaceholder}
                addSearchQuery={this.addQuery}
                checkedStatus={this.state.checked}
                router={this.props.router}
                delete={this.onDelete}
                creatable={this.props.creatable}
                deletable={this.props.deletable}
                actionButtons={this.props.actionButtons}
                adHocButtons={this.props.adHocButtons}
                filterable={this.props.filterable}
                onFilterButtonClick={() => {
                  this.setState({ showFilterModal: true });
                }}
                queryParams={_.omit(this.props.router.query, ['limit', 'offset', 'sort', 'sortOrder'])}
                removeQuery={this.removeQuery}
                tagLabels={this.props.tagLabels}
              />
            </div>
          )
        }
        {
          this.props.isLoading ?
            <div>
              {'Loading...'}
            </div> :
            this.renderList()
        }
        {
          !this.props.isLoading && this.props.pagination && this.props.itemList.length ?
            <Pagination
              maxPage={this.props.maxPage}
              routingQuery={this.props.router.query}
              addQuery={this.addQuery}
            /> : null
        }
      </div>
    );
  }
}

List.defaultProps = {
  router: {},
  onItemDelete: () => {},
  onItemClick: () => {},
  itemList: [],
  idList: [],
  creatable: false,
  deletable: false,
  searchable: false,
  filterable: false,
  actionButtons: [],
  adHocButtons: [],
  noCheckBox: false,
  noFunctionRow: false,
  refresh: () => {},
  pagination: false,
  queryParams: {},
  isLoading: false,
};

List.propTypes = {
  coloredValues: PropTypes.object,
  searchFieldPlaceholder: PropTypes.string,
  listType: PropTypes.string,
  router: PropTypes.object,
  onItemDelete: PropTypes.func,
  onItemClick: PropTypes.func,
  creatable: PropTypes.bool,
  deletable: PropTypes.bool,
  searchable: PropTypes.bool,
  itemList: PropTypes.array,
  idList: PropTypes.array,
  actionButtons: PropTypes.array,
  adHocButtons: PropTypes.array,
  noCheckBox: PropTypes.bool,
  noFunctionRow: PropTypes.bool,
  refresh: PropTypes.func,
  filterable: PropTypes.bool,
  filterData: PropTypes.array,
  pagination: PropTypes.bool,
  maxPage: PropTypes.number,
  limit: PropTypes.number,
  queryParams: PropTypes.object,
  isLoading: PropTypes.bool,
  tagLabels: PropTypes.object,
};


export default List;
