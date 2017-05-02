import React, { PropTypes } from 'react';

import { Checkbox, LeftMenu } from 'react-admin-panel';
import 'react-admin-panel/lib/bundle.css'; // TODO this should be automated better

const App = (props) => {
  return (
    <LeftMenu
      headerLogoSrc={require('../../../client/asset/image/logo.png')}>
      hey!
      {props.children}
    </LeftMenu>
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
