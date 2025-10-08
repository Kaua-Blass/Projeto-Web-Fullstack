'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { MdSearch } from 'react-icons/md'; 

export default function login() {
     return (
        <main>
            <header className="header-container">
                <div className="top-bar">
                {/* Campo de busca com ícone */}
          <div style={{ position: 'relative', display: 'inline-block', width: '300px' }}>
            <input type="text" placeholder="O que você está buscando? " className="input-busca" />
            <span className="busca-icone">
              <MdSearch size={24} />
            </span>
          </div>
                <img src="logo.png" alt="Logo Eu Quero" className="logo-img" /> 
                <div className="user-area">
                    <span >👤 Login / Cadastro</span>
                    <span onClick={() => window.location.href='../carrinho'}>🛒 Carrinho() <strong>R$0,0</strong></span>
                </div>
                </div>
                <div className="nav-container">
                <nav>
                <ul className="nav-list">
                    <li onClick={() => window.location.href='/'}><a href="#">Início</a></li>
                    <li><a href="#">Copos Térmicos</a></li>
                    <li><a href="#">Kits Térmicos</a></li>
                    <li><a href="#">Garrafas Térmicas</a></li>
                    <li><a href="#">Potes Térmicos</a></li>
                    <li><a href="#">Personalizar</a></li>
                </ul>
                </nav>
                </div>
            </header>

      <section>
        <h2>Iniciar Sessão</h2>
        <form className="login-form">
          <label>E-mail</label>
          <input type="email" placeholder="seuemail@email.com.br" />

          <label>Senha</label>
          <input type="password" placeholder="sua senha" />

          <a href="#" className="forgot">Esqueceu a senha?</a>

          <div className="divider">ou</div>

          <button type="button" className="google">Continuar com o Google</button>
          <button type="button" className="apple">Continuar com a Apple</button>

          <button type="submit" className="login-btn">Iniciar Sessão</button>

          <p className="create-account">
            Não possui uma conta ainda? <a href="#">Criar uma conta</a>
          </p>
        </form>
      </section>
    </main>
  );
}