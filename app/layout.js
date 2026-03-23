import './globals.css';

import { SITE_METADATA } from './constants';

export const metadata = SITE_METADATA;
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
