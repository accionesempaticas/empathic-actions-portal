import './globals.css'

export const metadata = {
  title: 'Empathic Actions Portal',
  description: 'Portal de voluntariado y acciones empáticas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" defer></script>
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  )
}