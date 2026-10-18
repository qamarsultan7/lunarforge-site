# ShieldBrain by LunarForge

Static responsive product website. Deployable files live in dist/; no build is required. Uses a styled text wordmark and actual supplied app screenshots. Local hosting metadata, original image exports, and unused logo assets are excluded from Git.

## Preview and validate

Run `python -m http.server 8000 --directory dist` and open http://localhost:8000.

Run `node --check dist/script.js` and `python scripts/check_site.py` for the same checks used by CI.

## Publish with GitHub Actions

1. Create a GitHub repository and connect this checkout if needed: `git remote add origin https://github.com/OWNER/REPOSITORY.git`.
2. In repository **Settings > Pages > Build and deployment**, select **GitHub Actions**.
3. Commit and push the website, including dist/assets/, scripts/, and .github/workflows/deploy-pages.yml, to main or master.
4. Open **Actions > Deploy website to GitHub Pages**. Successful deployment provides the live URL in the github-pages environment. **Run workflow** supports manual deployment too.

Pull requests validate JavaScript and local assets/anchors without deploying. Pushes to main or master validate and deploy dist/. No personal access token is needed. Use one production branch to avoid competing deployments. Pages availability depends on repository visibility and GitHub plan.

Relative asset paths support project repositories at https://OWNER.github.io/REPOSITORY/. Configure a custom domain in Pages settings if desired. No domain is assumed here.

This checkout has no Git remote; live deployment requires connecting the repository and pushing changes. Optional Google Fonts have system fallbacks. App links use the existing ShieldBrain page rather than an unverified download URL.
