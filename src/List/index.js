import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import Moment from 'moment';
import _ from 'lodash';
import './style.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {},
      selectedKey: {},
      dataSource: [],
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const { dataSource } = this.props;
    this.setState({ dataSource });
  }

  componentWillReceiveProps(props) {
    const dataSourceProps = props.dataSource || [];
    const dataSourceState = this.state.dataSource || [];

    if (_.differenceWith(dataSourceProps, dataSourceState, _.isEqual)) {
      const sortState = this.state.sort || {};
      const dataSource = this.sortDataSource(dataSourceProps, sortState);
      this.setState({ dataSource });
    }

    if (props.selectedKey !== this.state.selectedKey) {
      this.setState({ selectedKey: props.selectedKey });
    }
  }

  onSelect(key, checked, item, all) {
    let ids = {};
    let items = [];
    const { onSelectChange } = this.props;
    const { dataSource, selectedKey } = this.state;

    if (all) {
      if (checked) {
        items = [...dataSource];
        ids = items.reduce((obj, _item) => {
          obj[_item.id] = true;
          return obj;
        }, {});
      }
    } else {
      ids = { ...selectedKey, [item.id]: checked };
      if (!checked) delete ids[item.id];
      items = dataSource.filter(_item => ids[_item.id]);
    }

    this.setState({ selectedKey: ids });
    if (onSelectChange) onSelectChange(key, items, all);
  }

  get getItemConfig() {
    const { dataSource = [] } = this.state;
    const { itemConfig = [] } = this.props;
    if (itemConfig.length > 0) return itemConfig;
    return Object.keys(dataSource[0] || {}).map(key => ({ key }));
  }

  get classRoot() {
    const { className } = this.props;
    return classNames('list-table', className);
  }

  sortDataSource(items, sort) {
    const { key, descending } = sort || {};
    const data = this.getItemConfig.filter(item => item.key === key)[0] || {};
    if (!key) return items;
    return items.sort((a, b) => {
      if (data.date) {
        a = { ...a, [key]: Moment(a[key]) };
        b = { ...b, [key]: Moment(b[key]) };
      }

      const [first, second] = descending ? [a, b] : [b, a];
      if (first[key] < second[key]) return 1;
      if (first[key] > second[key]) return -1;
      return 0;
    });
  }

  sort(field) {
    const { onSort } = this.props;
    const sortState = this.state.sort || {};
    const items = this.state.dataSource || [];
    sortState.key = field;
    sortState.descending = !sortState.descending;

    const dataSource = this.sortDataSource(items, sortState);

    this.setState({ dataSource, sort: sortState });
    if (onSort) onSort(dataSource, sortState);
  }

  renderHeader(item, ...arg) {
    const sortState = this.state.sort || {};
    const { renderHeader } = this.props;
    if (renderHeader) return renderHeader(item, ...arg);
    const visibles = this.getItemConfig.filter(config =>
      config.visible || config.checkbox || config.visible === undefined
    );

    const { selectedKey, dataSource } = this.state;
    const all = Object.keys(selectedKey).length === dataSource.length && dataSource.length !== 0;

    return (
      <div className="row header" key="header">
        {visibles.map((config, itemIndex) => {
          const { key, alias, visible, checkbox, sort } = config;
          const visibleText = (visible || visible === undefined) && (alias || key);
          const itemClass = ['item'];
          if (sort) itemClass.push('sort');
          if (sortState.key === key && sortState.descending) itemClass.push('descending');
          return (
            <div
              key={itemIndex}
              onClick={() => (!checkbox && sort) && this.sort(key)}
              className={itemClass.join(' ')}
            >
              {(visibleText || '').split(/(?=[A-Z])/).join(' ')}
              {checkbox && (
                <Checkbox
                  checked={all}
                  onCheck={() => this.onSelect(key, !all, item, true)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  renderRow(item, index, ...arg) {
    const { selectedKey } = this.state;
    const { renderRow, itemClick } = this.props;
    const classes = ['row'];
    if (selectedKey[item.id]) classes.push('selectedKey');

    if (renderRow) return renderRow(item, ...arg);
    const visibles = this.getItemConfig.filter(config =>
      config.visible || config.checkbox || config.visible === undefined
    );

    return (
      <div
        key={index}
        onClick={(e) => itemClick(item, e)}
        className={classNames(classes.join(' '))}
      >
        {visibles.map((config, itemIndex) => {
          const { key, visible, prefix, nextfix, checkbox, format = 'DD/MMM/YYYY', date } = config;
          let visibleText = (visible || visible === undefined) && item[key];
          if (date) visibleText = Moment(visibleText).format(format);
          if (prefix) visibleText = `${prefix} ${visibleText}`;
          if (nextfix) visibleText = `${visibleText} ${nextfix}`;

          return (
            <div
              className="item"
              key={itemIndex}
              onClick={() => this.onSelect(key, !selectedKey[item.id], item)}
            >
              {visibleText}
              {checkbox && (
                <Checkbox
                  checked={selectedKey[item.id]}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  renderRows() {
    const { dataSource } = this.state;
    return dataSource.map(this.renderRow);
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div className={this.classRoot}>
        {this.renderHeader(dataSource[0] || {})}
        {this.renderRows()}
      </div>
    );
  }
}

List.defaultProps = {
  selectedKey: {},
  dataSource: [],
  itemClick: () => {},
};

List.propTypes = {
  dataSource: PropTypes.array,
  itemConfig: PropTypes.array,
  onSort: PropTypes.func,
  itemClick: PropTypes.func,
  renderRow: PropTypes.func,
  className: PropTypes.string,
  selectedKey: PropTypes.object,
  renderHeader: PropTypes.func,
  onSelectChange: PropTypes.func,
};


export default List;
