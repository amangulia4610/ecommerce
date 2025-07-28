# Ecommerce App - Vercel Deployment Guide

## 🚀 Deployment Steps

### Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Have a MongoDB database ready (MongoDB Atlas recommended)
3. Have all required environment variables ready

### Quick Deploy
```bash
# Run the deployment script
./deploy.sh
```

### Manual Deployment Steps

1. **Install dependencies**
   ```bash
   npm run install-client
   npm run install-server
   ```

2. **Build the client**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Environment Variables Setup

After deployment, add these environment variables in your Vercel dashboard:

#### Server Environment Variables:
- `MONGODB_URI` - Your MongoDB connection string
- `FRONTEND_URL` - Your Vercel app URL (e.g., https://your-app.vercel.app)
- `JWT_SECRET_KEY` - Your JWT secret for authentication
- `RESEND_API_KEY` - Your Resend API key for emails
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

#### Client Environment Variables:
- `VITE_BACKEND_URL` - Your Vercel app URL (same as FRONTEND_URL)

### Post-Deployment Updates

1. **Update client environment file**
   ```bash
   # Update client/.env.production
   VITE_BACKEND_URL=https://your-actual-vercel-url.vercel.app
   ```

2. **Redeploy if needed**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure for Vercel

```
/
├── vercel.json          # Vercel configuration
├── package.json         # Root package.json with build scripts
├── client/              # React frontend
│   ├── dist/           # Built files (generated)
│   └── ...
└── server/              # Express backend
    ├── index.js        # Main server file (Vercel function)
    └── ...
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `client/vite.config.js` - Updated for production builds
- `client/.env.production` - Production environment variables
- `client/.env.development` - Development environment variables

## 📝 Notes

- The backend runs as a Vercel serverless function
- The frontend is served as static files
- All API routes are prefixed with `/api`
- CORS is configured to accept requests from your Vercel domain
- Environment variables must be set in Vercel dashboard for the deployment to work

## 🆘 Troubleshooting

1. **Build fails**: Check that all dependencies are properly installed
2. **API not working**: Verify environment variables are set in Vercel dashboard
3. **CORS errors**: Make sure FRONTEND_URL matches your Vercel domain
4. **Database connection**: Verify MONGODB_URI is correct and database is accessible

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas](https://cloud.mongodb.com/)
