import { addRoute, getComponent } from 'meteor/vulcan:core';

addRoute([
  {name: "postfeeds", path: "/feeds", component: getComponent("FeedsPage")},
  {name: "newpostfeeds", path: "/newfeeds", component: getComponent("FeedsNewForm")},
]);
