import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const CardsStats = ({post}) => {

  return (
    <div className="cards-stats">
      {post.score ? <span className="cards-stats-item" title="Score"><Components.Icon name="score"/> {Math.floor(post.score*10000)/10000} <span className="sr-only">Score</span></span> : ""}
      <span className="cards-stats-item" title="Clicks"><Components.Icon name="clicks"/> {post.clickCount} <span className="sr-only">Clicks</span></span>
      <span className="cards-stats-item" title="Views"><Components.Icon name="views"/> {post.viewCount} <span className="sr-only">Views</span></span>
      <span className="cards-stats-item" title="Reported Posts"><Components.Icon name="warning"/> {post.reportBaseScore} <span className="sr-only">Reported</span></span>
    </div>
  )
}

CardsStats.displayName = "CardsStats";

registerComponent('CardsStats', CardsStats);

//<span className="posts-stats-item" title="UpVotes"><Components.Icon name="upvote"/> {post.upvotes} <span className="sr-only">Upvotes</span></span>
//{post.score ? <span className="posts-stats-item" title="Score"><Components.Icon name="score"/> {Math.floor(post.score*10000)/10000} <span className="sr-only">Score</span></span> : ""}
