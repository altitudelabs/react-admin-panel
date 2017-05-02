import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import className from 'classnames';
import { IndexLink, Link } from 'react-router';

import './style.scss';

import action from './action';
import reducer from './reducer';
import Divider from '../../composeComponents/Divider';

class LeftMenu extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.open !== nextProps.open) {
      document.getElementsByTagName('body')[0].className = nextProps.open ? 'no-scroll' : '';
    }
  }

  renderLink(link, key) {
    const LinkComponent = link.href === '/' ? IndexLink : Link;
    return (
      <li className={'item'} key={key || null}>
        <LinkComponent to={link.href} onClick={e => e.stopImmediatePropagation} className={'fill'} activeClassName={'current-link'}>
          <Touchable />
          {_.startCase(link.label)}
        </LinkComponent>
      </li>
    );
  }

  render() {
    const {
      open,
    } = this.props;

    const links = [
      {
        href: '/sample',
        label: 'sample',
      },
    ];

    // TODO may be able to optimize height calc like flipkart on touchmove
    return (
      <div className={className('left-menu', { open })}>
        <div
          className={'overlay'}
          onClick={action.close}
        />
        <div className={'menu-container'}>
          <div className={'menu'}>
            <ul>
              {this.renderLink({ href: '/', label: 'home' })}
              <Divider
                verticalMargin={10}
              />
              {links.map(this.renderLink)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

LeftMenu.defaultProps = {
};

LeftMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const LeftMenuState = state.LeftMenu.toJS();
  return {
    open: LeftMenuState.open,
  };
};

const connectedLeftMenu = connect(
  mapStateToProps,
)(LeftMenu);

export default connectedLeftMenu;

export {
  reducer,
  action,
};
