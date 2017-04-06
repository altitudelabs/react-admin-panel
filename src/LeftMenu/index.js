import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';

import './style.scss';

import Header from './Header';
import Menu from './Menu';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
    };

    this.onSelected = this.onSelected.bind(this);
  }

  componentWillMount() {
    let selectedKey = -1;
    const { router, items } = this.props;

    items.forEach((menu, index) => {
      const menuItems = menu.items || [];
      const filter = menuItems.filter(item => item.link && router.isActive(item.link))[0];
      if (filter) selectedKey = index;
    });

    if (selectedKey > -1) this.setState({ selectedKey });
  }

  onSelected(selectedKey) {
    const selectedKeyState = this.state.selectedKey || -1;
    if (selectedKeyState === selectedKey) {
      this.setState({ selectedKey: -1 });
    } else {
      this.setState({ selectedKey });
    }
  }

  renderItems() {
    const { selectedKey } = this.state;
    const { items } = this.props;

    return items.map((item, key) => (
      <Menu
        index={key}
        item={item}
        active={selectedKey === key}
        onSelected={() => this.onSelected(key)}
      />
    ));
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className)}>
        <Header />
        {this.renderItems()}
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  items: [
    {
      header: 'General',
      items: [
        {
          name: 'Transaction',
          link: '/admin/transactions',
          items: [
            {
              name: 'All',
              indexRoute: true,
              link: '/admin/transactions',
            },
            {
              name: 'Current',
              link: '/admin/transactions/current',
            },
            {
              name: 'Historical',
              link: '/admin/transactions/historical',
            },
          ],
        },
        {
          name: 'Users',
          link: '/admin/users',
        },
        {
          name: 'Delivery Schedule',
          link: '/admin/delivery-schedule',
        },
        {
          name: 'Promotion',
          link: '/admin/promotions',
        },
        {
          name: 'Anlytics',
          link: '/admin/anlytics',
        },
      ],
    },
    {
      header: 'Account',
      items: [
        {
          name: 'Logout',
          link: '/logout',
        },
      ],
    },
  ],
  className: 'left-menu',
};

LeftMenu.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};


export default withRouter(LeftMenu);
