import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classnames from 'classnames';

import './style.scss';

import LeftMenu from './LeftMenu';

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
    };

    this.onSelected = this.onSelected.bind(this);
  }

  componentWillMount() {
    let selectedKey = -1;
    const { router, links } = this.props;

    links.forEach((menu, index) => {
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

  renderHeader() {

  }

  renderLink() {

  }

  renderDropdown() {

  }

  renderItems() {
    const { links } = this.props;

    _.map(links, (link) => {
      const isSection = link.sectionHeader && link.links.lenght > 0;

      if (isSection) {
        return this.renderSection(link);
      }
    })
  }

  renderSection(section) {
    return (
      <div>
        <div>
          <span></span>
        </div>
      </div>
    )
  }

  render() {
    const {
      className,
      ...others
    } = this.props;

    return (
      <div
        className={classnames(className)}
        {...others}
      >
        <Header />
        {this.renderItems()}
      </div>
    );
  }
}

Skeleton.defaultProps = {
  links: [
    {
      sectionHeader: 'General',
      links: [
        {
          label: 'Transaction',
          links: [
            {
              label: 'All',
              link: '/admin/transactions',
            },
            {
              label: 'Current',
              link: '/admin/transactions/current',
            },
            {
              label: 'Historical',
              link: '/admin/transactions/historical',
            },
          ],
        },
        {
          label: 'Users',
          link: '/admin/users',
        },
        {
          label: 'Delivery Schedule',
          link: '/admin/delivery-schedule',
        },
        {
          label: 'Promotion',
          link: '/admin/promotions',
        },
        {
          label: 'Anlytics',
          link: '/admin/anlytics',
        },
      ],
    },
    {
      sectionHeader: 'Account',
      links: [
        {
          label: 'Logout',
          link: '/logout',
        },
      ],
    },
  ],

  headerHeight: 52,
  leftMenuProps: {},
  className: '',
};


Skeleton.propTypes = {
  headerHeight: PropTypes.number,
  leftMenuProps: LeftMenu.propTypes,
  className: PropTypes.string,
};


export default withRouter(Skeleton);
