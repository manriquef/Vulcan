Package.describe({
  name: "nodepeep:core",
  version: '1.3.2'
});

Package.onUse( function(api) {

  api.use([
    'fourseven:scss@4.5.0',

    'vulcan:core@1.3.2',
    'vulcan:base-components@1.3.2',
    'vulcan:posts@1.3.2',
    'vulcan:users@1.3.2'
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');

  api.addFiles([
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/stylesheets/custom.scss'
  ], ['client']);

  api.addFiles([
    'lib/server/templates.js'
  ], ['server']);

  api.addAssets([
    'lib/server/emails/customNewPost.handlebars',
    'lib/server/emails/customEmail.handlebars'
  ], ['server']);

});
