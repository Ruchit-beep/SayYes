# SayYes — complete source code

The website is in `src/`, images in `src/assets/`, and the Express/MongoDB server in `backend/`. Configuration, dependency manifests, lockfiles, and tests are included. Installed dependencies, generated output, repository metadata, and actual environment files are excluded. MongoDB data is not included.

## Run the website locally

Install a current Node.js LTS release (Node 24 recommended), then open a terminal in this folder:

```sh
npm install
```

Copy `.env.example` to `.env`. It points to your existing Render server. Then run:

```sh
npm run dev -- --port 8080
```

Open http://localhost:8080. Generated routing files are recreated automatically.

## Run your own server locally

Open another terminal in `backend/`:

```sh
npm install
```

Copy `backend/.env.example` to `backend/.env` and replace the MongoDB placeholder with your connection string. Never publish this file or share its password. Then run:

```sh
npm start
```

To use this local server, change the website's `.env` to `VITE_API_URL=http://localhost:5000` and restart the website command.

## Deploy the server on Render

Create a Web Service using this code: root directory `backend`, build command `npm install`, start command `npm start`. Set `MONGO_URI` privately in Render and set `CLIENT_URL` to your website address. The website is hosted separately; its current live address is https://sayeyes.lovable.app.

## Tests

From the main folder, run `npm test`.

This export preserves the project's existing configuration. A clean installation outside Lovable has not been tested as part of this export.
