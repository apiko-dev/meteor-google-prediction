# Google Prediction API Client
Google Prediction API v1.6 client for Meteor.

__Quick example:__

```
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

__Supported methods:__

* analyze
* delete
* get
* insert
* list
* predict
* update


Also, see [full API Reference](https://cloud.google.com/prediction/docs/reference/v1.6/)

Made by [![Professional Meteor Development Studio](http://s30.postimg.org/jfno1g71p/jss_xs.png)](http://jssolutionsdev.com) - [Professional Meteor Development Company](http://jssolutionsdev.com)
