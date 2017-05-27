import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link, withRouter } from 'react-router';
import classNames from 'classnames';

class Menu extends Component {
  renderHeader(header) {
    if (!header) return;
    const { classNameHeader } = this.props;

    return (
      <div
        key="header"
        className={classNames(classNameHeader)}
      >
        {header}
      </div>
    );
  }

  renderName(item, indexRoute) {
    if (!item || !item.name) return;

    const { name, link } = item;
    const { onSelected, classNameActive } = this.props;
    const LinkComponent = indexRoute ? IndexLink : Link;

    return (
      <LinkComponent
        to={link}
        key="name"
        onClick={onSelected}
        activeClassName={classNames(classNameActive)}
      >
        {name}
      </LinkComponent>
    );
  }

  renderMenuItem(item, key) {
    const classes = [];
    const { router, active, className, classNameItem } = this.props;

    const { name, link, header, items, indexRoute } = item;
    const activeItem = link && router.isActive(link);

    if (header) {
      classes.push(className);
    } else {
      classes.push(classNameItem);
      if (items && items.length > 0) {
        classes.push('dropdown');
      }
    }

    if (active && activeItem && !indexRoute) classes.push('open');

    return (
      <div
        key={key}
        className={classNames(classes)}
      >
        {[
          this.renderHeader(header),
          this.renderName({ name, link }, indexRoute),
          this.renderMenuItems(items, key),
        ]}
      </div>
    );
  }

  renderMenuItems(items, key) {
    if (!items) return;
    const { classNameSubMenu } = this.props;

    return (
      <div
        key={key}
        className={classNames(classNameSubMenu)}
      >
        {items.map((item, index) => this.renderMenuItem(item, index))}
      </div>
    );
  }

  render() {
    const { item } = this.props;
    return this.renderMenuItem(item, -1);
  }
}

Menu.defaultProps = {
  item: {},
  active: false,
  onSelected: () => {},
  className: 'menu',
  classNameHeader: 'header',
  classNameActive: 'active',
  classNameItem: 'menu-item',
  classNameSubMenu: 'sub-menu',
};

Menu.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  onSelected: PropTypes.func,
  className: PropTypes.string,
  classNameItem: PropTypes.string,
  classNameHeader: PropTypes.string,
  classNameActive: PropTypes.string,
  classNameSubMenu: PropTypes.string,
  router: PropTypes.object.isRequired,
};

export default withRouter(Menu);
