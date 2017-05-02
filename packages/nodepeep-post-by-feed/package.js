Package.describe({
  name: "nodepeep:post-by-feed",
  summary: "Auto post via RSS to nodepeep",
  version: "1.3.2",
});

Npm.depends({
  'feedparser': '1.0.0',
  'to-markdown': '0.0.2',
  'he': '0.5.0',
  'iconv-lite': '0.4.7',
  'moment': '2.13.0',
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'vulcan:core@1.3.2',
    'vulcan:categories@1.3.2',
    'vulcan:events@1.3.2',
    'vulcan:lib@1.3.2',
    'vulcan:posts@1.3.2',
    'vulcan:users@1.3.2',
  ]);

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');

});
