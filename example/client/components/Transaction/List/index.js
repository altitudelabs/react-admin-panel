import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import List from 'react-admin-panel';
import './style.scss';

const Promise = require('bluebird');

class ListTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: [],
      isLoading: true,
      count: 0,
      limit: 10,
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.router !== this.props.router) {
      this.refresh(nextProps.router.query);
    }
  }

  refresh(query = this.props.router.query) {
    if (!query.limit) {
      query.limit = this.state.limit;
    }
    if (!query.offset) {
      query.offset = 0;
    }
    this.setState({ isLoading: true });
    let queryUrl = '';
    _.each(query, (value, key) => {
      // endpoint uses different keys:
      if (key === 'sort') key = 'sortBy';
      if (key === 'sortOrder') key = 'order';
      queryUrl += (queryUrl.length) ? '&' : '?';
      queryUrl += `${key}=${value}`;
    });
    Promise.resolve().then(() => {
      // return customFetch(`/api/property/search${queryUrl}`);

      // mockup for fetch response:
      return {
        count: 10,
        rows: [{
          name: 'item 1',
          type: 'payment for services',
          amount: 5500,
          paymentMethod: 'credit',
          paid: true,
          id: 84759017,
        },
        ],
      };
    })
    .then((result) => {
      this.setState({ count: result.count });
      // format data
      const id = [];
      const prettyPrice = price =>  // add currency and commas to price string
        `HK$${price.split('').reverse().map((digit, index, arr) => {
          return (index + 1) % 3 === 0 && (index + 1) < arr.length ? `,${digit}` : digit;
        })
        .reverse().join('')}`;
      const items = _.map(result.rows, (item) => {
        id.push(item.id);
        const itemDetails = [{
          key: 'Name',
          value: item.name,
          sort: 'name',
        }, {
          key: 'Type',
          value: item.type,
          sort: 'type',
        }, {
          key: 'Amount',
          value: prettyPrice(item.amount.toString()),
          sort: 'amount',
        }, {
          key: 'Payment Method',
          value: 'item.paymentMethod',
          sort: 'paymentMethod',
        }, {
          key: 'Paid',
          value: item.paid === true ? 'Paid' : 'Unpaid',
          sort: 'paid',
        }, {
          key: 'reference ID',
          value: item.id,
          sort: 'id',
        }];
        return itemDetails;
      });
      this.setState({ items, id, count: result.count });
    })
    .finally(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <List
        noCheckBox
        pagination
        isLoading={this.state.isLoading}
        maxPage={Math.ceil(this.state.count / this.state.limit)}
        limit={this.state.limit}
        searchable
        searchFieldPlaceholder="Search Property"
        refresh={this.refresh}
        router={this.props.router}
        listType={'property'}
        itemList={this.state.items}
        idList={this.state.id}
        onItemClick={(id) => {
          browserHistory.push(`${this.props.router.pathname}/${id}`);
        }}
        tagLabels={{
          minPrice: 'Minimum price: HK$',
          maxPrice: 'Maximum price: HK$',
          minArea: 'Minimum saleable area in ft²: ',
          maxArea: 'Maximum saleable area in ft²: ',
          keyword: 'Searching by keyword: ',
          district: 'District: ',
          numRooms: 'Number of Rooms: ',
          popular: 'Popular',
          threeSixty: '360° Images',
          virtualTour: 'Virtual Tour',
        }}
        checkedStatus={[true]}
        adHocButtons={[
          {
            label: 'Advanced Search',
            onClick: () => { browserHistory.push('/property/advanced-search'); },
            customStyle: {
              marginLeft: 18,
              boxSizing: 'border-box',
              width: 126,
              height: 36,
              fontSize: 13,
              color: '#FFFFFF',
              backgroundColor: '#535353',
            },
          },
        ]}
      />
    );
  }
}

ListTransaction.defaultProps = {
  restData: [],
  router: { query: { } },
};

ListTransaction.propTypes = {
  router: PropTypes.object,
  restData: PropTypes.array,
  user: PropTypes.object,
};


export default ListTransaction;
