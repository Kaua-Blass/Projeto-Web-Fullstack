'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md'; 

export default function login() {
  // Usuário de teste
  const TEST_USER = { email: 'teste@teste.com', senha: '123456', nome: 'Usuário Teste' };
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    // Verifica se já existe usuário logado
    const nome = localStorage.getItem("usuario_nome");
    if (nome) setUsuarioLogado(nome);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    if (email === TEST_USER.email && senha === TEST_USER.senha) {
      setSucesso(true);
      localStorage.setItem("usuario_nome", TEST_USER.nome);
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } else {
      setErro("Usuário ou senha inválidos. Use teste@teste.com / 123456");
    }
  }

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
            <span>
              {usuarioLogado ? `👤 ${usuarioLogado}` : "👤 Login / Cadastro"}
            </span>
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
        <form className="login-form" onSubmit={handleLogin}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seuemail@email.com.br"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            autoComplete="current-password"
          />

          <a href="#" className="forgot">Esqueceu a senha?</a>

          <div className="divider">ou</div>

          <button type="button" className="google">Continuar com o Google</button>
          <button type="button" className="apple">Continuar com a Apple</button>

          <button type="submit" className="login-btn">Iniciar Sessão</button>

          {erro && <div style={{ color: '#c00', marginTop: 8 }}>{erro}</div>}
          {sucesso && <div style={{ color: '#2ecc40', marginTop: 8 }}>Login realizado com sucesso!</div>}

          <p className="create-account">
            Não possui uma conta ainda? <a href="#">Criar uma conta</a>
          </p>
        </form>
      </section>
    </main>
  );
}