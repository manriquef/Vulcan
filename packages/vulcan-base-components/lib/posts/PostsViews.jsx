import { registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';

const PostsViews = (props, context) => {

  let views = ["top", "new", "best"];
  const adminViews = ["pending", "rejected", "scheduled", "reported_users", "reported_posts", "reported_comments", "userUpvotedPosts", "userDownvotedPosts"];

  if (Users.canDo(props.currentUser, "posts.edit.all")) {
    views = views.concat(adminViews);
  }

  const query = _.clone(props.router.location.query);

  return (
    <div className="posts-views">
        {views.map(view =>
          <LinkContainer key={view} to={{pathname: "/", query: {...query, view: view}}} className="button-item">
            <Button bsStyle="primary" bsSize="small">
              <FormattedMessage id={"posts."+view}/>
            </Button>
          </LinkContainer>
        )}
    </div>
  )
}

PostsViews.propTypes = {
  currentUser: PropTypes.object,
  defaultView: PropTypes.string
};

PostsViews.defaultProps = {
  defaultView: "top"
};

PostsViews.contextTypes = {
  currentRoute: PropTypes.object,
  intl: intlShape
};

PostsViews.displayName = "PostsViews";

registerComponent('PostsViews', PostsViews, withCurrentUser, withRouter);

/*
<LinkContainer to={"/daily"} className="button-item">
  <Button bsStyle="primary" bsSize="small" >
    <FormattedMessage id="posts.daily"/>
  </Button>
</LinkContainer>
*/
