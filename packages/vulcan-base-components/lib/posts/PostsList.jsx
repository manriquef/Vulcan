import { Components, getRawComponent, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Posts from 'meteor/vulcan:posts';
import { Alert } from 'react-bootstrap';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger">{error.message}</Alert>

const PostsList = (props) => {

  const {results, loading, count, totalCount, loadMore, showHeader = true, networkStatus, currentUser, error, terms} = props;

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;
    const topCards = 5;

      return (
        <div className="posts-page">
          {showHeader ? <Components.PostsListHeader/> : null}
            <div className="cards-item-list">
              {error ? <Error error={error} /> : null }
              {totalCount >=5 ? results.slice(0, topCards).map(post => <Components.CardsItem post={post} key={post._id} currentUser={currentUser} terms={terms}/>) :
                results.map(post => <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />)}
             <div className="posts-list">
              <Components.RightBar/>
              {totalCount >=5 ? <div className="posts-list-content">{results.slice(topCards, results.length).map(post => <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />)}
                {hasMore ? (loadingMore ? <Components.PostsLoading/> : <Components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <Components.PostsNoMore/>}
              </div> : null}
             </div>
            </div>
        </div>
      )
      } else if (loading) {
      return (
        <div className="posts-list">
          {showHeader ? <Components.PostsListHeader /> : null}
          {error ? <Error error={error} /> : null }
          <div className="posts-list-content">
            <Components.PostsLoading/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="posts-list">
          {showHeader ? <Components.PostsListHeader /> : null}
          {error ? <Error error={error} /> : null }
          <Components.RightBar/>
          <div className="posts-list-content">
            <Components.PostsNoResults/>
          </div>
        </div>
      )
    }
}; // PostList

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
