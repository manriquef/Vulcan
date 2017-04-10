/* 

A component to configure the "new movie" form.

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withCurrentUser, getFragment } from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesNewForm = ({currentUser}) =>

  <div>

    {Movies.options.mutations.new.check(currentUser) ?
      <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
        <h4>Insert New Document</h4>
        <Components.SmartForm 
          collection={Movies}
          mutationFragment={getFragment('MoviesItemFragment')}
        /> 
      </div> :
      null
    }

  </div>

export default withCurrentUser(MoviesNewForm);