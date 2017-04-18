import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, withList, withCurrentUser, Loading } from 'meteor/vulcan:core';
import Feeds from '../collection.js';

const FeedsPage = ({results = [], currentUser, loading, loadMore, count, totalCount}) =>

<div className="feeds-list">
    {loading ?  <Loading /> : results.map(feed => <Components.FeedsItem key={feed._id} feed={feed} currentUser={currentUser} />)}

    {totalCount > results.length ?
      <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> :
      <p>No more items.</p>
    }

  </div>


const options = {
  collection: Feeds,
  fragmentName: 'FeedsPage',
};

export default withList(options)(withCurrentUser(FeedsPage));
