# ABIRYVA Private Security

Responsive convoy catalogue with Executive, Signature and Bespoke photographs, service filters, review profiles and persistent quote enquiries.

## Hosting

This version runs on Cloudflare Workers with a D1 database. It is not a static GitHub Pages site: the quote-request API requires a server and database. GitHub stores the source; Cloudflare hosts the application.

### First deployment

Install Node.js 22.13 or newer and pnpm. Then run:

```sh
pnpm install --frozen-lockfile
pnpm exec wrangler login
pnpm exec wrangler d1 create abiprivatesecurity-quotes
```

Copy the database ID returned by the last command into `wrangler.json`, replacing the placeholder `database_id`. Keep the binding name `DB`.

```sh
pnpm build
pnpm deploy
```

The deploy command applies the SQL migrations and deploys the Worker. Wrangler prints the live website URL. No application API key is required. Sign in to your own Cloudflare account; the database of the original hosted preview is not transferred.

### Local development

```sh
pnpm db:local
pnpm dev
```

For later deployments, run `pnpm build` followed by `pnpm deploy`. Keep migration files in version control; add new migrations for schema changes.

### Connect GitHub for automatic builds

In Cloudflare Workers & Pages, connect this GitHub repository to a Worker project. Set the build command to `pnpm build` and the deploy command to `pnpm deploy`. Configure the database ID in `wrangler.json` first. Database migrations must run against the same Cloudflare account as the deployment.

## Before accepting real bookings

Providers and reviews are demonstration content with a disclosure in the interface. Convoy images are generated representations. Replace them with your actual fleet, provider details and customer feedback. Quote requests are stored in D1 and return a reference; email/SMS notifications, dispatch, payment and booking confirmation are not connected. The site does not expose stored enquiries through a public read endpoint. Add a protected administration workflow to manage requests before launch.

## Project

- `app/page.tsx`: catalogue, filters, reviews and enquiry form.
- `app/api/requests/route.ts`: validated request-saving endpoint.
- `public/`: convoy images and brand icon.
- `db/` and `drizzle/`: database schema and migrations.
- `wrangler.json`: hosting and database binding configuration.

Built with React, Vinext, Tailwind CSS and Cloudflare D1.
