# 1. Development

## 1.1 Local

[Docker Compose](https://docs.docker.com/compose/) is used for local development. The following commands are needed:

1.

Install [Docker](https://docs.docker.com/engine/install/) & [Docker Compose](https://docs.docker.com/compose/install/) (
If needed increase the CPU & RAM usage in Docker Desktop for Windows and MAC to avoid failures)

2. Setup `env.local` file by [example]()

3. Remove local Docker state: `docker system prune -a --volumes`

4. Start the app:

   `npm run docker:start:local`

5. Stop the app: `npm run docker:down:local`

The app will be available under the following host:

- Swagger: localhost:3000/api/swagger
- API: localhost:3000/api

## 1.2 Environment variables

1. `NODE_ENV`: This variable sets the environment mode for your application, indicating whether it's running in a
   production, development, or local environment.

2. `APP_PORT`: Specifies the port number on which your application will listen for incoming requests.

3. `APP_HOST`: Defines the host or domain name for your application.

4. `POSTGRES_URL`: This is the URL to connect to your PostgreSQL database, including the username, password, hostname,
   and
   database name.

5. `POSTGRES_HOST`: The hostname or IP address of your PostgreSQL server.

6. `POSTGRES_PORT`: The port on which the PostgreSQL database server is listening.

7. `POSTGRES_USERNAME`: The username used to authenticate with the PostgreSQL database.

8. `POSTGRES_PASSWORD`: The password used to authenticate with the PostgreSQL database.

9. `POSTGRES_DB`: Specifies the name of the PostgreSQL database your application will use.

10. `REDIS_CACHE_URL`: The URL to connect to your Redis cache server.

11. `REDIS_CACHE_PORT`: The port on which the Redis cache server is listening.

12. `SOCKET_REDIS_PORT`: The port used for a separate Redis server for handling socket-related operations.

13. `SOCKET_REDIS_URL`: The URL to connect to the Socket Redis server.

14. `JWT_SECRET`: This is the secret key used for generating and verifying JWT (JSON Web Tokens) for authentication and
    authorization.

15. `JWT_TOKEN_EXPIRE_TIME`: Specifies the expiration time for JWT tokens in milliseconds.

16. `JWT_REFRESH_TOKEN_EXPIRE_TIME`: Sets the expiration time for JWT refresh tokens in seconds.

17. `JWT_SECRET_KEY`: An additional secret key for JWT security.

18. `JWT_REFRESH_SECRET`: The secret key used specifically for refreshing JWT tokens.

19. `AWS_ACCESS_KEY_ID`: The AWS access key ID for accessing AWS services like S3.

20. `AWS_SECRET_ACCESS_KEY`: The AWS secret access key for secure access to AWS services.

21. `AWS_BUCKET_NAME`: Specifies the name of the AWS S3 bucket where your application stores files.

22. `AWS_REGION`: The AWS region in which your S3 bucket is located.

23. `AWS_SIGNED_URL_TTL`: Sets the time to live (TTL) for signed AWS S3 URLs for secure file access.

24. `SALT_ROUNDS`: The number of rounds used for password encryption, typically for hashing user passwords.

# 2 Modules

## 2.1 AuthModule

1. `POST /auth/sign-in` Description: This controller handles user sign-in/authentication. It expects a request with a
   user object and returns access and refresh tokens upon successful authentication.
   refreshTokens:

2. `PATCH /auth/refresh-tokens` Description: This controller is responsible for refreshing access and refresh tokens. It
   requires a valid refresh token
   and user ID. Upon successful validation, it returns a new set of access and refresh tokens.

3. `PATCH /auth/log-out` Description: This controller allows users to log out. It requires a valid JWT token, and it
   logs out the user associated
   with the provided user ID.

## 2.2 CommentModule

1. POST `/comment/file` Description: This controller allows users to upload files, typically used for attaching files to
   comments. It consumes multipart/form-data and expects a file upload. Upon successful upload, it returns metadata
   about the uploaded file.

2. POST `/comment` Description: This controller enables users to create a new comment. It requires the comment content
   and the current user's ID to associate the comment with the user.

3. POST `/comment/reply/:id` Description: This controller allows users to create a reply to an existing comment. It
   expects the comment content, the ID of the parent comment to which the reply belongs, and the current user's ID.

4. PUT `/comment/:id` Description: This controller allows users to update an existing comment. It requires the comment
   content, the ID of the comment to be updated, and the current user's ID for authorization.

5. GET `/comment` Description: This controller retrieves a list of comments based on the provided query parameters.
   Users can filter, paginate, and sort comments using query parameters.
   `getCommentReplies`:

6. GET `/comment/replies/:id` Description: This controller retrieves a list of replies to a specific comment, identified
   by its ID. Users can paginate
   and sort the replies using query parameters.

7. GET `/comment/:id` Description: This controller retrieves a specific comment by its ID.

## 2.3 ProfileModule

1. POST `/profile/avatar` Description: This controller allows users to upload an avatar image. It consumes
   multipart/form-data and expects an avatar image upload. Upon successful upload, it returns metadata about the
   uploaded avatar.
2. PATCH `/profile/avatar` Description: This controller enables users to set their profile avatar. It requires the
   avatar image content and the current user's ID to associate the avatar with the user.

## 2.4 UserModule

1. POST `/user/sign-up` Description: This controller allows users to sign up by creating a new user account. It expects
   user registration
   details and, upon successful registration, returns a message confirming the user's registration.

2. GET `/user/profile/:id` Description: This controller retrieves the user profile based on the provided user ID. Users
   can access their profiles
   by providing their user ID, and it returns the user's profile information.