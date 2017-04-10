import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import Feeds from '../collection.js';
import Posts from 'meteor/vulcan:posts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

class FeedsPage extends Component {


  render() {
    if (this.props.loading) {
      return <Components.Loading />
    }
  //  else if (!this.props.document) {

//      console.log(`// Missing feed (_id: ${this.props.feed})`);
//      return <div className="feeds-page"><FormattedMessage id="app.404"/></div>
    else {
    return (
          <div className="feeds-list">
            <Components.FeedsList feed={this.props.feed} collection={Feeds}/>
          </div>
   );
  }
 }
}

FeedsPage.displayName = "FeedsPage";

FeedsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Feeds,
  queryName: 'postsSingleQuery',
  fragmentName: 'FeedsPage',
};

const mutationOptions = {
  name: 'increasePostViewCount',
  args: {postId: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'FeedsPage',
  // React component
  FeedsPage,
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions),
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
