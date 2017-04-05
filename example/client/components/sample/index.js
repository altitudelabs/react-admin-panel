import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Touchable from '../../composeComponents/Ripple/Touch';
import action from './action';
import reducer from './reducer';

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      open,
    } = this.props;

    return (
      <div className={className('left-menu', { open })}>
        <Touchable />
      </div>
    );
  }
}

const Sample = (props) => {
  const {
    open,
  } = props;

  return (
    <div className={className('left-menu', { open })}>
      <Touchable />
    </div>
  );
}

Sample.defaultProps = {
};

Sample.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const SampleState = state.LeftMenu.toJS();
  return {
    open: SampleState.open,
  };
};

const connectedSample = connect(
  mapStateToProps
)(Sample);

export default whyDidYouUpdateWrapper(connectedSample);

export {
  reducer,
  action,
};
