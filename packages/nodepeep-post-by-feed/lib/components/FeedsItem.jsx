import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import { intlShape } from 'react-intl';
import NovaForm from "meteor/vulcan:forms";
import Feeds from '../collection.js';

class FeedsItem extends Component {


  renderCategories() {
    return this.props.feed.categories ? <Components.PostsCategories post={ this.props.feed } /> : "";
  }

  renderActions() {
    return this.props.feed.createdFromSettings
          ? <span>This feed has been added from your settings.json file, you cannot edit or remove it the client. Please make your modifications in your settings file.</span>
          : <div className="post-stats">
              <Components.ShowIf check={Feeds.options.mutations.edit.check}>
                <span className="posts-stats-item" title="Edit"><a onClick={this.editFeed}><Components.Icon name="pencil"/><span className="sr-only">Edit</span></a></span>
              </Components.ShowIf>
              <Components.ShowIf check={Feeds.options.mutations.remove.check}>
                <span className="posts-stats-item" title="Delete"><a onClick={this.removeFeed}><Components.Icon name="close"/><span className="sr-only">Delete</span></a></span>
              </Components.ShowIf>
            </div>
  }

  render() {
    const {feed} = this.props;
    console.log("ZOMG THIS FEED", this.props);

    const {currentUser, messages} = this.context;
    return (
      <div className="posts-item">
              {Feeds.options.mutations.edit.check(this.props.currentUser, feed) ? this.renderActions() : null}
              <div className="post-item-content">
                <div className="posts-item-title">
                  <a className="posts-item-title-link" href={ feed.url }>{ feed.title ? feed.title : "Feed not fetched yet" }</a>
                  { this.renderCategories() }
                </div>
                <div className="feeds-item-link"><a href={ feed.url }>{feed.url }</a></div>

                <div className="posts-item-meta">
                  { feed.user ? ( <div className="posts-item-user">
                        <Components.UsersAvatar user={feed.user} size="small"/>
                        <Components.UsersName user={feed.user}/>
                      </div>
                    ) : null }
                  { this.renderActions() }
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
