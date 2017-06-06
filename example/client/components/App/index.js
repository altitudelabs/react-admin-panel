import React from 'react';
import PropTypes from 'prop-types';
import { LeftMenu } from 'react-admin-panel';

import 'react-admin-panel/lib/bundle.css'; // TODO this should be automated better

const App = (props) => {
  return (
    <LeftMenu
      headerLogoSrc={require('../../../client/asset/image/logo.png')}
      location={props.location}
    >
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
  location: PropTypes.object,
};

export default App;
