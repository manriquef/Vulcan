import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'posts.list',     path: '/',                    componentName: 'PostsHome'}, // index route
  {name:'posts.daily',    path:'daily',                 componentName: 'PostsDaily'},
  {name:'posts.single',   path:'n/:_id(/:slug)',    componentName: 'PostsSingle'},
  {name:'users.single',   path:'p/:slug',           componentName: 'UsersSingle'},
  {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  {name:'resetPassword',  path:'reset-password/:token', componentName: 'UsersResetPassword'},
  {name:'users.edit',     path:'p/:slug/edit',      componentName: 'UsersAccount'},
]);
