/* 

A component to configure the "edit movie" form.

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment } from "meteor/vulcan:core";

import Movies from '../../modules/movies/collection.js';

const MoviesEditForm = ({documentId, closeModal}) =>

  <Components.SmartForm 
    collection={Movies}
    documentId={documentId}
    mutationFragment={getFragment('MoviesItemFragment')}
    showRemove={true}
    successCallback={document => {
      closeModal();
    }}
  />

export default MoviesEditForm;