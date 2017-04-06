import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
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
    const isMatch = _.some(sectionLinks, link => this.props.router.isActive(link, true));

    return (
      <div className={classnames('section', { match: isMatch })} key={section.sectionHeader}>
        <div className={'section-header'}>
          <span>{section.sectionHeader}</span>
        </div>
        <div className={'section-links'}>
          {section.links.map(link => (
            <div className={'section-link'} key={link.label}>
              {this.renderLink(link)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderLink(link, level = 1) {
    console.log(link, level);
    const isLink = checkIsLink(link);

    if (isLink) {
      return (
        <div className={'link'}>
          link
        </div>
      );
    }
    return (
      <div>
        links
      </div>
    );
  }

  render() {
    const {
      links,
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
          <Header />
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

LeftMenu.propTypes = {
  links: PropTypes.array,
  router: PropTypes.object.isRequired,
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};


export default withRouter(LeftMenu);
