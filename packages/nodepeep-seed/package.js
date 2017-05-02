Package.describe({
  name: "nodepeep:seed",
  summary: "Seed nodepeep with initial data",
  version: '1.3.2',
});

Npm.depends({
  // NPM package dependencies
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'vulcan:accounts',
    'vulcan:core@1.3.2',
    'vulcan:posts@1.3.2',
    'vulcan:comments@1.3.2',
    'vulcan:events@1.3.2',
  ]);

  // client

  api.addAssets([
    'content/images/stackoverflow.png',
    'content/images/telescope.png'
  ], ['client']);

  // server

  api.addFiles([
    'lib/server/seed.js'
  ], ['server']);


});
