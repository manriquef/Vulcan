import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withVote, hasUpvoted, hasDownvoted } from 'meteor/vulcan:voting';
import { FormattedMessage, intlShape } from 'react-intl';

class Vote extends Component {

  constructor() {
    super();
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.getActionClass = this.getActionClass.bind(this);
    // this.startLoading = this.startLoading.bind(this);
    // this.stopLoading = this.stopLoading.bind(this);
    this.state = {
      loading: false
    }
  }

  /*

  note: with optimisitc UI, loading functions are not needed
  also, setState triggers issues when the component is unmounted
  before the vote mutation returns.

  */

  // startLoading() {
  //   this.setState({ loading: true });
  // }

  // stopLoading() {
  //   this.setState({ loading: false });
  // }

  upvote(e) {
    e.preventDefault();

    // this.startLoading();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in'}));
      // this.stopLoading();
    } else {
      const voteType = hasUpvoted(user, document) ? "cancelUpvote" : "upvote";
      this.props.vote({document, voteType, collection, currentUser: this.props.currentUser}).then(result => {
        // this.stopLoading();
      });
    }
  }

  downvote(e) {
    e.preventDefault();

  //  this.startLoading();
    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      this.props.flash("Please log in first");
    //  this.stopLoading();
    } else {
      const voteType = this.hasDownvoted(user, document) ? "cancelDownvote" : "downvote";
      this.props.vote({document, voteType, collection, currentUser: this.props.currentUser}).then(result => {
      //  this.stopLoading();
      });
    }
  }

  getActionClass() {
    const document = this.props.document;
    const user = this.props.currentUser;

    const isUpvoted = hasUpvoted(user, document);
    const isDownvoted = hasDownvoted(user, document);
    const actionsClass = classNames(
      'vote',
      {voted: isUpvoted || isDownvoted},
      {upvoted: isUpvoted},
      {downvoted: isDownvoted}
    );

    return actionsClass;
  }

  render() {
    return (
      <div className={this.getActionClass()}>
        <a className="upvote-button" onClick={this.upvote}>
          {this.state.loading ? <Components.Icon name="spinner" /> : <Components.Icon name="upvote" /> }
          <div className="sr-only">Upvote</div>
          <div className="vote-count">{this.props.document.baseScore || 0}</div>
        </a>
      </div>
    )
  }

}

Vote.propTypes = {
  document: PropTypes.object.isRequired, // the document to upvote
  collection: PropTypes.object.isRequired, // the collection containing the document
  vote: PropTypes.func.isRequired, // mutate function with callback inside
  currentUser: PropTypes.object, // user might not be logged in, so don't make it required
};

Vote.contextTypes = {
  intl: intlShape
};

registerComponent('Vote', Vote, withMessages, withVote);
