/*
Modified 07FEB2017

Added comment icon next to comments.

Test commit
*/
import { Components, getRawComponent, replaceComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";

class CustomPostsItem extends getRawComponent('PostsItem') {

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
             {post.sponsored? <div className="posts-item-sponsored"><FormattedMessage id="posts.sponsored"/></div>
             : post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
             {post.sponsored? null : <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>}
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <Components.Icon name="comment" />
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
              {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
              {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
            </div>
          </div>

        {this.renderCommenters()}

      </div>
    )
  }
}

replaceComponent('PostsItem', CustomPostsItem);
