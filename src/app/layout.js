// app/layout.js 


import '../styles/globals.css';
import { CarrinhoProvider } from "./context/CarrinhoContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Eu Quero - Sua Loja',
  description: 'Melhores produtos térmicos.',
};