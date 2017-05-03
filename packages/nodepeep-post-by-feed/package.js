Package.describe({
  name: "nodepeep:post-by-feed",
  summary: "Auto post via RSS to nodepeep",
  version: "1.3.2",
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'vulcan:core@1.3.2',
    'vulcan:categories@1.3.2',
    'vulcan:events@1.3.2',
  ]);

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');

});
