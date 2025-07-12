import { DataProvider } from '../contexts/DataContext';
import './globals.css';

export const metadata = {
  title: 'Empathic Actions Portal',
  description: 'Formulario de Registro',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white text-black font-sans">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
