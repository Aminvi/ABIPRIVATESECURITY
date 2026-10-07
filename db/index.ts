import 'server-only';

// Vercel has no Cloudflare Worker bindings. D1 is reached through its HTTPS API.
export function getBinding() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_API_TOKEN;
  if (!accountId || !databaseId || !token) {
    throw new Error('Quote database is not configured.');
  }
  if (!/^[a-f0-9]{32}$/i.test(accountId) || !/^[a-f0-9-]{36}$/i.test(databaseId)) {
    throw new Error('Quote database configuration is invalid.');
  }
  return {
    prepare(sql: string) {
      return {
        bind(...params: string[]) {
          return {
            async run() {
              const response = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
                {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ sql, params }),
                  cache: 'no-store',
                  signal: AbortSignal.timeout(15000),
                },
              );
              const data = await response.json() as {
                success?: boolean;
                result?: Array<{ success?: boolean }>;
              };
              if (!response.ok || data.success !== true || !data.result?.length || data.result.some(r => r.success !== true)) {
                throw new Error('Quote database request failed.');
              }
              return data.result;
            },
          };
        },
      };
    },
  };
}
