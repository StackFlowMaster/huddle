# Working with the Huddle API
The API does a few things differently than I am used to, and I wanted to explain them incase you get confused by how something is implemented in the front-end app.

## Request and Response format
The Huddle API expects all calls to be `POST` calls. Every API call will provide an `action` which will tell the API what the client wants to do. You can find a list of all the endpoints [in Confluence](https://confluence.drfirst.com/display/PH/Huddle+backend+API+Spec).

Requests do not use standard HTTP status codes. All server responses will return a `200 OK` with a `status` object in the response body. Successful requests will contain a `status.code: '000-00-0000'`. A status code of anything other than `000-00-0000` means there was an error. We keep track of the status codes in [src/api/errorCodes.js](../src/api/errorCodes.js).

We have a utility to help us work with API responses: [src/api/util.js#handleResponse](../src/api/util.js). All API errors will also be sent to mixpanel so that we can see when errors happen.

## API Architecture
The API is designed to be a "simple API" which communicates with "rich clients." This means that a lot of the heavy lifting is done by the front-end, and the server trusts any data that its clients provides. This becomes problematic when different clients try to work with the same data. For example, the web front-end needs to know how the mobile app handles items so that it can render them correctly (see the documentation on items [here](./items.md)). 

If you change how data is stored you may cause a breaking change on a different platform; for example if you want to change an [item type](../src/screen/Item/PickType/itemTypes.js) or the way that files are stored in folders. You may need to coordinate with different teams if you need to change the way our data is structured, or if you are adding any new data-related functionality.

## Custom Fields
All models in the DB have a string field named `custom`. You can put anything in this field that you want, but we use it store stringified JSON objects. This field should not be treated as volatile storage since custom fields contain very important information (such as `item.type` and `user.signupSource`). 

🚨 **You should use caution when you are updating objects in the database, since it would be very easy to accidentally erase data in a custom field!!**
