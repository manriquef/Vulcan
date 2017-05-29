import { Components, getRawComponent, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Posts from 'meteor/vulcan:posts';
import { Alert } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import classNames from 'classnames';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger">{error.message}</Alert>

const PostsList = ({className, results, loading, count, totalCount, loadMore, showHeader = true, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;
    const topCards = 5;

    return (
      <div className={classNames(className, 'posts-list')}>
        {showHeader ? <Components.PostsListHeader/> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        {totalCount >=5 ? <div className="cards-item-list">{results.slice(0, topCards).map(post => <Components.CardsItem post={post} key={post._id} currentUser={currentUser} terms={terms}/>)}</div> :
          results.map(post => <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />)}
        <div className="posts-list-content">
          <Components.RightBar/>
          {totalCount >=5 ? <div className="posts-list-content">{results.slice(topCards, results.length).map(post => <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />)}
            {hasMore ? (loadingMore ? <Components.PostsLoading/> : <Components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <Components.PostsNoMore/>}
          </div> : null}
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className={classNames(className, 'posts-list')}>
        {showHeader ? <Components.PostsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="posts-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classNames(className, 'posts-list')}>
        {showHeader ? <Components.PostsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
          <Components.RightBar/>
        <div className="posts-list-content">
          <Components.PostsNoResults/>
        </div>
      </div>
      )
    }
};

PostsList.displayName = "PostsList";

PostsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
  limit: 30,
};

registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
/*
return (
    <div className="cards-item-list">
      {showHeader ? <Components.PostsListHeader/> : null}
      {error ? <Error error={error} /> : null }
      <Components.RightBar/>
      {results.map(post => <Components.CardsItem post={post} key={post._id} currentUser={currentUser} terms={terms}/>)}
    </div>
  )
  */
