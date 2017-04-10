import { Components, registerComponent, Button, ModalTrigger } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import Posts from "meteor/vulcan:posts";

class CardsItem extends Component {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }
  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderTitle()
  {
    var title, limit;
    limit = 70;
    var dots = "...";

    this.props.post.title.length > limit ? title = this.props.post.title.substring(0,limit) + dots : title = this.props.post.title;

    return title;
  }

  renderActions() {
    return (
      <div className="cards-actions">
        <span className="cards-item-edit" title="Edit this post">
        <ModalTrigger title="Edit Post" component={<a className="cards-action-edit"><FormattedMessage id="posts.edit"/></a>}>
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

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <div className="cards-item-content">

          <div className="cards-item-title">
            <Link to={Posts.getLink(post)} className="cards-item-title-link" target={Posts.getLinkTarget(post)}>
              {this.renderTitle()}
            </Link>
            {this.renderCategories()}
          </div>

            {post.user? <div className="cards-item-user"><Components.UsersAvatar user={post.user} size="small"/></div> : null}
            <div className="cards-item-date">{post.postedAt ? <FormattedRelative value={post.postedAt}/> : <FormattedMessage id="posts.dateNotDefined"/>}</div>
            <div className="cards-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <Components.Icon name="comment" />
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>

            <div className="cards-item-vote">
              <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
            </div>

            {this.renderCommenters()}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
            <div className="cards-item-post-stats">
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            </div>

        </div>


      </div>
    )
  }
}// Component

CardsItem.displayName = "CardsItem";

CardsItem.propTypes = {
  currentUser: React.PropTypes.object,
  post: React.PropTypes.object.isRequired,
  terms: React.PropTypes.object,
};

registerComponent('CardsItem', CardsItem);

//<Button type="button" class="btn btn-sm btn-danger" data-toggle="popover" title="Popover title" data-content="poop">Admin</Button>
//<Components.PostsStats post={post} />
