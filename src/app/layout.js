// app/layout.js (OU .tsx)
import '../styles/globals.css'; // Importa seu CSS global aqui

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* O 'children' é onde o seu 'page.js' e outras páginas serão renderizadas */}
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Eu Quero - Sua Loja',
  description: 'Melhores produtos térmicos.',
};