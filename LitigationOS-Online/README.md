# LitigationOS — online AI version

This version has a secure server endpoint for the OpenAI API. It is ready to deploy on Vercel.

## Deploy

1. Upload the *contents* of this folder to the private `litigationos` GitHub repository you created.
2. In Vercel, click **Add New → Project**, import that GitHub repository, and click **Deploy**.
3. In the deployed project, open **Settings → Environment Variables**. Add:
   - Name: `OPENAI_API_KEY`
   - Value: your OpenAI API key
   - Environments: Production, Preview, and Development
4. Click **Redeploy** from the Deployments page.
5. Open the Vercel URL and test the AI Associate or Legal Research page.

## Important

- Never put the API key in `public/index.html`, GitHub, or a message.
- This is a legal-information tool, not a substitute for professional advice. Verify all legal authorities and outputs.
- The endpoint requests `store: false` so responses are not retained as application state by the Responses API.
