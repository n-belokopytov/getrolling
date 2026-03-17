import './globals.css';

export const metadata = {
  title: 'GetRolling.tech',
  description: 'Engineering systems that actually move.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
