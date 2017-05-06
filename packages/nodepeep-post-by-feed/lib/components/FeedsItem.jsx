import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withList, withCurrentUser, ModalTrigger } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'react-intl';
import NovaForm from 'meteor/vulcan:forms';
import Feeds from '../collection.js';
import Users from 'meteor/vulcan:users';

 const FeedsItem = ({feed, currentUser}) =>


      <div className="posts-item">
              <div className="posts-item-content">
                <div className="posts-item-title">
                  <a className="posts-item-title-link" href={ feed.url }>{ feed.title ? feed.title : "Feed " + feed.url + " not fetched yet" }</a>
                  { feed.categories && feed.categories.length > 0 ? <Components.FeedsCategories feed={ feed } /> : "" }
                </div>
                <div className="posts-item-link"><a href={ feed.url }>{feed.url }</a></div>

                <div className="posts-item-meta">
                  { feed.user ? ( <div className="posts-item-user">
                        <Components.UsersName user={feed.user}/>
                      </div>
                    ) : null }
                  {Feeds.options.mutations.edit.check(currentUser, feed) ? (feed.createdFromSettings
                        ? <span>This feed has been added from your settings.json file, you cannot edit or remove it from the client. Please make your modifications in your settings file.</span>
                        : <div className="feed-actions">
                          <span className="feeds-item-edit" title="Edit this post">
                            <ModalTrigger title="Edit Post" component={<a className="feeds-action-edit"><FormattedMessage id="posts.edit"/></a>}>
                              <Components.FeedsEditForm feed={feed} />
                            </ModalTrigger>
                         </span>
                       </div>) : null}
                </div>
              </div>
      </div>


export default FeedsItem;
