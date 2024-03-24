
#  Project Name

## Description
Briefly describe your project here. Explain its purpose and functionality.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add necessary environment variables. You can use `.env.example` as a template.

4. Start the server:
    ```bash
    npm start
    ```

## Usage

Explain how to use your project here. Provide examples or snippets of code if necessary. Include any configuration or setup required.

## Endpoints

### `POST /api/v1/signup`
Register a new user.
#### Request
- Method: `POST`
- Path: `/api/v1/signup`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstname": "John",
    "lastname": "Doe"
  }
#### Response
* Status: 200 OK
* Body:
``` json Copy code
{
  "message": "User logged in successfully",
  "token": "<user-token>"
} 
```

## Middleware
####  checkAdminAccess
Middleware function to verify admin access based on JWT token. Ensures that only admins can access certain routes.

## Schemas
### signUpSchema
Joi schema for validating user signup inputs. Includes rules for email, password, firstname, and lastname.

### loginSchema
Joi schema for validating user login inputs. Includes rules for email and password.
