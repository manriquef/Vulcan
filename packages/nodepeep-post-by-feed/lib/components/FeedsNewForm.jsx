import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment} from 'meteor/vulcan:core';
import { intlShape } from 'react-intl';
import NovaForm from "meteor/vulcan:forms";
import Feeds from '../collection.js';

const FeedsNewForm = (props, context) => {


  return (
    <div style={{marginBottom: 15}}>
      <h2>Add a new feed</h2>
      <Components.SmartForm
        collection={Feeds}
        mutationFragment={getFragment('FeedsPage')}
        successCallback={feed => {
          props.closeModal();
          props.router.push({pathname: Feeds.getPageUrl(feed)});
          props.flash(context.intl.formatMessage({id: "feeds.created_message"}), "success");
        }}
      />
    </div>
  )
};

FeedsNewForm.contextTypes = {
  currentUser: PropTypes.object,
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('FeedsNewForm', FeedsNewForm);
