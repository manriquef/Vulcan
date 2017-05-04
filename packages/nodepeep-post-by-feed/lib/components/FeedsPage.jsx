import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Feeds from '../collection.js';
import FeedsItem from './FeedsItem.jsx';

const FeedsPage = ({results = [], currentUser, loading, loadMore, count, totalCount}) =>

    <div className="feeds-list">
      {loading ?  <Components.Loading /> : results.map(feed => <FeedsItem key={feed._id} feed={feed} currentUser={currentUser} />)}
      {totalCount > results.length ?
        <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> :
        <p>No more items.</p>
      }
    </div>

FeedsPage.displayName = "FeedsPage";

FeedsPage.propTypes = {
  results: PropTypes.array,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
};

const options = {
  collection: Feeds,
  queryName: 'feedsPageQuery',
  fragmentName: 'FeedsPage',
};

registerComponent('FeedsPage', FeedsPage, withCurrentUser, [withList, options]);
