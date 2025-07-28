# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Setup Complete

- [x] Created `vercel.json` configuration
- [x] Updated root `package.json` with build scripts
- [x] Updated Vite config for production builds
- [x] Fixed server PORT configuration
- [x] Updated frontend API base URL to use environment variables
- [x] Created environment files for development and production
- [x] Created deployment script (`deploy.sh`)
- [x] Added health check endpoint
- [x] Installed Vercel CLI

## 📋 Manual Steps Required

### 1. Environment Variables Setup
Before deploying, you need to gather these environment variables:

**Required for Backend:**
- `MONGODB_URI` - Your MongoDB connection string (get from MongoDB Atlas)
- `JWT_SECRET_KEY` - Generate a strong secret key
- `RESEND_API_KEY` - Your Resend API key for emails (optional)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key  
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### 2. Deploy Now!

Run this command in your project root:
```bash
cd /Users/amangulia/Downloads/CODE/ecommerce
vercel --prod
```

Follow the prompts:
- Link to existing project? **N** (for first time)
- What's your project's name? **ecommerce** (or any name you prefer)
- In which directory is your code located? **.** (current directory)

### 3. Post-Deployment Steps

1. **Note your Vercel URL** (something like `https://ecommerce-xyz.vercel.app`)

2. **Add Environment Variables in Vercel Dashboard:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add all the variables listed above
   - Set `FRONTEND_URL` to your Vercel URL

3. **Update client production environment:**
   ```bash
   # Edit client/.env.production
   VITE_BACKEND_URL=https://your-actual-vercel-url.vercel.app
   ```

4. **Redeploy to apply changes:**
   ```bash
   vercel --prod
   ```

## 🔍 Testing Your Deployment

1. **Test API Health:**
   Visit: `https://your-vercel-url.vercel.app/api/health`

2. **Test Frontend:**
   Visit: `https://your-vercel-url.vercel.app`

3. **Test API Endpoints:**
   Visit: `https://your-vercel-url.vercel.app/api/category/get-categories`

## 🆘 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:** Make sure all dependencies are in `package.json` files

### Issue: Database connection fails
**Solution:** Check MONGODB_URI is correctly set in Vercel environment variables

### Issue: CORS errors
**Solution:** Ensure FRONTEND_URL environment variable matches your Vercel domain

### Issue: Build fails
**Solution:** Test the build locally first:
```bash
cd client && npm run build
```

## 📞 Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check MongoDB Atlas network access settings

## 🎉 You're Ready!

Your ecommerce app is now configured for Vercel deployment. Just run:

```bash
vercel --prod
```

And follow the steps above! 🚀
