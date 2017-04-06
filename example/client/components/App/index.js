import React, { PropTypes } from 'react';
import { Checkbox, LeftMenu } from 'react-admin-panel';

import Touchable from '../../composeComponents/Ripple/Touch';
import leftMenuAction from '../LeftMenu/action';

const App = (props) => {
  return (
    <div>
      <Checkbox />
      <div onClick={() => { leftMenuAction.open(); }} style={{ position: 'relative' }}>
        <Touchable />
        click me
      </div>
      <LeftMenu />
      {props.children}
    </div>
  );
};

App.defaultProps = {
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
