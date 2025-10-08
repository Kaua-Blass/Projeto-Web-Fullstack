"use client";

import Image from "next/image";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CarrinhoPage() {
    const { carrinho, removerItem, alterarQuantidade } = useCarrinho();
    const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const totalPix = carrinho.reduce((acc, item) => acc + (item.pix || item.preco) * item.quantidade, 0);

    // Estado para CEP e frete
    const [cep, setCep] = useState("");
    const [frete, setFrete] = useState(null);
    const [loadingFrete, setLoadingFrete] = useState(false);
    const [erroFrete, setErroFrete] = useState("");
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const nome = localStorage.getItem("usuario_nome");
            if (nome) setUsuarioLogado(nome);
        }
    }, []);
    function handleLogout() {
        localStorage.removeItem("usuario_nome");
        setUsuarioLogado(null);
        setShowMenu(false);
    }

    async function consultarFrete() {
        setLoadingFrete(true);
        setErroFrete("");
        setFrete(null);
        try {
            if (!cep.match(/^\d{8}$/)) {
                setErroFrete("CEP inválido. Digite 8 números.");
                setLoadingFrete(false);
                return;
            }
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (data.erro) {
                setErroFrete("CEP não encontrado.");
                setLoadingFrete(false);
                return;
            }
            const valorFrete = 19.90 + carrinho.reduce((acc, item) => acc + item.quantidade * 2, 0);
            setFrete(valorFrete);
        } catch {
            setErroFrete("Erro ao consultar frete.");
        }
        setLoadingFrete(false);
    }

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
                    <img src="/logo.png" alt="Logo Eu Quero" className="logo-img" />
                    <div className="user-area">
                        <span
                            style={{ position: "relative", cursor: "pointer" }}
                            onClick={() => {
                                if (!usuarioLogado) {
                                    window.location.href = "/login";
                                } else {
                                    setShowMenu((v) => !v);
                                }
                            }}
                        >
                            {usuarioLogado ? `👤 ${usuarioLogado}` : "👤 Login / Cadastro"}
                            {usuarioLogado && showMenu && (
                                <div style={{
                                    position: "absolute",
                                    top: "100%",
                                    right: 0,
                                    background: "#fff",
                                    border: "1px solid #ddd",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    zIndex: 10,
                                    minWidth: 120,
                                    padding: 4
                                }}>
                                    <div style={{ padding: "8px 12px", cursor: "pointer" }} onClick={() => setShowMenu(false)}>Meus Dados</div>
                                    <div style={{ padding: "8px 12px", cursor: "pointer", color: "#c00" }} onClick={handleLogout}>Sair</div>
                                </div>
                            )}
                        </span>
                        <span style={{ cursor: "default" }}>🛒 Carrinho({carrinho.reduce((acc, item) => acc + item.quantidade, 0)}) <strong>R$ {subtotal.toFixed(2)}</strong></span>
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

            <div className="carrinho-page-container">
                <div className="carrinho-resumo-box">
                    <button className="carrinho-fechar-btn" onClick={() => window.location.href = "/"}>
                        <span style={{ fontSize: "2em", lineHeight: "0.5" }}>&times;</span>
                    </button>
                    <h3>Carrinho de compras</h3>

                    {/* Lista de itens do carrinho */}
                    {carrinho.length === 0 ? (
                        <p style={{ textAlign: "center", margin: "32px 0" }}>Seu carrinho está vazio.</p>
                    ) : carrinho.map(item => (
                        <div key={item.id} className="carrinho-item">
                            <div className="carrinho-item-img">
                                <Image
                                    src={`/${item.imagemUrl}`}
                                    alt={item.nome}
                                    width={70}
                                    height={100}
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <div className="carrinho-item-details">
                                <p className="item-name">{item.nome}</p>
                                <div className="item-controls-row">
                                    <div className="quantity-controls">
                                        <button onClick={() => alterarQuantidade(item.id, Math.max(1, item.quantidade - 1))}>-</button>
                                        <input type="text" value={item.quantidade} readOnly />
                                        <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
                                    </div>
                                    <span className="item-price">R$ {item.preco.toFixed(2)}</span>
                                </div>
                                <span className="remove-link" onClick={() => removerItem(item.id)}>Remover</span>
                            </div>
                        </div>
                    ))}

                    {/* RESUMO/TOTAIS */}
                    <div className="carrinho-footer">
                        <div className="carrinho-totals subtotal">
                            <span>Subtotal (sem frete):</span>
                            <span>R$ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="shipping-info">
                            <p className="meios-envio-title">Meios de envio:</p>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input
                                    type="text"
                                    placeholder="Seu CEP"
                                    className="cep-input"
                                    value={cep}
                                    onChange={e => setCep(e.target.value.replace(/\D/g, ""))}
                                    maxLength={8}
                                    style={{ width: 120 }}
                                />
                                <button type="button" onClick={consultarFrete} disabled={loadingFrete} style={{ padding: "6px 12px" }}>
                                    {loadingFrete ? "Consultando..." : "Consultar Frete"}
                                </button>
                            </div>
                            {erroFrete && <div style={{ color: "#c00", fontSize: 13 }}>{erroFrete}</div>}
                            {frete !== null && !erroFrete && (
                                <div style={{ color: "#2ecc40", fontWeight: 500, marginTop: 4 }}>
                                    Frete: R$ {frete.toFixed(2)}
                                </div>
                            )}
                            <a href="#" className="nao-sei-cep">Não sei meu CEP</a>
                        </div>
                        <div className="carrinho-totals total-final">
                            <span>Total:</span>
                            <div className="total-prices">
                                <span className="price-original">
                                    R$ {(frete !== null && !erroFrete ? subtotal + frete : subtotal).toFixed(2)}
                                    {frete !== null && !erroFrete && (
                                        <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>
                                            (inclui frete)
                                        </span>
                                    )}
                                </span>
                                <span className="price-pix">
                                    Ou R$ {(frete !== null && !erroFrete ? totalPix + frete : totalPix).toFixed(2)} com PIX
                                </span>
                            </div>
                        </div>
                        <button className="iniciar-compra-btn full-width">Iniciar compra</button>
                        <a href="/" className="ver-mais-produtos">Ver mais produtos</a>
                    </div>
                </div>
            </div>
        </main>
    );
}