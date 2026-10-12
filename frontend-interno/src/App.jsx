import React, { useState } from 'react'

export default function App() {
  const [selectedCasillero, setSelectedCasillero] = useState('Todo')
  const [searchTerm, setSearchTerm] = useState('')
  const [perPage, setPerPage] = useState('20')
  const [activeTab, setActiveTab] = useState('Lista')

  const casilleros = [
    { id: 'Todo', label: 'Todo', dato: '10,442' },
    { id: 'A', label: 'A', dato: '723 reng · 318 pzas' },
    { id: 'B', label: 'B', dato: '2,720 reng · 1,263 pzas' },
    { id: 'C', label: 'C', dato: '3,239 reng · 1,194 pzas' },
    { id: 'D', label: 'D', dato: '3,007 reng · 1,152 pzas' },
    { id: 'E', label: 'E', dato: '753 reng · 393 pzas' },
  ]

  return (
    <>
      <header className="app-header">
        <div className="logo">RV</div>
        <div>
          <h1>Inventario Victorino</h1>
          <small>Refacciones Victorino</small>
        </div>
        <div className="acciones">
          <button type="button" className="icon-btn" aria-label="Ayuda">?</button>
          <button type="button" className="icon-btn" aria-label="Menú">☰</button>
        </div>
      </header>

      <main className="panel">
        <div className="panel-head">
          <h2>Capturas</h2>
          <span className="resumen">Todos los casilleros · 10,442 renglones</span>
        </div>

        <div className="chips" role="group" aria-label="Casillero">
          {casilleros.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={selectedCasillero === c.id}
              onClick={() => setSelectedCasillero(c.id)}
            >
              <b>{c.label}</b>
              <span className="dato">{c.dato}</span>
            </button>
          ))}
        </div>

        <div className="barra">
          <label className="search">
            <input
              type="search"
              placeholder="Buscar código, descripción o ubicación…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button type="button" className="btn-seleccionar">Seleccionar</button>
        </div>

        <div className="toolbar">
          <span>Mostrando 1–20 de 10,442</span>
          <label>
            Por página{' '}
            <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>

        <section className="fila">
          <div className="fila-head">
            <div>
              <h3>Casillero A · Fila A</h3>
              <span className="familia">Base de amortiguador</span>
            </div>
            <span className="conteo">110 reng · 110 pzas</span>
            <button type="button" className="btn">Familia</button>
            <button type="button" className="btn btn-peligro">Borrar fila</button>
          </div>

          <article className="hueco">
            <div className="hueco-head">
              <span className="bli">A-A0000</span>
              <span className="marcas">4 marcas en el hueco</span>
              <button type="button" className="btn btn-verde">Maestro ▾</button>
            </div>

            <div className="item">
              <div className="codigo">
                5004 <span className="badge-maestro">maestro</span>
              </div>
              <div className="meta">
                <span className="marca" data-marca="trackone">TrackOne</span>
                BASE AMORTIGUADOR TRASERO <span className="ref">· SYD K-6353</span>
              </div>
              <div className="lado">
                <span className="qty">1</span>
                <button type="button" className="btn btn-ghost">Editar</button>
                <button type="button" className="btn btn-ghost peligro">Borrar</button>
              </div>
            </div>

            <div className="item">
              <div className="codigo">K-6353</div>
              <div className="meta">
                <span className="marca" data-marca="syd-azul">SYD Azul</span>
                BASE AMORTIGUADOR TRASERO
              </div>
              <div className="lado">
                <span className="qty">1</span>
                <button type="button" className="btn btn-ghost">Editar</button>
                <button type="button" className="btn btn-ghost peligro">Borrar</button>
              </div>
            </div>

            <div className="item">
              <div className="codigo">1821-KIT</div>
              <div className="meta">
                <span className="marca" data-marca="dai">DAI</span>
                BASE AMORTIGUADOR TRASERO <span className="ref">· SYD K-6353</span>
              </div>
              <div className="lado">
                <span className="qty">1</span>
                <button type="button" className="btn btn-ghost">Editar</button>
                <button type="button" className="btn btn-ghost peligro">Borrar</button>
              </div>
            </div>
          </article>
        </section>
      </main>

      <nav className="tabbar">
        <button
          type="button"
          className="tab"
          aria-current={activeTab === 'Capturar' ? 'page' : undefined}
          onClick={() => setActiveTab('Capturar')}
        >
          Capturar
        </button>
        <button
          type="button"
          className="tab"
          aria-current={activeTab === 'Buscar' ? 'page' : undefined}
          onClick={() => setActiveTab('Buscar')}
        >
          Buscar
        </button>
        <button
          type="button"
          className="tab"
          aria-current={activeTab === 'Lista' ? 'page' : undefined}
          onClick={() => setActiveTab('Lista')}
        >
          Lista <span className="num">10,442</span>
        </button>
      </nav>
    </>
  )
}
