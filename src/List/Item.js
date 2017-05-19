import React, { PropTypes } from 'react';
import _ from 'lodash';
import CheckBox from './../composeComponents/Form/Elements/CheckBox';
import Input from './../composeComponents/Form/Elements/Input';
import Button from './../ThemedElements/Button';
import detectType from './../service/dataTypeDetector';

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Item = (props) => {
  const activeClass = (props.checked) ? 'active' : '';
  const format = (value) => {
    switch (detectType(value)) {
      case 'DATE': {
        const timestamp = new Date(value);
        const date = timestamp.getDate();
        const day = DAY[timestamp.getDay()];
        const month = MONTH[timestamp.getMonth()];
        const year = timestamp.getUTCFullYear();
        // const tempHour = timestamp.getHours();
        // const hour = (tempHour < 10) ? `0${tempHour}` : tempHour;
        // const tempMinute = timestamp.getMinutes();
        // const minute = (tempMinute < 10) ? `0${tempMinute}` : tempMinute;
        return `${day}, ${month} ${date}, ${year}`;
      }
      case 'FRACTION': {
        const valueArray = value.split('/');
        return (valueArray[0] === valueArray[1]) ? 'nothing to resolve' : value;
      }
      // assume it's always a text input
      case 'OBJECT': {
        if (_.isNull(value)) {
          return '-';
        }
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => {
                value.buttons[0].onClick(props.rowIndex);
              }}
              customStyle={value.buttons[0].customStyle}
              hoveredStyle={value.buttons[0].hoveredStyle}
            >
              {value.buttons[0].label}
            </Button>
            <Input
              value={value.value}
              customStyle={{ borderRadius: '0', width: '100px' }}
              onTextChange={(text) => {
                value.onChange(props.rowIndex, text);
              }}
              validate={value.validate}
            />
            <Button
              onClick={() => {
                value.buttons[1].onClick(props.rowIndex);
              }}
              customStyle={value.buttons[1].customStyle}
              hoveredStyle={value.buttons[1].hoveredStyle}
            >
              {value.buttons[1].label}
            </Button>
          </div>
        );
      }
      case 'STRING': {
        value = value.toString();
        if (value.substr(0, 8) === '[string]') {
          value = value.substr(8);
        }
        if (value.substr(value.length - 3, value.length) === 'png' ||
            value.substr(value.length - 3, value.length) === 'jpg') {
        // detect image src link - may be better ways
          const imagelink = value;
          value = (<img className="thumbnail" src={imagelink} alt="thumbnail" />);
        }
        return value;
      }
      default:
        return value;
    }
  };

  return (
    <div
      className={`row item ${activeClass}`}
      onClick={() => {
        props.onClick();
      }}
    >
    {
      props.noCheckBox ? (
        null
      ) : (
        <CheckBox
          fieldCustomStyle={{
            marginLeft: '15px',
          }}
          check={props.check}
          checked={props.checked}
        />
      )
    }
      {_.map(props.item, (value, index) => {
        const coloredValueClass =
        props.coloredValues && props.coloredValues.hasOwnProperty(format(value.value))
          ? props.coloredValues[format(value.value)]
          : '';
        const noCapitalizeClass = (detectType(value.value) === 'EMAIL') ? 'no-capitalize' : '';
        // detect 'ft2' and make the 2 superscript
        if (typeof format(value.value) === 'string' && format(value.value).slice(-3) === 'ft2') {
          let string = format(value.value);
          string = string.substr(0, string.length - 1);
          return (
            <div
              key={index}
              className={`column ${noCapitalizeClass} item-col-${index} ${coloredValueClass}`}
            >
              {string}<sup>2</sup>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`column ${noCapitalizeClass} item-col-${index} ${coloredValueClass}`}
          >
            {format(value.value)}
          </div>
        );
      })}
    </div>
  );
};

Item.defaultProps = {
  item: [],
  onClick: () => {},
  checked: false,
  check: () => {},
  noCheckBox: false,
};

Item.propTypes = {
  coloredValues: PropTypes.object,
  item: PropTypes.array,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  check: PropTypes.func,
  rowIndex: PropTypes.number,
  noCheckBox: PropTypes.bool,
};


export default Item;
