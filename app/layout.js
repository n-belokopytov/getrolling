import './globals.css';

import { SITE_METADATA } from './constants';

export const metadata = SITE_METADATA;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
