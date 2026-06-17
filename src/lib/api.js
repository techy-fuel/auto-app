import { Capacitor } from '@capacitor/core';

// The deployed site that hosts the serverless API functions (/api/*).
// Used by the native Android/iOS app, which has no local server of its own.
const PROD_API_BASE = import.meta.env.VITE_API_BASE || 'https://auto-app-five.vercel.app';

// Returns the correct URL for an API route.
// - On the web (Vercel): relative path, same origin as the site.
// - On native (Capacitor): absolute URL to the deployed API.
export function apiUrl(path) {
  if (Capacitor.isNativePlatform()) {
    return PROD_API_BASE + path;
  }
  return path;
}
