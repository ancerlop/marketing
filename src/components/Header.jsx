import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="logo-text">Game<span className="logo-highlight">Promo</span></span>
        </Link>
      </div>
      
      <div className="header-actions">
        <button className="btn btn-primary glow-effect">
          <span className="btn-text">Publicar Ahora</span>
        </button>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header