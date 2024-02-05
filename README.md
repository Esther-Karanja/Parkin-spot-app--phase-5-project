**GitHub Documentation - Flask Application Setup with Database Initialization**

### Introduction
This documentation provides step-by-step instructions for setting up and running a Flask application, including database initialization using the provided code. Follow these guidelines to configure your environment, initialize the database, and launch the application successfully.

### Prerequisites
Ensure that you have the following prerequisites installed on your system:
- [Python](https://www.python.org/) (3.6 or later)
- [pip](https://pip.pypa.io/) (Python package installer)

### Setup Instructions

#### 1. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone <repository_url>
cd <repository_directory>
```

#### 2. Set Environment Variables
Set the necessary environment variables for Flask to configure the application. Execute the following commands in your terminal:

```bash
export FLASK_APP=server/main.py
export FLASK_ENV=development
export FLASK_RUN_PORT=5000
export FLASK_RUN_HOST=0.0.0.0
```

- `FLASK_APP`: Specifies the main application file.
- `FLASK_ENV`: Sets the environment to development for automatic reloading on code changes.
- `FLASK_RUN_PORT`: Defines the port on which the Flask application will run (default is 5000).
- `FLASK_RUN_HOST`: Specifies the host IP to run the application (0.0.0.0 makes it accessible externally).

#### 3. Initialize the Database
Initialize the database using Flask-Migrate. Execute the following commands:

```bash
flask db init
```

This command initializes the migration environment. You should see a new "migrations" directory created in your project.

#### 4. Migrate the Database
Apply the initial migration to create the database tables:

```bash
flask db migrate
flask db upgrade
```

#### 5. Install Dependencies
Install the required Python dependencies using the following command:

```bash
pip install -r requirements.txt
```

#### 6. Run the Flask Application
Start the Flask application using the following command:

```bash
flask run
```

### Accessing the Application
Once the application is running, you can access it in your web browser by navigating to [http://localhost:5000](http://localhost:5000). If you specified a different port, replace `5000` with the chosen port number.

### Development Mode
While in development mode, the application will automatically reload upon code changes, making it convenient for development and testing.

### Conclusion
You have successfully set up, initialized the database, and launched the Flask application. Refer to the application's specific documentation for further details on endpoints, features, and usage.

For additional support or inquiries, please consult the project's README or contact the project maintainers.

Thank you for using our Flask application!



# API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [1. Signup](#1-signup)
  - [2. Login](#2-login)
  - [3. Get Parking Spots](#3-get-parking-spots)
  - [4. Add Parking Spot](#4-add-parking-spot)
  - [5. Update Parking Spot](#5-update-parking-spot)
  - [6. Delete Parking Spot](#6-delete-parking-spot)

## Introduction
This document provides details on the endpoints available in the parking management system API. The API is designed to allow users to sign up, log in, retrieve parking spot information, add new parking spots, update existing parking spots, and delete parking spots. Authentication is required for certain endpoints, ensuring the security of sensitive operations.

## Authentication
To access protected endpoints, a valid JSON Web Token (JWT) must be included in the Authorization header of the request. Tokens are obtained during the login process.

## Endpoints

### 1. Signup

#### Endpoint: `/signup`
- **Method:** POST
- **Description:** Creates a new user account.

#### Request Payload:
```json
{
  "firstname": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response:
- **Status Code: 201 Created**
```json
{
  "msg": "User created successfully",
  "status": "success"
}
```

### 2. Login

#### Endpoint: `/login`
- **Method:** POST
- **Description:** Logs in an existing user and provides a JWT for authentication.

#### Request Payload:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response:
- **Status Code: 200 OK**
```json
{
  "msg": "Login successful",
  "token": "your_jwt_token_here",
  "status": "success"
}
```

### 3. Get Parking Spots

#### Endpoint: `/parking`
- **Method:** GET
- **Description:** Retrieves information about parking spots, either all or based on a specific location.

#### Query Parameters:
- `location` (optional): The name of the location for which parking information is requested.

#### Response:
- **Status Code: 200 OK**
```json
{
  "specific spot": {
    "id": 1,
    "location": "Example Location",
    "latitude": 12.3456,
    "longitude": 78.9101,
    "type": "Outdoor",
    "capacity": 50,
    "pricing": ["$5 per hour", "$20 per day"],
    "restrictions": ["No overnight parking"]
  },
  "nearby parking": [
    {
      "id": 2,
      "location": "Nearby Location 1",
      "latitude": 12.3457,
      "longitude": 78.9102,
      "type": "Indoor",
      "capacity": 30,
      "pricing": ["$7 per hour", "$25 per day"],
      "restrictions": null
    },
    {
      "id": 3,
      "location": "Nearby Location 2",
      "latitude": 12.3458,
      "longitude": 78.9103,
      "type": "Outdoor",
      "capacity": 40,
      "pricing": ["$6 per hour", "$22 per day"],
      "restrictions": ["No oversized vehicles"]
    }
  ]
}
```

### 4. Add Parking Spot

#### Endpoint: `/add-parking`
- **Method:** POST
- **Description:** Adds a new parking spot to the system. Only accessible by administrators.

#### Request Payload:
```json
{
  "location": "New Parking Location",
  "type": "Outdoor",
  "capacity": 50,
  "pricing": ["$5 per hour", "$20 per day"],
  "restrictions": ["No overnight parking"]
}
```

#### Response:
- **Status Code: 201 Created**
```json
{
  "message": "Parking successfully created"
}
```

### 5. Update Parking Spot

#### Endpoint: `/update-parking`
- **Method:** PATCH
- **Description:** Updates the details of an existing parking spot. Only accessible by administrators.

#### Query Parameters:
- `location`: The name of the location of the parking spot to be updated.

#### Request Payload (Example - Updating Location and Capacity):
```json
{
  "location": "Updated Parking Location",
  "capacity": 60
}
```

#### Response:
- **Status Code: 200 OK**
```json
{
  "message": "Parking spot successfully updated"
}
```

### 6. Delete Parking Spot

#### Endpoint: `/delete-parking`
- **Method:** DELETE
- **Description:** Deletes an existing parking spot. Only accessible by administrators.

#### Query Parameters:
- `location`: The name of the location of the parking spot to be deleted.

#### Response:
- **Status Code: 200 OK**
```json
{
  "message": "Parking spot successfully deleted"
}
```

Note: The API uses JWTs for authentication. Make sure to include the token in the Authorization header when making requests to protected endpoints.


