import queryString              from 'query-string';
import React, { Component }     from 'react';

import { Results }              from './Results';
import { ResultPreview }        from './ResultPreview';
import { filterAndSortMatches } from './utils';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      preview:    null,
      matches:    null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    const searchText = event.target.value;
    this.setState({ searchText });

    if (searchText.trim().length < 2) {
      this.setState({ preview: null });
      return;
    }

    const preview = await this.queryMatches(searchText);
    this.setState({ preview });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;

    if (!searchText.trim()) {
      return;
    }

    // clear the matches, as for video elements, there is a weird bug
    // which cause the first shown video to stay when the first element
    // of the new search result is also (another) video
    this.setState({ matches: null });

    const matches = await this.queryMatches(searchText);

    if (matches && matches.length > 0) {
      // remove keyboard focus from input box to be able to scroll on page,
      // but only when there are some results
      this.input.blur();
    }

    this.setState({ matches, preview: null });
  }

  async queryMatches(searchText) {
    try {
      const query    = queryString.stringify({ q: searchText });
      const response = await fetch(`/api/search?${query}`);
      return await response.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  render() {
    const { matches, preview } = this.state;

    const filteredMatches = filterAndSortMatches(matches);
    const filteredPreview = filterAndSortMatches(preview);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              autoFocus
              ref={input => this.input = input}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ResultPreview matches={filteredPreview} />
        <Results matches={filteredMatches} />
      </div>
    );
  }
}
