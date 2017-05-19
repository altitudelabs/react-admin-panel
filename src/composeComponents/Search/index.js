import './style.scss';

import React, { Component, PropTypes } from 'react';

import Form from './../Form';
import Elements from './../Form/Elements';

const {
  Input,
} = Elements;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.inputOnSubmit = this.inputOnSubmit.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnSubmit() {
    this.props.addQuery({ keyword: this.state.inputValue });
    this.setState({ inputValue: '' });
  }

  inputOnChange(text) {
    this.setState({ inputValue: text });
  }

  render() {
    return (
      <div className="search">
        <Form
          enableEnterKeyPress
          customStyle={{
            display: 'flex',
          }}
          submitButtonCustomStyle={{
            borderRadius: '0px 5px 5px 0px',
            width: '52px',
          }}
          submitButtonHoveredStyle={{
            backgroundColor: '#F7F7F7',
          }}
          onSubmit={this.inputOnSubmit}
        >
          <Input
            customStyle={{
              boxSizing: 'border-box',
              borderRadius: '5px 0px 0px 5px',
              width: '267px',
              height: '36px',
              borderRight: 'none',
            }}
            type="text"
            placeholder={this.props.searchFieldPlaceholder}
            value={this.state.inputValue}
            onTextChange={(text) => { this.inputOnChange(text); }}
          />
        </Form>
      </div>
    );
  }
}

Search.defaultProps = {
  searchFieldPlaceholder: 'Need searchFieldPlaceholder prop',
};

Search.propTypes = {
  searchFieldPlaceholder: PropTypes.string,
  addQuery: PropTypes.func,
};

export default Search;
