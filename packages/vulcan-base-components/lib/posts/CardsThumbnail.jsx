import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import Posts from "meteor/vulcan:posts";

const CardsThumbnail = ({post}) => {
  return (
      <div className="cards-item-thumbnail">
        <a href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
        <span><img src={Posts.getThumbnailUrl(post)} /></span>
      </a>
      </div>
  )
}

CardsThumbnail.displayName = "CardsThumbnail";

registerComponent('CardsThumbnail', CardsThumbnail);
/*
<a className="cards-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
  <span><img src={Posts.getThumbnailUrl(post)} /></span>
</a>
*/
