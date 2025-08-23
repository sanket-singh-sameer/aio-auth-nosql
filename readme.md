# aio-auth-nosql

A flexible authentication library for Node.js projects using NoSQL databases.

## Features

- Supports NoSQL databases (MongoDB)
- Easy integration with Express and other frameworks
- Secure password hashing and token management
- Extensible authentication strategies

## Installation

```bash
npm install aio-auth-nosql
```

## Usage

```js
const { Auth } = require('aio-auth-nosql');

// Initialize with your NoSQL database config
const auth = new Auth({ db: 'mongodb', uri: 'mongodb://localhost:27017/mydb' });

// Register a user
await auth.register('username', 'password');

// Authenticate a user
const token = await auth.login('username', 'password');
```

## Documentation

See [API Reference](./docs/API.md) for detailed usage.

## License

Apache-2.0