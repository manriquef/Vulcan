Package.describe({
  name: 'nodepeep:dash',
  version: '1.5.0'
});

Package.onUse( function(api) {

  api.use([
    'vulcan:core@1.5.0',
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');

  api.addFiles([
    'lib/main.css'
  ], ['client', 'server']);

});
