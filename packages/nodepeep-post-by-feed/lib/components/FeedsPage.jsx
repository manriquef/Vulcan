import { Components, registerComponent, withDocument, withCurrentUser, Loading } from 'meteor/vulcan:core';
import Feeds from '../collection.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class FeedsPage extends Component {

  render() {
    if (this.props.loading) {
      return <Components.Loading />
    } else if (!this.props.document) {

      console.log(`// Missing feed (_id: ${this.props.document})`);
      return <div className="feeds-page"><FormattedMessage id="app.404"/></div>

    } else {
        const feed = this.props.document;
        return (
              <div className="feeds-list">
                {results.map(feed => <FeedsItem key={feed.id} feed={feed} currentUser={currentUser} />)}
              </div>
        );
     }
   }
}

FeedsPage.displayName = "FeedsPage";

FeedsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
}

const queryOptions = {
  collection: Feeds,
  queryName: 'feedsSingleQuery',
  fragmentName: 'FeedsPage',
};

registerComponent('FeedsPage', FeedsPage, withCurrentUser, [withDocument, queryOptions]);
