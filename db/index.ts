import {env} from 'cloudflare:workers';
export function getBinding(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
