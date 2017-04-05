import React, { PropTypes, Component } from 'react';
import Touchable from '../../composeComponents/Ripple/Touch';
import LeftMenu from '../LeftMenu';
import leftMenuAction from '../LeftMenu/action';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div>
        <div onClick={() => { leftMenuAction.open(); }} style={{ position: 'relative' }}>
          <Touchable />
          click me
        </div>
        <LeftMenu />
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
