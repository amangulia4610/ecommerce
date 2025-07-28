#!/bin/bash

# Deployment script for Vercel
echo "🚀 Starting deployment process..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔑 Vercel login (if needed)..."
vercel login

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌍 Your app should be available at your Vercel URL"
echo ""
echo "📋 Post-deployment steps:"
echo "1. Update your environment variables in Vercel dashboard"
echo "2. Set MONGODB_URI in Vercel environment variables"
echo "3. Set FRONTEND_URL to your Vercel app URL"
echo "4. Update client/.env.production with your Vercel URL"
