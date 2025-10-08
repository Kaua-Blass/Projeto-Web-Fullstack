'use client'; // <-- IMPORTANTE: Indica que este é um Client Component

import { useState, useEffect } from 'react';

// URL base da sua API mockada (Back-end)
const API_URL = 'http://localhost:3001/api/produtos'; 

// O componente da sua página principal (Tela de Produtos)
export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect é usado para rodar a função de busca APÓS o componente ser montado
  useEffect(() => {
    async function fetchProdutos() {
      try {
        // 1. FAZENDO A CHAMADA DE API (o requisito obrigatório!)
        const response = await fetch(API_URL); 
        
        // Trata erros de resposta HTTP (ex: 404, 500)
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }

        const data = await response.json();
        setProdutos(data); // 2. Armazena os produtos no estado
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos. Verifique se o Back-end (porta 3001) está rodando.");
      } finally {
        setLoading(false); // 3. Finaliza o estado de carregamento
      }
    }

    fetchProdutos();
  }, []); // O array vazio [] garante que a função rode apenas uma vez

  if (loading) {
    return <h1>Carregando produtos...</h1>;
  }

  if (error) {
    return <h1 style={{ color: 'red' }}>Erro: {error}</h1>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catálogo de Produtos</h1>
      <p>Total de {produtos.length} produtos em estoque.</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Mapeia e exibe os produtos recebidos da API */}
        {produtos.map(produto => (
          <div key={produto.id} style={cardStyle}>
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p><strong>R$ {produto.preco.toFixed(2)}</strong></p>
            <button>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilo básico para o card de produto (apenas para visualização inicial)
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  width: '300px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
};