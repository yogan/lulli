import queryString              from 'query-string';
import React, { Component }     from 'react';

import { Results }              from './Results';
import { ResultPreview }        from './ResultPreview';
import { filterAndSortMatches } from './utils';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText:   '',
      previewCache: {},
      matches:      null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    const searchText = event.target.value;

    // clearing matches, as we switch to "new search" mode, and display
    // preview instead
    this.setState({ searchText, matches: null });

    if (this.state.previewCache[searchText]) {
      return;
    }

    if (searchText.trim().length < 2) {
      return;
    }

    const preview = await this.queryMatches(searchText);

    this.setState((prevState) => ({
      previewCache: {
        ...prevState.previewCache,
        [searchText]: preview
      }
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;

    if (!searchText.trim()) {
      return;
    }

    const matches = await this.queryMatches(searchText);

    if (matches && matches.length > 0) {
      // remove keyboard focus from input box to be able to scroll on page,
      // but only when there are some results
      this.input.blur();
    }

    this.setState({ matches });
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
    const { matches, previewCache, searchText } = this.state;

    let previewOrResults;

    if (matches) {
      const filteredMatches = filterAndSortMatches(matches);
      previewOrResults = <Results matches={filteredMatches} />
    } else {
      const preview = previewCache[searchText];
      const filteredPreview = filterAndSortMatches(preview);
      previewOrResults = <ResultPreview matches={filteredPreview} />;
    }

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
        {previewOrResults}
      </div>
    );
  }
}
