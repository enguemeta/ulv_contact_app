import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>    
        <html lang='en'>
          {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
          <head />
          <body>{children}</body>
        </html>      
    </UserProvider>
  );
}
