import { addRoute } from 'meteor/vulcan:core';
import FeedsPage from './components/FeedsPage.jsx';
import FeedsNewForm from './components/FeedsNewForm.jsx';

addRoute([
  {name: "postfeeds", path: "/feeds", component: FeedsPage},
  {name: "newpostfeeds", path: "/newfeeds", component: FeedsNewForm},
]);
