import queryString from 'query-string';
import React, { Component } from 'react';
import {Results} from './Results';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {searchText: '', matches: null}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchText: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const query = queryString.stringify({q: this.state.searchText});

    const response = await fetch(`/api/search?${query}`);
    const matches  = await response.json();

    this.setState({matches});
  }

  render() {
    const {matches} = this.state;
    const maybeResults = matches === null ? null : <Results matches={matches}/>;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {maybeResults}
      </div>
    );
  }
}
