var PredictionClient = Npm.require('node-google-prediction');


GooglePrediction = function GooglePrediction(options) {
  this._authOptions = {
    claimSetISS: options.serviceEmail,
    //pem should be located in private directory
    path: this._assetsFolderAbsolutePath(options.pemFile)
  };
  this.projectName = options.projectName;
  this._timeoutTreshold = 120000;
};


GooglePrediction.prototype.list = function () {
  return this._makeRequest('GET', this._baseUrl('list'));
};


GooglePrediction.prototype.insert = function (modelName, bucketName, fileName) {
  return this._makeRequest('POST', this._baseUrl(), {
    id: modelName,
    storageDataLocation: bucketName + "/" + fileName
  });
};


GooglePrediction.prototype.get = function (modelName) {
  return this._makeRequest('GET', this._baseUrl(modelName));
};


GooglePrediction.prototype.predict = function (modelName, inputDataVector) {
  return this._makeRequest('POST', this._baseUrl(modelName, 'predict'), {
    "input": {
      "csvInstance": inputDataVector
    }
  });
};


GooglePrediction.prototype.analyze = function (modelName) {
  return this._makeRequest('GET', this._baseUrl(modelName, 'analyze'));
};


GooglePrediction.prototype.remove = function (modelName) {
  return this._makeRequest('DELETE', this._baseUrl(modelName));
};


//alias to remove
GooglePrediction.prototype['delete'] = function (modelName) {
  return this.remove(modelName);
};


GooglePrediction.prototype.update = function (modelName, updateData) {
  return this._makeRequest('PUT', this._baseUrl(modelName), updateData);
};


GooglePrediction.prototype._auth = function () {
  this._client = new PredictionClient(this._authOptions);
  var syncToken = Meteor.wrapAsync(this._client.accessTokenRequest, this._client);
  return syncToken();
};


GooglePrediction.prototype._makeRequest = function (method, url, data) {
  var authCredentials = this._auth();
  var result = false;
  var timeout = 200;

  while (!result) {
    try {
      result = HTTP.call(method, url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": authCredentials.token_type + ' ' + authCredentials.access_token
        },
        data: data
      });
    } catch (err) {
      console.log('Error for timeout: ', timeout, err);
      if (timeout <= this._timeoutTreshold) {
        throw err;
      } else {
        timeout *= 2;
      }
    } finally {
      Meteor._sleepForMs(timeout);
    }
  }

  return result.data;
};


GooglePrediction.prototype._baseUrl = function (/* arguments */) {
  var suffix = '';
  Array.prototype.forEach.call(arguments, function (argument) {
    if (argument) {
      suffix += '/' + argument;
    }
  });
  return 'https://www.googleapis.com/prediction/v1.6/projects/' + this.projectName + '/trainedmodels' + suffix;
};


GooglePrediction.prototype._assetsFolderAbsolutePath = function (fileName) {
  var fs = Npm.require('fs');
  var path = Npm.require('path');

  var meteorRoot = fs.realpathSync(process.cwd() + '/../');

  var assetsFolder = meteorRoot + '/server/assets/app';

  if (fileName) {
    assetsFolder += '/' + fileName;
  }

  return assetsFolder;
};