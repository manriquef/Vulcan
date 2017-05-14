import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Components, registerComponent, withCurrentUser, addAction, addReducer, Layout } from 'meteor/vulcan:core';

const initialState = {
  theme: 'skin-black',
};

const themeReducer = (state, action) => {
  switch (action.theme) {
    case 'skin-black':
    case 'skin-black-light':
    case 'skin-blue':
    case 'skin-blue-light':
    case 'skin-green':
    case 'skin-green-light':
    case 'skin-purple':
    case 'skin-purple-light':
    case 'skin-red':
    case 'skin-red-light':
    case 'skin-yellow':
    case 'skin-yellow-light':
      return action.theme;
    default:
      return state;
  }
};

addAction({
  themeReducer: {
    themeAction: (theme) => ({
      type: 'CHANGE_THEME',
      theme,
    }),
  },
});

addReducer({
  themeReducer: (state = initialState, action) => {
    if (action.type === 'CHANGE_THEME') {
      return Object.assign({}, state, {
        theme: themeReducer(state.theme, action),
      });
    }
    return state;
  },
});

const mapStateToProps = state => ({ theme: state.theme });
//const mapDispatchToProps = dispatch => ({pickTheme: theme => dispatch(themeAction(theme))});
const mapDispatchToProps = dispatch => bindActionCreators(getActions().theme, dispatch);
//const mapDispatchToProps = dispatch => bindActionCreators(getActions().themeAction(theme), dispatch);
//connect(mapStateToProps, mapDispatchToProps)(Layout);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
