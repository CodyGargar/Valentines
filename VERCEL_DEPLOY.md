# Deploy to Vercel

## Option A: Deploy with Vercel (recommended – connect Git)

1. **Push your project to GitHub** (if you haven’t already):
   - Create a new repo at [github.com/new](https://github.com/new).
   - In your project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account).
   - Click **“Add New…”** → **“Project”**.
   - Import your GitHub repo (select the Valentine’s app repo).
   - Vercel will detect Next.js; leave **Build Command** as `next build` and **Output Directory** blank.
   - Click **“Deploy”**.

3. **Result**  
   After the build finishes, you’ll get a URL like `https://your-project.vercel.app`. You can change the project name in Project Settings → Domains.

---

## Option B: Deploy with Vercel CLI (no Git)

1. **Install the Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from your project folder**:
   ```bash
   cd c:\Users\edgar\Downloads\ValentinesWebApp
   vercel
   ```

3. **Follow the prompts**:
   - Log in or create a Vercel account when asked.
   - Accept the default project settings (link to existing project or create new one).
   - When it asks to link to an existing project, choose **N** if this is the first time.

4. **Production deploy** (optional):
   ```bash
   vercel --prod
   ```

You’ll get a live URL in the terminal after each deploy.

---

## Notes

- **Build**: The app uses `next build`; Vercel runs this automatically.
- **Environment**: No env vars are required for the current setup.
- **Updates**: With Git (Option A), push to `main` and Vercel will redeploy. With CLI (Option B), run `vercel` or `vercel --prod` again after changes.
