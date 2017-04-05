import React, { Component } from 'react';
import { deepDiff } from './deepDiff';
import { getDisplayName } from './getDisplayName';
import { defaultNotifier } from './defaultNotifier';

function diffProps(prev, next, displayName) {
  return deepDiff(prev, next, `${displayName}.props`, []);
}

function diffState(prev, next, displayName) {
  if (prev && next) {
    return deepDiff(prev, next, `${displayName}.state`, []);
  }

  return [];
}

function componentDidUpdate(prevProps, prevState) {
  const displayName = getDisplayName(this);

  if (/^WhyDidYouUpdate/.test(displayName)) { return; }

  const diffs =
    diffProps(prevProps, this.props, displayName)
      .concat(diffState(prevState, this.state, displayName));

  diffs.forEach(defaultNotifier);
}

// export const whyDidYouUpdate = (React) => {
//   const _componentDidUpdate = React.Component.prototype.componentDidUpdate;
//   const _createClass = React.createClass;
//
//   React.Component.prototype.componentDidUpdate = createComponentDidUpdate();
//
//   React.__WHY_DID_YOU_UPDATE_RESTORE_FN__ = () => {
//     React.Component.prototype.componentDidUpdate = _componentDidUpdate;
//     React.createClass = _createClass;
//     delete React.__WHY_DID_YOU_UPDATE_RESTORE_FN__;
//   };
//
//   return React;
// };

const wrapper = ComposedComponent => {
  if (__ENV__ === 'production') {
    return ComposedComponent;
  }

  return class WhyDidYouUpdate extends Component {
    componentDidUpdate(prevProps, prevState) {
      componentDidUpdate.call(this, prevProps, prevState);
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };
};


export default componentDidUpdate;
export {
  wrapper as whyDidYouUpdateWrapper,
  componentDidUpdate,
};
