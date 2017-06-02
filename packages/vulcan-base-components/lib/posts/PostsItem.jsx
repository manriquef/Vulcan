/*
Modified: 07FEB2017
Added comment icon next to comment number
*/
import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
import moment from 'moment';

class PostsItem extends PureComponent {


  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="post-actions">
        <span className="posts-item-edit" title="Edit this post">
        <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><Components.Icon name="edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </span>
      </div>
    )
  }

  render() {

    const post = this.props.post;

    let postClass = "posts-item";

    if (post.sticky) postClass += " posts-sticky";
    if (post.color) postClass += " post-"+post.color;
    if (post.sponsored) postClass += " posts-sponsored";


    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">

          <div className="posts-item-title">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </div>

          <div className="posts-item-meta">
            {post.sponsored ? <div className="posts-item-sponsored"><FormattedMessage id="posts.sponsored"/></div>
            {post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date">{post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}</div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                {!post.commentCount || post.commentCount === 0 ? <FormattedMessage id="comments.count_0"/> :
                  post.commentCount === 1 ? <FormattedMessage id="comments.count_1" /> :
                    <FormattedMessage id="comments.count_2" values={{count: post.commentCount}}/>
                }
              </Link>
            </div>
              {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
              {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            </div>
          </div>

        {this.renderCommenters()}

      </div>
    )
  }


}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItem', PostsItem);
