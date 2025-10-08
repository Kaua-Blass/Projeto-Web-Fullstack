// app/page.js
"use client";
import Image from "next/image";
import { MdSearch } from "react-icons/md";
import { useCarrinho } from "./context/CarrinhoContext";

const produtosMockados = [
  { id: 1, nome: "GARRAFA TÉRMICA QUENCHER", preco: 109.90, pix: 103.90, imagemUrl: "quencher.png" },
  { id: 2, nome: "GARRAFA TÉRMICA AÇO INOX", preco: 77.90, pix: 73.90, imagemUrl: "termicainox.png" },
  { id: 3, nome: "GARRAFA TÉRMICA DIGITAL", preco: 49.99, pix: 44.90, imagemUrl: "digital.png" },
  { id: 4, nome: "GARRAFA TÉRMICA 1L LE COFFEE", preco: 119.90, pix: 113.90, imagemUrl: "lecoffee.png" },
];

const lancamentosMockados = [
  { id: 5, nome: "GARRAFA TÉRMICA STANLEY FLIP 651ML CHARCOAL", preco: 149.90, pix: 144.90, imagemUrl: "stanleyflip.png" },
  { id: 6, nome: "GARRAFA TÉRMICA AEROLIGHT FAST FLOW MATTE BLACK | 1.1L", preco: 139.90, pix: 134.90, imagemUrl: "fastflow.png" },
  { id: 7, nome: "GARRAFA TÉRMICA INOX 4L BLACK ERVA", preco: 79.99, pix: 74.90, imagemUrl: "termicainox.png" },
  { id: 8, nome: "GARRAFA TÉRMICA 1 L LE COFFEE", preco: 119.90, pix: 113.90, imagemUrl: "lecoffee.png" },
];

export default function Home() {
  const { adicionarItem, carrinho } = useCarrinho();
  const totalQtd = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalValor = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  return (
    <main>
      <header className="header-container">
        <div className="top-bar">
          <div style={{ position: "relative", display: "inline-block", width: "300px" }}>
            <input type="text" placeholder="O que você está buscando? " className="input-busca" />
            <span className="busca-icone">
              <MdSearch size={24} />
            </span>
          </div>
          <img src="logo.png" alt="Logo Eu Quero" className="logo-img" />
          <div className="user-area">
            <span onClick={() => window.location.href = "/login"}>👤 Login / Cadastro</span>
            <span onClick={() => window.location.href = "/carrinho"}>
              🛒 Carrinho({totalQtd}) <strong>R$ {totalValor.toFixed(2)}</strong>
            </span>
          </div>
        </div>
        <div className="nav-container">
          <nav>
            <ul className="nav-list">
              <li onClick={() => window.location.href = "/"}><a href="#">Início</a></li>
              <li><a href="#">Copos Térmicos</a></li>
              <li><a href="#">Kits Térmicos</a></li>
              <li><a href="#">Garrafas Térmicas</a></li>
              <li><a href="#">Potes Térmicos</a></li>
              <li><a href="#">Personalizar</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="product-section">
        <h2>Destaques<span>›</span></h2>
        <div className="product-list">
          {produtosMockados.map(produto => (
            <div key={produto.id} className="product-card">
              <div className="image-wrapper">
                <Image
                  src={`/${produto.imagemUrl}`}
                  alt={produto.nome}
                  className="product-img"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="name">{produto.nome}</p>
              <p className="price">R$ {produto.preco.toFixed(2)}</p>
              <p className="pix">R$ {produto.pix.toFixed(2)} à vista no Pix</p>
              <button className="add-button" onClick={() => adicionarItem(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="product-section">
        <h2>Lançamentos<span>›</span></h2>
        <div className="product-list">
          {lancamentosMockados.map(produto => (
            <div key={produto.id} className="product-card">
              <div className="image-wrapper">
                <Image
                  src={`/${produto.imagemUrl}`}
                  alt={produto.nome}
                  className="product-img"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="name">{produto.nome}</p>
              <p className="price">R$ {produto.preco.toFixed(2)}</p>
              <p className="pix">R$ {produto.pix.toFixed(2)} à vista no Pix</p>
              <button className="add-button" onClick={() => adicionarItem(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}