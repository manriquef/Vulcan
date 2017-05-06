import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment, withCurrentUser, withList} from 'meteor/vulcan:core';
import { intlShape } from 'react-intl';
import NovaForm from 'meteor/vulcan:forms';
import Feeds from '../collection.js';
import Users from 'meteor/vulcan:users';

const FeedsNewForm = (props, context) => {

    return(
      <Components.ShowIf
        check={Feeds.options.mutations.new.check}
        failureComponent={<Components.AccountsLoginForm/>}
      >
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
      </Components.ShowIf>
  );
};

FeedsNewForm.contextTypes = {
    currentUser: PropTypes.object,
};

const options = {
  collection: Users,
  queryName: 'feedsNewFormQuery',
  fragmentName: 'UsersMinimumInfo',
};

registerComponent('FeedsNewForm', FeedsNewForm, withCurrentUser, [withList, options]);
