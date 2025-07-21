import {Toaster} from 'react-hot-toast';
import {AuthProvider} from '@/contexts/AuthContext';
import {UsersProvider} from '@/contexts/UsersContext';
import RootWrapper from "@/components/layout/RootWrapper";
import {Poppins} from "next/font/google";
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata = {
    title: 'Empathic Actions Portal',
    description: 'Portal de voluntariado y acciones empáticas',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={poppins.className}>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" defer></script>
        </head>
        <body>
        <AuthProvider>
            <UsersProvider>
                {children}
                <Toaster/>
            </UsersProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
