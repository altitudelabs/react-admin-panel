import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';

import './style.scss';

import Header from './Header';
import DropdownMenu from '../DropdownMenu';

const checkIsLink = link => link.link && !link.links;
const checkIsArrayOfLinks = link => link.links && !link.link;

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
      <div
        className={classnames('section', { match: isMatch })}
        key={section.sectionHeader}
      >
        <div className={'section-header'} >{section.sectionHeader}</div>
        <div className={'section-links'}>
          {section.links.map(link => (
            <div key={link.label}>
              {this.renderLink(link)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderLink(link) {
    if (checkIsLink(link)) {
      const comparisonPath = this.props.location.pathname.substr(0, link.link.length);
      const className = link.link === comparisonPath ? 'link highlighted' : 'link';
      return (
        <a href={link.link} className={className} key={link.label}>
          {link.label}
        </a>
      );
    }
    if (checkIsArrayOfLinks(link)) {
      return (
        <DropdownMenu title={link.label}>
          {link.links.map(childLink =>
            <div key={childLink.label}>
              {this.renderLink(childLink)}
            </div>,
            )
          }
        </DropdownMenu>
      );
    }
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
          <Header
            headerLogoClassName={this.props.headerLogoClassName}
            headerLogoSrc={this.props.headerLogoSrc}
          />
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
          label: 'Analytics',
          link: '/admin/analytics',
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
  headerLogoClassName: PropTypes.string,
  location: PropTypes.object,
};


export default withRouter(LeftMenu);
