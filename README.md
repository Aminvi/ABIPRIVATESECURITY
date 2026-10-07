# ABIRYVA Private Security

Next.js website for Executive, Signature and Bespoke convoy services. Includes convoy images, service filters, review profiles and a quote request API.

## Deploy on Vercel

1. In Vercel, select **Add New → Project**, then import `Aminvi/ABIPRIVATESECURITY`.
2. Use **Next.js** as the Framework Preset and the repository root as Root Directory.
3. Use the default Next.js output directory; remove any previous `dist`, `dist/client` or `public` output override. Build command: `pnpm build`.
4. Deploy. The catalogue can build and display before database environment variables are configured. The request form will return a recoverable error until the database is configured; it never reports an unsaved request as successful.

The GitHub integration creates new deployments when changes are pushed. If an older deployment failed, deploy the latest commit rather than redeploying the old source.

## Enable quote saving

The site uses Cloudflare D1 over HTTPS from Vercel. The original private preview's database is not copied into this repository.

1. Create a D1 database in your own Cloudflare account, or use your existing convoy-request database.
2. In its SQL console, run the schema in `drizzle/0000_regular_roxanne_simpson.sql` once on an empty database. The table is `quote_requests`.
3. Create a Cloudflare API token limited to **Account / D1 / Edit** for the account containing that database.
4. In Vercel **Project Settings → Environment Variables**, set:

| Variable | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| `CLOUDFLARE_D1_DATABASE_ID` | D1 database ID |
| `CLOUDFLARE_D1_API_TOKEN` | Scoped Cloudflare API token |

Set them for Production and any Preview deployments where booking requests should work. Redeploy after adding or changing variables. Keep the token in Vercel settings; do not put it in GitHub or prefix it with `NEXT_PUBLIC_`.

The full-screen success message appears only after D1 confirms the insert. Email/SMS notifications, payments, dispatch and confirmed bookings are not connected.

## Local development

Use Node.js 22.13 or newer and pnpm:

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Fill `.env.local` with your database values to test quote saving. To validate the production build:

```sh
pnpm build
pnpm start
```

## Before launch

Providers and customer reviews remain demonstration content with a disclosure. Replace them with actual providers and customer feedback. Convoy photographs are generated representations; replace them with your actual fleet when available. Stored enquiries have no public read endpoint; an authenticated management workflow still needs to be added for dispatch operations.

The original Cloudflare-specific build entry point and configuration have been removed. This repository now uses standard Next.js on Vercel.
