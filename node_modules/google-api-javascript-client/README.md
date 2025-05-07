# google-api-javascript-client

[![NPM version](https://img.shields.io/npm/v/pkg-name?color=a1b858&label=)](https://www.npmjs.com/package/pkg-name)

This is a simple NPM wrapper around the [Google API Javascript Client](https://github.com/google/google-api-javascript-client), which is not published to NPM. This package also includes the TypeScript definitions for the client.

## Install

```
npm install google-api-javascript-client
```

## Usage

```ts
import { gapi, load } from "google-api-javascript-client";
// Or
const { gapi, load } = require("google-api-javascript-client");

async function fn() {
    // 1. Load the JavaScript client library.
    await load('client')
    
    // 2. Initialize the JavaScript client library.
    await gapi.client.init({
        'apiKey': 'YOUR_API_KEY',
        // clientId and scope are optional if auth is not required.
        'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        'scope': 'profile',
    })

    // 3. Initialize and make the API request.
    const response = await gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    })
    console.log(response.result);
}
```

## License

MIT
