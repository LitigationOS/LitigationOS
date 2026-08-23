# LitigationOS marketing website

This is the public website for **www.litigationos.in**. It is separate from the LitigationOS app.

## What the Create account buttons do

Every **Create account** button opens:

`https://app.litigationos.in/login.html`

This is where the Firebase Google account page must live in your **app** project. If your app login address changes, open `index.html` and replace the value after `APP_LOGIN_URL` at the very top.

## Put this on GitHub and Vercel

1. Create a brand-new, empty GitHub repository called `litigationos-marketing`.
2. Upload everything inside this folder: `index.html` and the `assets` folder. Do not upload this outer folder itself.
3. In Vercel, choose **Add New → Project**, import `litigationos-marketing`, then press **Deploy**. No framework settings are needed.
4. In that Vercel project, open **Settings → Domains** and add `www.litigationos.in`.
5. Keep `app.litigationos.in` assigned only to your app project—not this marketing project.

## Important

The marketing site will work immediately. Creating an account requires the app project to contain a working `/login.html` page with Firebase Google sign-in enabled.
