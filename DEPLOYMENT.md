# Deployment Guide

Your YemsUI component library is now configured for deployment on Vercel with the playground as your interactive component showcase.

## Quick Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project root**:

   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to your GitHub repository when asked
   - Confirm build settings (should auto-detect)
   - Your site will be live!

### Option 2: Connect GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `YemsUI` repository
5. Vercel will auto-detect settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build --prefix playground`
   - **Output Directory**: `playground/dist`
6. Click "Deploy"

## Post-Deployment

### Update Your Documentation

After deployment, update your `README.md` with a link to the live demo:

```markdown
## 🎨 Live Demo

Check out the [**interactive component playground**](https://your-vercel-url.vercel.app) to see all components in action!
```

### Configure Your Domain

1. In Vercel dashboard, go to your project settings
2. Under **Domains**, add your custom domain
3. Update your GitHub repository links

## GitHub Pages Alternative

If you prefer GitHub Pages instead:

1. Update `playground/vite.config.ts`:

   ```typescript
   export default defineConfig({
     // ... other config
     base: "/yems-ui/", // your repo name
   });
   ```

2. Add `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 20
         - run: npm ci --prefix playground
         - run: npm run build --prefix playground
         - uses: actions/upload-pages-artifact@v2
           with:
             path: playground/dist
         - uses: actions/deploy-pages@v2
   ```

3. Enable GitHub Pages in repository settings

## What Gets Deployed

- **Playground App** - Interactive component showcase
- **All Components** - Live examples of your UI components
- **Responsive Design** - Works on all devices
- **Updated Styles** - All your Tailwind CSS and glassmorphism effects

## Environment Variables (if needed)

In Vercel dashboard → Settings → Environment Variables:

- Add any API endpoints or configuration needed for your playground

## Monitoring Deployment

- Vercel logs show real-time build output
- Automatic redeployment on main branch pushes
- Preview deployments for pull requests (optional)

---

**Next Steps:**

1. Choose Vercel or GitHub Pages
2. Deploy using the instructions above
3. Share your live demo URL with the community!
