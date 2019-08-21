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
      resultsCache: {},
      showResults: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    const searchText = event.target.value;

    // switch to preview
    this.setState({ searchText, showResults: false });

    // request results (for preview)
    await this.requestResults(searchText);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;

    if (!searchText.trim()) {
      return;
    }

    const matches = await this.requestResults(searchText);

    this.setState({ searchText, showResults: true });

    if (matches && matches.length > 0) {
      // remove keyboard focus from input box to be able to scroll on page,
      // but only when there are some results
      this.input.blur();
    }
  }

  async requestResults(query) {
    if (this.state.resultsCache[query]) {
      return this.state.resultsCache[query];
    }

    if (query.trim().length < 2) {
      return;
    }

    const results = await this.queryMatches(query);

    this.setState((prevState) => ({
      resultsCache: {
        ...prevState.resultsCache,
        [query]: results
      }
    }));

    return results;
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
    const { showResults, resultsCache, searchText } = this.state;

    const matches = resultsCache[searchText];
    const filteredMatches = filterAndSortMatches(matches);
    let previewOrResults;

    if (showResults) {
      previewOrResults = <Results matches={filteredMatches} />
    } else {
      previewOrResults = <ResultPreview matches={filteredMatches} />;
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
