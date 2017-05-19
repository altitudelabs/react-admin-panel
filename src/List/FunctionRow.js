import React, { PropTypes } from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import Search from './../composeComponents/Search';
import Button from './../ThemedElements/Button';
import FilteredByTag from './FilteredByTag';

const styles = {
  row: {
    display: 'flex',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#98B5A7',
    color: 'white',
    padding: '5px 15px',
  },
  addButtonHovered: {
    backgroundColor: '#60756b',
  },
  deleteButton: {
    backgroundColor: '#A6A8AC',
    color: 'white',
    padding: '5px 15px',
    marginRight: '5px',
  },
  deleteButtonHovered: {
    backgroundColor: '#6A6C6F',
  },
};

const FunctionRow = (props) => {
  const {
    checkedStatus,
  } = props;

  const display = (_.indexOf(checkedStatus, true) !== -1);

  const setDeleteButton = () => {
    return (display) ? (
      <Button
        customStyle={styles.deleteButton}
        hoveredStyle={styles.deleteButtonHovered}
        onClick={() => {
          props.delete();
        }}
      >
        <div className={'delete'}></div>
        {'Delete'}
      </Button>
    ) : null;
  };

  const setCreateButton = () => {
    return (
      <Button
        customStyle={styles.addButton}
        hoveredStyle={styles.addButtonHovered}
        onClick={() => {
          browserHistory.push(`${props.router.pathname}/create`);
        }}
      >
        <div className={'add'}></div>
        {'Create'}
      </Button>
    );
  };

  const setActionButtons = () => {
    return _.map(props.actionButtons, (actionButton, key) => {
      return (display) ? (
        <Button
          className={_.snakeCase(actionButton.label)}
          key={key}
          onClick={() => {
            actionButton.onClick(checkedStatus);
          }}
          customStyle={actionButton.customStyle}
          hoveredStyle={actionButton.hoveredStyle}
        >
          {actionButton.label}
        </Button>
      ) : null;
    });
  };

  const setAdHocButtons = () => {
    return _.map(props.adHocButtons, (adHocButton, key) => {
      return (
        <Button
          key={key}
          onClick={(e) => {
            adHocButton.onClick(e);
          }}
          customStyle={adHocButton.customStyle}
          hoveredStyle={adHocButton.hoveredStyle}
        >
          {adHocButton.label}
        </Button>
      );
    });
  };

  return (
    <div>
      <div style={styles.row}>
        <div style={{ display: 'flex' }}>
          {props.searchable ?
            <Search
              searchFieldPlaceholder={props.searchFieldPlaceholder}
              addQuery={props.addSearchQuery}
            /> :
            <div style={{ height: '40px' }}></div>
          }
          {props.filterable ?
            <div
              className={'filter'}
              onClick={() => {
                props.onFilterButtonClick();
              }}
            >
            </div> : null
          }
        </div>
        <div style={styles.buttonGroup}>
          {props.deletable ?
            setDeleteButton() : null
          }
          {props.actionButtons.length ?
            setActionButtons() : null
          }
          {props.adHocButtons.length ?
            setAdHocButtons() : null
          }
          {props.creatable ?
            setCreateButton() : null
          }
        </div>
      </div>
      {!_.isEmpty(props.queryParams) ? (
        <div>
          <hr />
          <div
            style={Object.assign({}, styles.row, {
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            })}
          >
            {_.map(props.queryParams, (value, key) => {
              return (
                <FilteredByTag
                  key={key}
                  onDelete={() => {
                    props.removeQuery(key);
                  }}
                  value={value === 'true' ? '' : value}
                  label={props.tagLabels[key]}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

FunctionRow.defaultProps = {
  checkedStatus: [],
  delete: () => {},
  actionButtons: [],
  adHocButtons: [],
  queryParams: {},
};

FunctionRow.propTypes = {
  searchFieldPlaceholder: PropTypes.string,
  checkedStatus: PropTypes.array,
  router: PropTypes.object,
  delete: PropTypes.func,
  creatable: PropTypes.bool,
  deletable: PropTypes.bool,
  actionButtons: PropTypes.array,
  adHocButtons: PropTypes.array, // buttons that don't need checkbox
  searchable: PropTypes.bool,
  addSearchQuery: PropTypes.func,
  onFilterButtonClick: PropTypes.func,
  queryParams: PropTypes.object,
  removeQuery: PropTypes.func,
  tagLabels: PropTypes.object,
};


export default FunctionRow;
