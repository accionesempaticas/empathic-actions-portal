import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { UsersProvider } from '@/contexts/UsersContext';
import RootWrapper from "@/components/layout/RootWrapper";
import './globals.css';

export const metadata = {
  title: 'Empathic Actions Portal',
  description: 'Portal de voluntariado y acciones empáticas',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" defer></script>
      </head>
      <body>
      <AuthProvider>
        <UsersProvider>
          <RootWrapper>{children}</RootWrapper>
          <Toaster />
        </UsersProvider>
      </AuthProvider>
      </body>
      </html>
  );
}
