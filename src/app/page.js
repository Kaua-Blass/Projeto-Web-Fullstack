// app/page.js
'use client'; 

const produtosMockados = [
    { id: 1, nome: "GARRAFA TÉRMICA QUENCHER", preco: 109.90, pix: 103.90, imagemUrl: "garrafa1.png" },
    { id: 2, nome: "GARRAFA TÉRMICA AÇO INOX", preco: 77.90, pix: 73.90, imagemUrl: "garrafa2.png" },
    { id: 3, nome: "GARRAFA TÉRMICA DIGITAL", preco: 49.99, pix: 44.90, imagemUrl: "garrafa3.png" },
    { id: 4, nome: "GARRAFA TÉRMICA 1L LE COFFEE", preco: 119.90, pix: 113.90, imagemUrl: "garrafa4.png" },
];

export default function Home() {
  
  return (
    <main>
      <header className="header-container">
        <div className="top-bar">
          {/* USANDO CLASSNAME */}
          <input type="text" placeholder="O que você está buscando?" className="input-busca" />
          <img src="/IMAGENS/logo.png" alt="Logo Eu Quero" className="logo-img" /> 
          <div className="user-area">
            <span onClick={() => window.location.href='/login'}>👤 Login / Cadastro</span>
            <span onClick={() => window.location.href='/carrinho'}>🛒 Carrinho(1) <strong>R$149,90</strong></span>
          </div>
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="#">Copos Térmicos</a></li>
            <li><a href="#">Kits Térmicos</a></li>
            <li><a href="#">Garrafas Térmicas</a></li>
            <li><a href="#">Potes Térmicos</a></li>
            <li><a href="#">Personalizar</a></li>
          </ul>
        </nav>
      </header>

      <section className="product-section">
        <h2>Destaques (Layout Fixo) <span>›</span></h2>
        
        <div className="product-list">
          {produtosMockados.map(produto => (
            <div key={produto.id} className="product-card">
              {/* USANDO CLASSNAME */}
              <img src={produto.imagemUrl} alt={produto.nome} className="product-img" />
              <p className="name">{produto.nome}</p>
              <p className="price">R$ {produto.preco.toFixed(2)}</p>
              <p className="pix">R$ {produto.pix.toFixed(2)} à vista no Pix</p> 
              <button className="add-button">Adicionar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="product-section">
        <h2>Lançamentos (Layout Fixo) <span>›</span></h2>
        
        <div className="product-list">
             <div className="product-card"><img src="lan1.png" alt="" className="product-img" /><p>GARRAFA STANLEY FLIP</p><p className="price">R$ 149,90</p><button className="add-button">Adicionar</button></div>
             <div className="product-card"><img src="lan2.png" alt="" className="product-img" /><p>GARRAFA TÉRMICA AEROLIGHT</p><p className="price">R$ 139,90</p><button className="add-button">Adicionar</button></div>
             <div className="product-card"><img src="lan3.png" alt="" className="product-img" /><p>GARRAFA TÉRMICA INOX</p><p className="price">R$ 79,99</p><button className="add-button">Adicionar</button></div>
             <div className="product-card"><img src="lan4.png" alt="" className="product-img" /><p>GARRAFA TÉRMICA 1L</p><p className="price">R$ 119,90</p><button className="add-button">Adicionar</button></div>
        </div>
      </section>

    </main>
  );
}