Rest Sample Services - Project
node-service
-----------------------
That is our core nodejs based rest service project.

[![Build Status](https://travis-ci.org/restSampleServices/node-service.svg?branch=master)](https://travis-ci.org/restSampleServices/node-service)
[![Code Climate](https://codeclimate.com/github/restSampleServices/node-service/badges/gpa.svg)](https://codeclimate.com/github/restSampleServices/node-service)
[![Test Coverage](https://codeclimate.com/github/restSampleServices/node-service/badges/coverage.svg)](https://codeclimate.com/github/restSampleServices/node-service/coverage)
[![Issue Count](https://codeclimate.com/github/restSampleServices/node-service/badges/issue_count.svg)](https://codeclimate.com/github/restSampleServices/node-service)
[![Dependency Status](https://gemnasium.com/badges/github.com/restSampleServices/node-service.svg)](https://gemnasium.com/github.com/restSampleServices/node-service)

---

Why did we create that?
-----------------------
Very often when you:
* like to try out something, 
* learn a new programming lanuage, 
* testing a new framework
* building a sample
* teaching people
* ...

you need a rest backend which
* is simple to use, 
* makes somehow sence (instead of lorem ipsum ;)
* is easy to start
* is undestroyable by wrong requests
* run on your local system
* can be shared with other users
* ...

Finally it helps also us to learn new technologies and having some good and working samples.
Feel free to participate, extend the functionality or just use it as you want.

## Quick start


### Use Docker

If you are able to run a docker image, just execute the following command

    docker -d -p 8081:8081 restsampleservice/service 

To see what is happens on the service execute: 

    docker ps
    docker logs -containernumber-
  
The "ps" command is necessary to become the container number.
### Use git and nodeJs

Just clone the repository and execute it with _"npm start"_. That will create sample data nd start up the REST Service.
The Service will than be available at http://localhost:8081/ 

Details: https://hub.docker.com/r/blndev/restsampleservices/

You can configure the service, port and available features by modify the "config.json" in our root folder.

Service Descriptions
====================

Employee Service
----------------
Our first scenario is an employee service. It is the directory of all employees of your company, containing names, email addresse, phone numbers and a job history.

You can reach it below http://localhost:8071/employees/

If you use the fakeDB as configured by default, then every restart of the service will create new data. All your changes are only in the memory.
There is one user which is always available after restart with the userName "testuser".

http://localhost:8081/employees/testuser/

### Endpoints
#### GET /
Delivers a list of all employees in a shorten form. You will recieve an array of user like this:

    {
       firstName: "Jon",
       lastName: "Doe",
       userName: jdoe
    }


#### GET /{username}/
Here you will recieve all data of the dedicated user.
To see the model please have a look here: http://localhost:8081/employees/testuser/


#### GET /{username}/avatar
Here you will recieve the avatar as image or you will be forwarded to the configured url where the avatar is stored.
This url can be used in the browser directly, because the browser will resolve the forward request.

#### PUT /{username}/
The PUT reuqest allows you to modify the user, except the jobHistory. All Data which you send on a put request will be updated. Data which you dosnt send are not modified or deleted.

The call returns the modified Employee Object as it is stored in the backend after the update.

> Note: if you modify the username, then you have to change the url for the next modification.

Sample payload to modify the firstName and an address attribute:

    {
      "firstName": "Sample",
      "address": { "street2": "5. Floor"}
    }


#### DELETE /{username}/
Will delete the user from the database. There is no undo, but new users are created on restart.

#### GET /{username}/jobs
Delivers a list of all jobs of the useres job history

#### GET /{username}/jobs/{jobId}
Gets all data of the selected job history entry.
To see the model please have a look here: http://localhost:8081/employees/testuser/jobs/1

#### PUT /{username}/jobs/{jobId}
The PUT reuqest allows you to modify the selectd job from the histror. All Data which you send on a put request will be updated. Data which you dosnt send are not modified or deleted.

The call returns the modified Employee Object as it is stored in teh backend after the update.

> Note: if you modify the username, then you have to change the url for the next modification.

Sample payload to modify the company and an address attribute:

    {
      "company": "Microsoft",
      "address": { "city": "Redmond"}
    }


#### DELETE /{username}/jobs/{jobId}
Will delete the job history entry from the database. There is no undo.




