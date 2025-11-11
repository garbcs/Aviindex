import React, { useState } from 'react';

const Navigation = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => setIsNavActive(prev => !prev);
  const closeNav = () => setIsNavActive(false);

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

        <ul className={`Cabecalho_ul ${isNavActive ? 'active' : ''}`}>
          <li className="Cabecalho_li"><a className="Cabecalho_link" href="#inicio" onClick={closeNav}>Início</a></li>
          <li className="Cabecalho_li"><a className="Cabecalho_link" href="#Sobre" onClick={closeNav}>Sobre</a></li>
          <li className="Cabecalho_li"><a className="Cabecalho_link" href="#beneficios" onClick={closeNav}>Benefícios</a></li>
          <li className="Cabecalho_li"><a className="Cabecalho_link" href="#Ferramenta" onClick={closeNav}>Ferramenta</a></li>

          <li className="Cabecalho_li close_item">
            <button className="close_btn" onClick={closeNav} aria-label="Fechar menu">Fechar</button>
          </li>
        </ul>
      </nav>

      <div
        className={`nav_overlay ${isNavActive ? 'active' : ''}`}
        onClick={closeNav}
        aria-hidden={!isNavActive}
      />
    </>
  );
};

export default Navigation;



