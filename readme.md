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
import { connectMongoDB, loginUser, registerUser } from "aio-auth-nosql";

// First, connect to your MongoDB database
connectMongoDB(
  "mongodb+srv://test:3GSnwEgmZQY4TtsY@cluster0.dsf1qex.mongodb.net/test"
);

// Register a new user
const signup = await registerUser({
  email: "testuser1@example.com",
  password: "testpassword",
});

// Login an existing user
const login = await loginUser({
  email: "testuser1@example.com",
  password: "testpassword",
});
```

## Documentation

See [API Reference](./docs/API.md) for detailed usage.

## License

Apache-2.0