import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsWarn = ({post}) => {

  return (
    <div className="posts-item-warn">
      <span className="posts-item-warning" title="Flag this post!"><Components.Icon name="warning"/> Report <span className="sr-only">Flag</span></span>
    </div>
  )
}

PostsWarn.displayName = "PostsWarn";

registerComponent('PostsWarn', PostsWarn);
