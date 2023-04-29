# **Travel Recommendation App**
**This app has 3 parts to it: A NODE.JS Express Server, A POSTGRES DB utilizing SEQUELIZE, and a REACT FRONTEND **
*This app is also utilizing the openai API to request information on recommendations for loactions*
## **Directory Structure**
```
.
├── README.md
├── package-lock.json
├── package.json
└── server
    ├── config
    │   └── config.json
    ├── controllers
    │   ├── authController.js
    │   ├── openaiController.js
    │   ├── recommendationController.js
    │   └── userController.js
    ├── middleware
    │   ├── authMiddleware.js
    │   ├── corsMiddleware.js
    │   ├── errorMiddleware.js
    │   └── loggingMiddleware.js
    ├── migrations
    │   ├── 20230428201254-create-user.js
    │   └── 20230428201319-create-recommendation.js
    ├── models
    │   ├── index.js
    │   ├── recommendation.js
    │   └── user.js
    ├── public
    ├── routes
    │   └── routes.js
    ├── seeders
    │   ├── recommendationSeeder.js
    │   └── userSeeder.js
    ├── server.js
    └── views
```
### Database
*./config/config.json is the sequelize configuration for psql*
*./migrations directory hosts the migrations for creating user and recommendation in order to seed the database*
*./models directory hosts the database models that manage the database, recommendation table, & user table*
*./seeders directory is what hosts the files used to initially seed the database's tables*
*Note: the userId in the recommendations table and the id in the users table is of type UUID*
#### Seeding the db
*Ensure to seed the user table first before the recommendations table since the recommendations table will be fetching the users Id*
Some commands used are:
```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed --seed userSeeder.js
npx sequelize-cli db:seed --seed recommendationSeeder.js
```
*I added a console log that outputs Recommendations to allow you to see if the array is being seeded, which in turn means that the table was seeded*
### Controllers
```
authController.js: Handles user authentication, including logging in and verifying JWT tokens.

userController.js: Manages user-related operations like creating, updating, and deleting users, as well as retrieving user information.

openaiController.js: Handles the interaction with the OpenAI API, including receiving user input, generating a response from the API, and saving the response as a recommendation in the database.

recommendationController.js: Manages recommendation-related operations, such as creating, updating, and deleting recommendations, as well as retrieving recommendations for a specific user.
```
### Middleware
```
authMiddleware.js: This middleware checks for a valid JWT token and sets the userId property in the request object if the token is valid. If the token is not valid, it returns a 401 (Unauthorized) response.

corsMiddleware.js: This middleware sets up CORS (Cross-Origin Resource Sharing) options, allowing cross-origin requests from the specified frontend URL.

errorMiddleware.js: This middleware logs the error stack trace and returns a JSON response containing the error message. It sets the status code to 500 (Internal Server Error) if no status code is provided.

loggingMiddleware.js: This middleware uses the morgan library to log incoming and outgoing responses.
```