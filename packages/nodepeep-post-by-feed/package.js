Package.describe({
  name: "nodepeep:post-by-feed",
  summary: "Auto post via RSS to nodepeep",
  version: "1.4.0",
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'vulcan:core@1.4.0',
    'vulcan:categories@1.4.0',
    'vulcan:events@1.4.0',
  ]);

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');

});
