import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Checkbox, LeftMenu, Nav } from 'react-admin-panel';
import 'react-admin-panel/lib/bundle.css'; // TODO this should be automated better

const App = (props) => {
  return (
    <div>
      <LeftMenu
        headerLogoSrc={require('../../../client/asset/image/altitude-logo.png')}
      >
      hey!
      {props.children}
      </LeftMenu>
      <Nav router={props.router} />
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

const mapStateToProps = (store) => {
  return {
    router: store.routing.locationBeforeTransitions,
  };
};

export default connect(mapStateToProps)(App);