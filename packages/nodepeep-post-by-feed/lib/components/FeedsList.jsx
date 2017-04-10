import React from 'react';
import { Components, getRawComponent, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import Feeds from '../collection.js';

const FeedsList = (props) => {

  const {results, loading, count, totalCount, loadMore, showHeader = true, networkStatus, currentUser, error, terms} = props;
  const loadingMore = networkStatus === 2;

  if (results && results.length) {
    return (
      <div className="feeds-list">
        <div className="feeds-list-content">
          {results.map(feed => <Components.FeedsItem key={feed._id} feed={feed}/>)}
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className="feeds-list">
        <div className="feeds-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="feeds-list">
        <div className="feeds-list-content">
          No feeds to display.
        </div>
      </div>
    )
  }
};

FeedsList.displayName = "FeedsList";

FeedsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

registerComponent('FeedsList', FeedsList);
