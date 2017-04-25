import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import Feeds from 'meteor/nodepeep:post-by-feed';
import { withRouter } from 'react-router'

class FeedsEditForm extends Component {

  render() {

    return (
      <div className="feeds-edit-form">
        <Components.SmartForm
          collection={Feeds}
          documentId={this.props.feed._id}
          mutationFragment={getFragment('FeedsPage')}
          successCallback={feed => {
            this.props.closeModal();
            this.props.flash(this.context.intl.formatMessage({id: "posts.edit_success"}, {title: feed.title}), 'success');
          }}
          removeSuccessCallback={({documentId, documentTitle}) => {
            // post edit form is being included from a single post, redirect to index
            // note: this.props.params is in the worst case an empty obj (from react-router)
            if (this.props.params._id) {
              this.props.router.push('/');
            }

            const deleteDocumentSuccess = this.context.intl.formatMessage({id: 'posts.delete_success'}, {title: documentTitle});
            this.props.flash(deleteDocumentSuccess, "success");
            // todo: handle events in collection callbacks
            // this.context.events.track("post deleted", {_id: documentId});
          }}
          showRemove={true}
        />
      </div>
    );

  }
}

FeedsEditForm.propTypes = {
  closeModal: PropTypes.func,
  flash: PropTypes.func,
  post: PropTypes.object.isRequired,
}

FeedsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('FeedsEditForm', FeedsEditForm, withMessages, withRouter);
