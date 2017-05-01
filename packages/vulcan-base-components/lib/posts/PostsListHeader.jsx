import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsListHeader = () => {

  return (
    <div>
      <div className="posts-list-header">
        <Components.PostsViews />
      </div>
    </div>
  )
}

PostsListHeader.displayName = "PostsListHeader";

registerComponent('PostsListHeader', PostsListHeader);
