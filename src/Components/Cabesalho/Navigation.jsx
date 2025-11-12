import React, { useState } from 'react';

const Navigation = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => setIsNavActive(prev => !prev);
  
  const closeNav = () => {
    setIsNavActive(false);
    // Remove o scroll lock do body quando o menu fecha
    document.body.style.overflow = '';
  };
  
  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    
    // Fecha o menu imediatamente
    closeNav();
    
    // Função para fazer o scroll suave
    const scrollToElement = () => {
      // Tenta encontrar o elemento
      let element = document.getElementById(targetId);
      
      // Se não encontrar, tenta com diferentes variações do ID
      if (!element) {
        // Tenta com primeira letra maiúscula
        element = document.getElementById(targetId.charAt(0).toUpperCase() + targetId.slice(1));
      }
      if (!element) {
        // Tenta com todas as letras minúsculas
        element = document.getElementById(targetId.toLowerCase());
      }
      
      if (element) {
        // Usa scrollIntoView com comportamento suave
        // O scroll-padding-top no CSS já cuida do offset do header
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      } else {
        // Fallback: navega normalmente
        window.location.href = href;
      }
    };
    
    // Aguarda um pouco para o menu fechar e então faz o scroll suave
    setTimeout(scrollToElement, 200);
  };

  return (
    <>
      <nav className="Cabecalho_nav">
        <button
          type="button"
          className={`mobile_menu ${isNavActive ? 'active' : ''}`}
          onClick={toggleNav}
          aria-expanded={isNavActive}
          aria-label={isNavActive ? 'Fechar menu' : 'Abrir menu'}
        >
          <div className={`line line1 ${isNavActive ? 'active' : ''}`} />
          <div className={`line line2 ${isNavActive ? 'active' : ''}`} />
          <div className={`line line3 ${isNavActive ? 'active' : ''}`} />
        </button>

        <ul 
          className={`Cabecalho_ul ${isNavActive ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            // Previne que o overlay capture o evento
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <li className="Cabecalho_li">
            <a className="Cabecalho_link" href="#inicio" onClick={handleLinkClick}>Início</a>
          </li>
          <li className="Cabecalho_li">
            <a className="Cabecalho_link" href="#Sobre" onClick={handleLinkClick}>Sobre</a>
          </li>
          <li className="Cabecalho_li">
            <a className="Cabecalho_link" href="#beneficios" onClick={handleLinkClick}>Benefícios</a>
          </li>
          <li className="Cabecalho_li">
            <a className="Cabecalho_link" href="#Ferramenta" onClick={handleLinkClick}>Ferramenta</a>
          </li>
        </ul>
      </nav>

      <div
        className={`nav_overlay ${isNavActive ? 'active' : ''}`}
        onClick={(e) => {
          // Só fecha se o clique foi diretamente no overlay
          // Verifica se o clique não veio do menu
          const menu = document.querySelector('.Cabecalho_ul.active');
          if (menu && menu.contains(e.target)) {
            return; // Não fecha se o clique foi no menu
          }
          closeNav();
        }}
        onMouseDown={(e) => {
          const menu = document.querySelector('.Cabecalho_ul.active');
          if (menu && menu.contains(e.target)) {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          const menu = document.querySelector('.Cabecalho_ul.active');
          if (menu && menu.contains(e.target)) {
            e.stopPropagation();
          }
        }}
        aria-hidden={!isNavActive}
      />
    </>
  );
};

export default Navigation;



