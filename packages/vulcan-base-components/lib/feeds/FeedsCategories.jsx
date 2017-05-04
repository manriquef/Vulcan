import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const FeedsCategories = ({feed}) => {
  return (
    <div className="posts-categories">
      {feed.categories.map(category =>
        <Link className="posts-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

FeedsCategories.displayName = "FeedsCategories";

registerComponent('FeedsCategories', FeedsCategories);
