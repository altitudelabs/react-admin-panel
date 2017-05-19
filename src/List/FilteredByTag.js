import React, { PropTypes } from 'react';
import _ from 'lodash';

const styles = {
  tagContainer: {
    borderRadius: '16px',
    backgroundColor: '#D9D9D9',
    color: '#363636',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '5px 10px',
    display: 'flex',
    flexShrink: '0',
    height: '18px',
    marginTop: '3px',
    marginRight: '5px',
  },
  cross: {
    marginLeft: '15px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '13px',
  },
};

const FilteredByTag = (props) => {
  const {
    key,
    value,
    label,
    onDelete,
  } = props;
  return (
    <div style={styles.tagContainer}>
      {label}{value}
      <div
        style={styles.cross}
        onClick={onDelete}
      >
        {'X'}
      </div>
    </div>
  );
};

FilteredByTag.defaultProps = {
  onDelete: () => {},
  label: 'key',
  value: 'value',
};

FilteredByTag.propTypes = {
  onDelete: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
};


export default FilteredByTag;
