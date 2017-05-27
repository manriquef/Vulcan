import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import Posts from "meteor/vulcan:posts";
import Categories from 'meteor/vulcan:categories';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'

const PostsNewForm = (props, context) => {

  const getCurrentCategory = function () {

    // check if a category is currently active in the route
    const currentCategorySlug = props.router.location.query && props.router.location.query.cat;
  //  const currentCategory = Categories.findOneInStore(props.client.store, {slug: currentCategorySlug});
  //  const parentCategories = Categories.getParents(currentCategory, props.client.store);

    console.log(currentCategorySlug);
    return currentCategorySlug;
  };

  return (
    <Components.ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
    >
      <div className="posts-new-form">
        <Components.SmartForm
          collection={Posts}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: props.redirect || Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
        {getCurrentCategory()}
      </div>
    </Components.ShowIf>
  );
};

PostsNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
}

PostsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

PostsNewForm.displayName = "PostsNewForm";

registerComponent('PostsNewForm', PostsNewForm, withRouter, withMessages);
