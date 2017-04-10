import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const CardsCategories = ({post}) => {
  return (
    <div className="cards-item-categories">
      {post.categories.map(category =>
        <Link className="cards-item-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

CardsCategories.displayName = "CardsCategories";

registerComponent('CardsCategories', CardsCategories);
