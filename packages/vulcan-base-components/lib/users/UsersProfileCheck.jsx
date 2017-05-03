import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, Utils, Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'react-intl';

<<<<<<< HEAD
const UsersProfileCheck = (props, context) => {
=======
const UsersProfileCheck = ({currentUser, document, loading, flash}, context) => {
>>>>>>> VulcanJS/devel

  const { currentUser } = props;

<<<<<<< HEAD
  if (currentUser && !Users.hasCompletedProfile(currentUser)) {
=======
  // if user is not logged in, or userMustCompleteFields is still loading, don't return anything
  if (!currentUser || loading) {

    return null;
  
  } else {
>>>>>>> VulcanJS/devel
    
    // return fields that are required by the schema but haven't been filled out yet
    const schema = Utils.stripTelescopeNamespace(Users.simpleSchema()._schema);
    const requiredFields = _.filter(_.keys(schema), (fieldName) => {
      var field = schema[fieldName];
      return !!field.required && !Utils.getNestedProperty(props.currentUser, fieldName);
    });

<<<<<<< HEAD
    return (
      <Modal bsSize='small' show={ true }>
        <Modal.Header>
          <Modal.Title><FormattedMessage id="users.complete_profile"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Components.SmartForm
            collection={ Users }
            documentId={ props.currentUser._id }
            fields={ requiredFields }
            successCallback={user => {
              const newUser = {...currentUser, ...user};
              if (Users.hasCompletedProfile(newUser)) {
                props.flash(context.intl.formatMessage({id: "users.profile_completed"}), 'success');
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <FormattedMessage id="app.or"/> <a className="complete-profile-logout" onClick={ () => Meteor.logout(() => window.location.reload() /* something is broken here when giving the apollo client as a prop*/) }><FormattedMessage id="users.log_out"/></a>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return null
=======
    if (fieldsToComplete.length > 0) {

      return (
        <Modal bsSize='small' show={ true }>
          <Modal.Header>
            <Modal.Title><FormattedMessage id="users.complete_profile"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Components.SmartForm
              collection={ Users }
              documentId={ currentUser._id }
              fields={ fieldsToComplete }
              successCallback={user => {
                const newUser = {...currentUser, ...user};
                if (Users.hasCompletedProfile(newUser)) {
                  flash(context.intl.formatMessage({id: "users.profile_completed"}), 'success');
                }
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <FormattedMessage id="app.or"/> <a className="complete-profile-logout" onClick={ () => Meteor.logout(() => window.location.reload() /* something is broken here when giving the apollo client as a prop*/) }><FormattedMessage id="users.log_out"/></a>
          </Modal.Footer>
        </Modal>
      )
    } else {
      
      return null;

    }
>>>>>>> VulcanJS/devel
  }

};

UsersProfileCheck.propsTypes = {
  currentUser: PropTypes.object
};

UsersProfileCheck.contextTypes = {
  intl: intlShape
};

UsersProfileCheck.displayName = "UsersProfileCheck";

registerComponent('UsersProfileCheck', UsersProfileCheck, withMessages, withCurrentUser);
