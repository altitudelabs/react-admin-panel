import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import './style.scss';

import Header from './Header';

const checkIsLink = link => link.link && !link.links; // link does not have any children

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderSection = this.renderSection.bind(this);
  }

  renderSection(section) {
    const getAllLinks = (links) => {
      const linksArray = links.map((link) => {
        if (checkIsLink(link)) {
          return link.link;
        }
        return getAllLinks(link.links);
      });
      return _.flattenDeep(linksArray);
    };

    const sectionLinks = getAllLinks(section.links);

    // check if any link exact matches the current route
    const isMatch = _.some(sectionLinks, link => matchPath(link, true));
    return (
      <div className={classnames('section', { match: isMatch })} key={section.sectionHeader}>
        <div className={'section-header'}>
          <span>{section.sectionHeader}</span>
        </div>
        <div className={'section-links'}>
          {section.links.map(link => this.renderLink(link))}
        </div>
      </div>
    );
  }

  renderLink(link) {
    if (!link.link) {
      return (
        <div key={link.label} className={'section-link'}>
          {link.label}
        </div>
      );
    }
    return (
      <NavLink key={link.label} className={'link fill section-link'} to={link.link}>
        {link.label}
      </NavLink>
    );
  }

  render() {
    const {
      links,
      renderHeader,
      width,
      children,
    } = this.props;
    return (
      <div className={'left-menu-container'}>
        <div
          className={'left-menu'}
          style={{
            width,
          }}
        >
          {renderHeader()}
          {links.map(this.renderSection)}
        </div>
        <div className={'content-container'}>
          {children}
        </div>
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  links: [
    {
      sectionHeader: 'General',
      links: [
        {
          label: 'Transaction',
          links: [
            {
              label: 'All',
              indexRoute: true,
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
  width: 200,
  children: null,
};

LeftMenu.defaultProps = {
  renderHeader: () => <Header />,
};

LeftMenu.propTypes = {
  links: PropTypes.array,
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  renderHeader: PropTypes.func,
};


export default withRouter(LeftMenu);
