import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const getItemSpec = (containerWidth, maxItemWidth, gutter) => {
  const perRowCount = Math.ceil((containerWidth + gutter) / (maxItemWidth + gutter));
  const gutterCount = perRowCount - 1;

  const itemWidth = (containerWidth - (gutter * gutterCount)) / perRowCount;

  return {
    perRowCount,
    width: itemWidth,
  };
};


const renderRow = (rowData, width, gutter, itemRenderer) => {
  return rowData.map((data, i) => (
    <div
      key={i}
      className={'item'}
      style={{
        width: i === 0 ? width : width + gutter,
        paddingLeft: i === 0 ? 0 : gutter,
      }}
    >
      {itemRenderer(data)}
    </div>
  ));
};

// TODO can optimize by re-rendering only when perRowCount changes, and let css handle in-between layout
const Grid = (props) => {
  const {
    itemData,
    containerWidth,
    verticalGutter,
    horizontalGutter,
    maxItemWidth,
    itemRenderder,
  } = props;
  const itemSpec = getItemSpec(containerWidth, maxItemWidth, horizontalGutter);

  const rowDataArray = _.chunk(itemData, itemSpec.perRowCount);

  return (
    <div className={'compose-grid'}>
      {rowDataArray.map((rowData, i) => {
        return (
          <div
            key={i}
            className={'row'}
            style={{
              paddingTop: i === 0 ? 0 : verticalGutter,
            }}
          >
            {renderRow(rowData, itemSpec.width, horizontalGutter, itemRenderder)}
          </div>
        );
      })}
    </div>
  );
};

Grid.defaultProps = {
  verticalGutter: 0,
  horizontalGutter: 0,
};

Grid.propTypes = {
  itemRenderder: PropTypes.func.isRequired,
  itemData: PropTypes.array.isRequired,
  containerWidth: PropTypes.number.isRequired,
  verticalGutter: PropTypes.number.isRequired,
  horizontalGutter: PropTypes.number.isRequired,
  maxItemWidth: PropTypes.number.isRequired,
};

export default pure(Grid);
