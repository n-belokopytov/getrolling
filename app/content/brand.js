import { OWNER_PROFILE } from './owner';

export const BRAND = {
  name: 'GetRolling',
  domainSuffix: '.tech',
  topbarHeadline: "Let's get your project rolling.",
  tagline: 'Hands-on help for faster, safer delivery',
};
const SITE_ICON_PATH = '/icon-light-512.png';
const SITE_ICON_DARK_PATH = '/icon-dark-512.png';
const FAVICON_32_PATH = '/favicon-32x32.png';
const FAVICON_16_PATH = '/favicon-16x16.png';
const FAVICON_32_DARK_PATH = '/favicon-32x32-dark.png';
const FAVICON_16_DARK_PATH = '/favicon-16x16-dark.png';
const APPLE_ICON_PATH = '/icon-light-180.png';

export const SITE_METADATA = {
  title: `${BRAND.name}${BRAND.domainSuffix} | Delivery and Reliability, Hands-on`,
  description:
    `${OWNER_PROFILE.fullName}, ${OWNER_PROFILE.role}. Hands-on help for CTOs and product leaders to ship faster, cut incidents, and fix ownership gaps.`,
  icons: {
    icon: [
      { url: FAVICON_32_PATH, media: '(prefers-color-scheme: light)', sizes: '32x32' },
      { url: FAVICON_16_PATH, media: '(prefers-color-scheme: light)', sizes: '16x16' },
      { url: FAVICON_32_DARK_PATH, media: '(prefers-color-scheme: dark)', sizes: '32x32' },
      { url: FAVICON_16_DARK_PATH, media: '(prefers-color-scheme: dark)', sizes: '16x16' },
      { url: SITE_ICON_PATH, media: '(prefers-color-scheme: light)', sizes: '512x512' },
      { url: SITE_ICON_DARK_PATH, media: '(prefers-color-scheme: dark)', sizes: '512x512' },
    ],
    shortcut: [
      { url: FAVICON_32_PATH, media: '(prefers-color-scheme: light)', sizes: '32x32' },
      { url: FAVICON_16_PATH, media: '(prefers-color-scheme: light)', sizes: '16x16' },
      { url: FAVICON_32_DARK_PATH, media: '(prefers-color-scheme: dark)', sizes: '32x32' },
      { url: FAVICON_16_DARK_PATH, media: '(prefers-color-scheme: dark)', sizes: '16x16' },
    ],
    apple: [
      { url: APPLE_ICON_PATH, sizes: '180x180' },
    ],
  },
};
