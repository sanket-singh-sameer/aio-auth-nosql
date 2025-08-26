# aio-auth-nosql

Comprehensive authentication for Node.js projects using NoSQL databases, JWT token management, Express.js integration, and automatic cookie handling.

## Features

- 🚀 **MongoDB Integration** - Seamless NoSQL database support
- 🔐 **Secure Authentication** - Password hashing with bcryptjs
- 🎫 **JWT Token Management** - Automatic token generation and verification
- 🍪 **Automatic Cookie Handling** - JWT tokens are saved directly to cookies
- ⚡ **Express.js Ready** - One-line Express app setup
- 🔧 **Flexible Configuration** - Easy customization and setup
- 🛡️ **Security First** - Built-in CORS, cookie parsing, and security features

## Installation

```bash
npm install aio-auth-nosql
```

## Quick Start

### Option 1: Complete Express Setup (Recommended)

```js
import express from "express";
import { setUpAIOAuthNoSQL, registerUser, loginUser } from "aio-auth-nosql";

const app = express();

// One-line setup with MongoDB and JWT
setUpAIOAuthNoSQL(
  app, 
  "mongodb://localhost:27017/your-database-name",
  "your-jwt-secret-key"
);


app.post("/register", async (req, res) => {
  const result = await registerUser(req, res, req.body);
  if (typeof result === "string") {
    return res.status(400).json({ error: result });
  }
  res.status(201).json(result);
});

app.post("/login", async (req, res) => {
  const result = await loginUser(req, res, req.body);
  if (typeof result === "string") {
    return res.status(401).json({ error: result });
  }
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Option 2: Manual Setup

```js
import { connectMongoDB, setupJwtSecret, registerUser, loginUser } from "aio-auth-nosql";

// Configure database connection
connectMongoDB("mongodb://localhost:27017/your-database-name");

// Set JWT secret
setupJwtSecret("your-jwt-secret-key");


// Register a new user
const signup = await registerUser(req, res, {
  email: "user@example.com",
  password: "securepassword",
});
// Returns: { user: { _id, email, ... }, token: "jwt-token" } and sets cookie

// Login user
const login = await loginUser(req, res, {
  email: "user@example.com",
  password: "securepassword",
});
// Returns: { user: { _id, email, ... }, token: "jwt-token" } and sets cookie
```

## API Reference

### `setUpAIOAuthNoSQL(app, mongoUri, jwtSecret)`

One-line setup for Express applications.

**Parameters:**
- `app` - Express application instance
- `mongoUri` - MongoDB connection string
- `jwtSecret` - JWT secret key for token signing

**Features Enabled:**
- Cookie parser middleware
- JSON body parser
- URL encoded parser
- CORS with credentials
- MongoDB connection
- JWT secret configuration

### `connectMongoDB(uri)`

Connect to MongoDB database.

**Parameters:**
- `uri` - MongoDB connection string

### `setupJwtSecret(secret)`

Configure JWT secret for token generation.

**Parameters:**
- `secret` - JWT secret key (defaults to "default_jwt_secret")

### `registerUser(userData)`


Register a new user with hashed password and automatically set JWT token in cookies.

**Parameters:**
- `req` - Express request object
- `res` - Express response object
- `userData.email` - User email (required)
- `userData.password` - User password (required)
- `userData.*` - Additional user fields

**Returns:**
```js
{
  user: { _id, email, ... }, // User object without password
  token: "jwt-token"         // 7-day valid JWT token
}
```

### `loginUser(userData)`


Authenticate user, return JWT token, and automatically set JWT token in cookies.

**Parameters:**
- `req` - Express request object
- `res` - Express response object
- `userData.email` - User email (required)
- `userData.password` - User password (required)

**Returns:**
```js
{
  user: { _id, email, ... }, // User object without password
  token: "jwt-token"         // 7-day valid JWT token
}
```

## Environment Variables

```env
JWT_SECRET=your-super-secure-jwt-secret-key
```

## Dependencies

- **bcryptjs** - Password hashing
- **mongoose** - MongoDB object modeling
- **jsonwebtoken** - JWT token management
- **express** - Web framework support
- **cookie-parser** - Cookie parsing middleware
- **cors** - Cross-origin resource sharing

## Example Usage with Routes

```js
import express from "express";
import { setUpAIOAuthNoSQL, registerUser, loginUser } from "aio-auth-nosql";

const app = express();

setUpAIOAuthNoSQL(
  app, 
  "mongodb://localhost:27017/myapp",
  "my-super-secret-jwt-key"
);

app.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body);
    if (typeof result === "string") {
      return res.status(400).json({ error: result });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await loginUser(req.body);
    if (typeof result === "string") {
      return res.status(401).json({ error: result });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(3000);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache-2.0

## Author

[@impuresam](https://github.com/sanket-singh-sameer)

---

⭐ **Star this repo if you find it helpful!**
