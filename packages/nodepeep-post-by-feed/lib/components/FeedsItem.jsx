import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withList, withCurrentUser, ModalTrigger } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'react-intl';
import NovaForm from "meteor/vulcan:forms";
import Feeds from '../collection.js';

class FeedsItem extends Component {


  renderCategories() {
    return this.props.feed.categories ? <Components.PostsCategories post={ this.props.feed } /> : "";
  }

  renderActions() {
    return this.props.feed.createdFromSettings
          ? <span>This feed has been added from your settings.json file, you cannot edit or remove it the client. Please make your modifications in your settings file.</span>
          : <div className="feed-actions">
            <span className="feeds-item-edit" title="Edit this post">
              <ModalTrigger title="Edit Post" component={<a className="feeds-action-edit"><FormattedMessage id="posts.edit"/></a>}>
                <Components.FeedsEditForm feed={this.props.feed} />
              </ModalTrigger>
           </span>
            </div>
  }

  render() {
    const {feed} = this.props;
    console.log("ZOMG THIS FEED", this.props);

    const {currentUser, messages} = this.context;
    return (
      <div className="posts-item">
              <div className="posts-item-content">
                <div className="posts-item-title">
                  <a className="posts-item-title-link" href={ feed.url }>{ feed.title ? feed.title : "Feed not fetched yet" }</a>
                  { this.renderCategories() }
                </div>
                <div className="posts-item-link"><a href={ feed.url }>{feed.url }</a></div>

                <div className="posts-item-meta">
                  { feed.user ? ( <div className="posts-item-user">
                        <Components.UsersAvatar user={feed.user} size="small"/>
                        <Components.UsersName user={feed.user}/>
                      </div>
                    ) : null }
                  {Feeds.options.mutations.edit.check(this.props.currentUser, feed) ? this.renderActions() : null}
                </div>
              </div>
      </div>
    )
  }
}

FeedsItem.propTypes = {
  feed: PropTypes.object.isRequired,
};

FeedsItem.contextTypes = {
  currentUser: PropTypes.object,
  actions: PropTypes.object,
  events: PropTypes.object,
  messages: PropTypes.object,
  intl: intlShape
};


registerComponent('FeedsItem', FeedsItem);
