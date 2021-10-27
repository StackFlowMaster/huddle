# Offline Mode
The current offline mode implementation is read-only. All create, read, and delete actions are disabled while a user is offline. If a user loses connectivity during an API call there is no reconciliation, the user will have to try the request again.

## Caching
All items, profiles, and folders are automatically cached **by profileCode**. As long as a user loads data for a profile at some point, that data will be cached. 

When a user loads an item with images or downloads a document, they will be automatically cached as well. 

Files will also be cached when the user uploads them - so they don't have to immediately download them. There is no cleanup currently, so any file downloaded will remain in the phone storage _forever_ (// todo).

This includes thumbnails.

## Thumbnail
Thumbnails are stored as base64 strings. When we create or download a thumbnail, we store it in a thumbnail directory with its filename being its `docUniqueName` - see [/src/util/thumbnailHelper.js#getPath](../src/util/thumbnailsHelper.js) for more details.

Since the URI is based on the `docUniqueName`, we can try to render a thumbnail without storing its location in Redux (like we are doing with `images.reducer.js`). If the thumbnail fails to render, we know that we need to fetch it from the Huddle API - then we store it in the cache.

## Login
The user will also be asked to login while they are offline. Instead of hitting the API with their credentials we compare the pin they enter to their pin in the keychain. If they don't have a pin in the keychain they won't be able to log in.

## Resources
Offline Mode related code is sprinkled through out the codebase. There isn't a main spot where you can look to see all the offline mode logic. You can have a look at the [Offline Mode PR](https://gitlab.com/carl201907/huddle/-/merge_requests/392) to see where changes were made regarding offline mode if you need to fix a bug or add some new offline mode functionality.
