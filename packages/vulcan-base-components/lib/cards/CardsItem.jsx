import { Components, registerComponent, Button, ModalTrigger } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";
import moment from 'moment';

class CardsItem extends Component {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.CardsCategories post={this.props.post} /> : "";
  }
  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.CardsCommenters post={this.props.post}/> : "";
  }

  renderTitle()
  {
    var title, limit;
    limit = 64;
    var dots = "...";

    this.props.post.title.length > limit ? title = this.props.post.title.substring(0,limit) + dots : title = this.props.post.title;

    return title;
  }

  renderActions() {
    return (
      <div className="cards-actions">
        <span className="cards-item-edit" title="Edit this post">
        <ModalTrigger title="Edit Post" component={<a className="cards-action-edit"><Components.Icon name="edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </span>
      </div>
    )
  }

  render() {

    const {post} = this.props;

    let cardClass = "cards-item";
    if (post.sticky) cardClass += " posts-sticky";
    if (post.sponsored) cardClass += " posts-sponsored";

    return (
      <div className={cardClass}>
        <div className="cards-item-content">
            {post.thumbnailUrl ? <Components.CardsThumbnail post={post}/> : <div className="cards-item-thumbnail"></div>}
            <div className="cards-item-title">
              <Link to={Posts.getLink(post)} className="cards-item-title-link" target={Posts.getLinkTarget(post)}>
                {this.renderTitle()}
              </Link>
            </div>
            {post.user? <div className="cards-item-user"><Components.UsersAvatar user={post.user} size="small"/></div> : null}
            <div className="cards-item-date">{/*post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>*/}</div>
            {<div className="cards-item-comments">
              <Components.Icon name="comments"/>
              <Link to={Posts.getPageUrl(post)}>
                {!post.commentCount || post.commentCount === 0 ? <FormattedMessage id="comments.count_0"/> :
                  post.commentCount === 1 ? <FormattedMessage id="comments.count_1" /> :
                    <FormattedMessage id="comments.count_2" values={{count: post.commentCount}}/>
                }
              </Link>
            </div>}

            <div className="cards-item-vote">
              <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
            </div>
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
            {this.renderCategories()}
            {/*this.renderCommenters()*/}
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.CardsStats post={post} /> : null}
        </div>
      </div>
    )
  }
}// Component

CardsItem.displayName = "CardsItem";

CardsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('CardsItem', CardsItem);

//<Button type="button" class="btn btn-sm btn-danger" data-toggle="popover" title="Popover title" data-content="poop">Admin</Button>
//<Components.PostsStats post={post} />
