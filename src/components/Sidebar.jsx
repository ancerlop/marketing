import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/sidebar.css'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/upload', icon: '🎬', label: 'Subir Videos' },
    { path: '/templates', icon: '🎮', label: 'Plantillas' },
    { path: '/analytics', icon: '📈', label: 'Analíticas' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="close-sidebar" 
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar menú"
        >
          ×
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="platform-selector">
          <div className="platform-title">Plataformas</div>
          <div className="platform-options">
            <label className="platform-option">
              <input type="checkbox" defaultChecked />
              <span className="platform-name">YouTube</span>
            </label>
            <label className="platform-option">
              <input type="checkbox" defaultChecked />
              <span className="platform-name">Instagram</span>
            </label>
            <label className="platform-option">
              <input type="checkbox" defaultChecked />
              <span className="platform-name">TikTok</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar