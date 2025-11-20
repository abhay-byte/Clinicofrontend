# Deploying to Render

This guide explains how to deploy this React application to Render.

## Prerequisites

- A Render account (sign up at [https://render.com](https://render.com))
- The repository connected to Render (via GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Prepare the repository**:
   - Ensure all the required files are in the repository:
     - `package.json` with build and start scripts
     - `server.js` to serve the built application
     - `render.yaml` with deployment configuration
     - `build` script in `package.json` to build the React app
     - `start` script in `package.json` to run the Express server

2. **Connect your repository to Render**:
   - Go to your Render dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the repository containing this project

3. **Configure the deployment**:
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Optional: Set environment variables if needed (e.g., NODE_ENV=production)

4. **Deploy**:
   - Render will automatically build and deploy your application
   - The first deployment may take a few minutes
   - Subsequent deployments will be faster with cached dependencies

## How It Works

1. When you push changes to your repository, Render triggers a new build
2. The build command runs `npm install` to install dependencies and `npm run build` to create the production-ready build
3. The start command runs `npm start` which executes `node server.js` to serve the built static files
4. The Express server serves the React app and handles client-side routing

## Important Files

- `server.js`: Express server that serves the built React application
- `package.json`: Contains build and start scripts
- `render.yaml`: Render-specific configuration file