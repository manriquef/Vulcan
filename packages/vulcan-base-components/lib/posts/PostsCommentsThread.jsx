/*
   Modified: 24DEC2016
   Changed size of "New Comments" and "Comments"
*/


import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import Comments from 'meteor/vulcan:comments';

const PostsCommentsThread = (props, /* context*/) => {


  const {loading, terms: { postId }, results, totalCount, currentUser} = props;

  if (loading) {

    return <div className="posts-comments-thread"><Components.Loading/></div>

  } else {

    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

    return (
      <div className="posts-comments-thread">
        <div className="posts-comments-thread-title"><FormattedMessage id="comments.comments"/></div>
        <Components.CommentsList currentUser={currentUser} comments={nestedComments} commentCount={totalCount}/>
        {!!currentUser ?
          <div className="posts-comments-thread-new">
            <FormattedMessage id="comments.new"/>
            <Components.CommentsNewForm
              postId={postId}
              type="comment"
            />
          </div> :
          <div>
            <ModalTrigger size="small" component={<a><FormattedMessage id="comments.please_log_in"/></a>}>
              <Components.UsersAccountForm/>
            </ModalTrigger>
          </div>
        }
      </div>
    );
  }
};

PostsCommentsThread.displayName = 'PostsCommentsThread';

PostsCommentsThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('PostsCommentsThread', PostsCommentsThread, [withList, options], withCurrentUser);
