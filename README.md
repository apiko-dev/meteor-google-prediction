# Google Prediction API Client

Google Prediction API v1.6 client for Meteor.

## Quick example

```js
//initialize client
var authOptions = {
  serviceEmail: CloudSettings.SERVICE_EMAIL,
  pemFile: CloudSettings.PEM_FILE, //PEM file name located in `/private` directory
  projectName: 'MyProjectName' //name of your project in google developer console
};
var googlePrediction = new GooglePrediction(authOptions); //create new client instance


//training new model
var insertResult = googlePrediction.insert("MyModel","GoogleCloudStorageBucketName","training-data-file.csv");


//check model status
var modelStatus = googlePrediction.get("MyModel");


//list available models
var models = googlePrediction.list();


//make prediction
var inputData = [25,'foo',30,'bar'];
var result = googlePrediction.predict("MyModel", inputData);//access to prediction API
console.log('Predicted Value: ', result.outputValue);
```

## Supported methods

* analyze
* delete
* get
* insert
* list
* predict
* update

Also, see [full API Reference](https://cloud.google.com/prediction/docs/reference/v1.6/)


## Getting PEM file

This package is built on top of `google-oauth-jwt` npm package. Here's [detailed instruction](https://www.npmjs.com/package/google-oauth-jwt#creating-a-service-account-using-the-google-developers-console) how to generate `.pem` file.

-------------


Made by [![Professional Meteor Development Studio](http://s30.postimg.org/jfno1g71p/jss_xs.png)](http://jssolutionsdev.com) - [Professional Meteor Development Company](http://jssolutionsdev.com)
