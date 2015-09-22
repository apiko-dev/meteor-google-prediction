Package.describe({
  name: 'jss:meteor-google-prediction',
  version: '0.0.1',
  summary: 'Google Prediction API v1.6 client',
  git: 'https://github.com/JSSolutions/meteor-google-prediction'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('connector.js', 'server');
  api.export('GooglePrediction', 'server');
});

Npm.depends({
  "node-google-prediction": "0.0.4"
});