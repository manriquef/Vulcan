Package.describe({
  name: "nodepeep:report",
  summary: "Nodepeep reporting package.",
  version: "1.5.0",
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.0');

  api.use(['vulcan:core@1.5.0']);

  api.use([
    'vulcan:posts@1.5.0',
    'vulcan:comments@1.5.0'
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
