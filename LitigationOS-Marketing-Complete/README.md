# LitigationOS Marketing Website — Complete Repository

This is the clean public website for **www.litigationos.in**.

It includes:

- a polished LitigationOS marketing page;
- **Create account** buttons that open `https://app.litigationos.in/`;
- a **Request a firm demo** form;
- the Google Apps Script web-app URL already added to the form;
- `Code.gs`, the exact code that must be deployed from the supplied Google Sheet.

## A. Create the new marketing repository

1. In GitHub, create a new empty repository called `litigationos-marketing`.
2. Upload these items to the top level of that repository:
   - `index.html`
   - `assets` folder
3. Do **not** upload `Code.gs` to GitHub. That file is only for Google Apps Script.
4. In Vercel, choose **Add New → Project**, import this repository, and deploy it.
5. In Vercel **Settings → Domains**, connect `www.litigationos.in` to this marketing project.

## B. Activate the Google Sheet form

1. Open your Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Delete old script code.
4. Copy all of `Code.gs` from this folder and paste it into Apps Script.
5. Save.
6. Choose **Deploy → New deployment → Web app**.
7. Set **Execute as: Me** and **Who has access: Anyone**.
8. Click **Deploy** and approve permissions.
9. Open the resulting `/exec` URL in a browser. It must say: `LitigationOS form receiver is live.`

The form in `index.html` is already connected to this web-app URL:

`https://script.google.com/macros/s/AKfycbwGZXyt-qJGidoePhB2HqZeMqiDjiNVbHNsrN-Tx5IbUaBvxmUEShSqXqyzdrGwOHRW/exec`

If deploying the script produces a different `/exec` link, replace the existing link in `index.html` with the new one and commit the change.

## C. Test

1. Go to `www.litigationos.in`.
2. Submit **Request a firm demo**.
3. Check the `Signups` tab in your Google Sheet.
4. Click **Create account**; it opens `app.litigationos.in`.
