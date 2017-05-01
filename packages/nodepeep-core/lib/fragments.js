import { extendFragment } from 'meteor/vulcan:core';

extendFragment('PostsList', `
  color # new custom property!
  sponsored # add sponsored posts
`);

extendFragment('PostsPage', `
  color # new custom property!
  sponsored # add sponsored posts
`);

extendFragment('UsersProfile', `
  ppdLimit
  catmod
  warnings
  rating
  rank
  awards
  job
  education
  prospectiveJob
  jobLocation
  certifications
  xboxGamerTag
  psGamerTag
  originGamerTag
  uPlayGamerTag
  bNetGamerTag
`);
