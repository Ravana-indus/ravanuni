# Deploying to Cloudflare Pages

This document outlines the steps to deploy the application to Cloudflare Pages.

## Prerequisites

- A Cloudflare account
- Access to the Cloudflare Pages dashboard
- Your repository connected to Cloudflare Pages

## Environment Variables

Set the following environment variables in the Cloudflare Pages dashboard:

- `PAYHERE_MERCHANT_SECRET`: Your PayHere merchant secret key
- `PAYHERE_MERCHANT_ID`: Your PayHere merchant ID
- `FRAPPE_API_URL`: Your ERP API base URL (e.g., https://portal.riftuni.com/api)
- `FRAPPE_API_KEY`: Your ERP API key
- `FRAPPE_API_SECRET`: Your ERP API secret

## Deployment Settings

1. **Build settings**:
   - Build command: `npm run build:cloudflare`
   - Build output directory: `dist`
   - Node.js version: `18.17.1`
   - Root directory: `/ravanaiof` (important)

2. **Functions**:
   - The functions are automatically configured in `.pages.yml`

3. **NPM Configuration**:
   - The project uses a custom `.npmrc` file to handle dependency installation
   - The build command includes `--no-frozen-lockfile` to prevent lockfile errors

## Custom Domains

Configure your custom domain(s) in the Cloudflare Pages dashboard.

## Deployment Process

1. Connect your repository to Cloudflare Pages
2. Configure the build settings as mentioned above
3. Add the required environment variables
4. Deploy the site
5. Set up your custom domain

## Checking Deployment

- Verify that the API endpoints work correctly
- Test the payment flow with the PayHere sandbox
- Ensure that client-side routing works correctly

## Troubleshooting

- Check the Cloudflare Pages build logs if deployment fails
- Examine the function logs for API errors
- Verify that environment variables are correctly set up

### Common Deployment Issues

#### Lockfile Errors

If you encounter lockfile errors during build (`lockfile had changes, but lockfile is frozen`):
1. Ensure the build command includes `--no-frozen-lockfile`
2. Check that the `.npmrc` file is properly configured
3. Consider running `npm install` locally and committing the updated lockfile

#### Root Directory Issues

If your builds fail with missing files:
1. Ensure the root directory is set to `/ravanaiof` in the Cloudflare Pages settings
2. Verify that the `.pages.yml` file is placed in the root of the repository
3. Check that all paths in the `.pages.yml` file are relative to the root directory 