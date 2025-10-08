"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("carrinho");
      return data ? JSON.parse(data) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function adicionarItem(item) {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === item.id);
      if (existe) {
        return prev.map(i => i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i);
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function removerItem(id) {
    setCarrinho(prev => prev.filter(i => i.id !== id));
  }

  function alterarQuantidade(id, qtd) {
    setCarrinho(prev => prev.map(i => i.id === id ? { ...i, quantidade: qtd } : i));
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarItem, removerItem, alterarQuantidade }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

