import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostsDay extends Component {

  render() {

    const {date, posts} = this.props;
    const noPosts = posts.length === 0;

    return (
      <div className="posts-day">
        <h6 className="posts-day-heading">{date.format("dddd, MMMM Do YYYY")}</h6>
        { noPosts ? <Components.PostsNoMore /> :
          <div className="posts-list">
            <div className="posts-list-content">
              {posts.map(post => <Components.PostsItem post={post} key={post._id} currentUser={this.props.currentUser} />)}
            </div>
          </div>
        }
      </div>
    )

  }

}

PostsDay.propTypes = {
  currentUser: PropTypes.object,
  date: PropTypes.object,
  number: PropTypes.number
}

registerComponent('PostsDay', PostsDay);
