# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Running locally

To run locally, you need to move to the `frontend` directory and follow the steps below:

```bash
cd frontend
```

### Step 1: Install dependencies

Run the following command to install dependencies:

```bash
npm install
```

### Step 2: Set up the environment variables

Create a file called `.env` in the root of the project, you can copy the content of the `.env.example` file:

```bash
cp .env.example .env
```

Then, open the `.env` file and set the following environment variables:

- `VITE_BASE_API_URL`: The base URL of your API.
- `VITE_DEV_PORT`: The port number for the development server.

### Step 3: Start the development server

Run the following command to start the development server:

```bash
npm run dev
```

## Commands

This template provides the following commands:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Runs ESLint to check for any linting errors.
- `npm run format`: Runs Prettier to format the code.

## Authentication Flow

The application uses JWT authentication.

### Login

1. The user enters their email and password.
2. The application sends a POST request to the `/api/auth/login/` endpoint with the entered email and password.
3. The server validates the email and password and returns the `access_token` and `refresh_token`.

### Storing the JWT tokens

- The `access_token` is stored in memory on `@tanstack/react-query`.
- The `refresh_token` is stored in local storage.

### Using the Access Token

- The `access token` is sent in the `Authorization` header of the request using the `useAuth` hook.

### Refreshing the Access Token

1. The `access_token` has a short lifespan of `30 minutes`.
2. When the `access_token` expires, the `refresh_token` is used to obtain a new `access_token` by sending a POST request to the `/api/auth/refresh-token/` endpoint. This is done automatically by the `@tanstack/react-query` library setting the `refetchInterval` to `30 minutes` in the `useAuth` hook or when a 401 (Unauthorized) response is received from the server.

### Session recovery

1. When a logged-in user returns later, the frontend will no have the `access_token` in memory.
2. On app load, the frontend should check if there is a `refresh_token` in local storage and attempt to refresh the `access_token` using the `/api/auth/refresh-token/` endpoint.
3. If successful, the user can continue their session without needing to sign in again.
4. If the `refresh_token` is invalid, expired or not found, the user will be redirected to the `/auth/login` page.

### Signout

1. On the `Signout` button click, the `access_token` is cleared from memory and the `refresh_token` is cleared from local storage.
2. The user is redirected to the `/auth/login` page.
