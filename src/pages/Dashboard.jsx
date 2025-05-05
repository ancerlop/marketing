import React from 'react'
import '../styles/dashboard.css'

const Dashboard = () => {
  // Datos de ejemplo para las estadísticas
  const stats = [
    { label: 'Videos Subidos', value: '12', icon: '🎬' },
    { label: 'Publicaciones', value: '24', icon: '📱' },
    { label: 'Visualizaciones', value: '15.2K', icon: '👁️' },
    { label: 'Interacciones', value: '1.8K', icon: '❤️' },
  ]

  // Datos de ejemplo para próximas publicaciones
  const upcomingPosts = [
    { title: 'Trailer Nuevo Juego', platform: 'YouTube', date: 'Hoy, 18:00', thumbnail: 'game-trailer.jpg' },
    { title: 'Gameplay Destacado', platform: 'Instagram', date: 'Mañana, 12:00', thumbnail: 'gameplay.jpg' },
    { title: 'Anuncio Actualización', platform: 'TikTok', date: '23/10, 15:00', thumbnail: 'update.jpg' },
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <button className="btn btn-primary glow-effect">+ Nueva Publicación</button>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card card" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección principal */}
      <div className="dashboard-main">
        {/* Próximas publicaciones */}
        <div className="upcoming-posts card">
          <h2 className="card-title">Próximas Publicaciones</h2>
          <div className="posts-list">
            {upcomingPosts.map((post, index) => (
              <div className="post-item" key={index}>
                <div className="post-thumbnail">
                  <div className="platform-badge">{post.platform.charAt(0)}</div>
                </div>
                <div className="post-details">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-schedule">{post.date}</p>
                </div>
                <div className="post-actions">
                  <button className="btn-icon" aria-label="Editar">
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary view-all">Ver Todas</button>
        </div>

        {/* Sección de plantillas rápidas */}
        <div className="quick-templates card">
          <h2 className="card-title">Plantillas Rápidas</h2>
          <div className="templates-grid">
            <div className="template-card">
              <div className="template-preview game-trailer"></div>
              <p>Trailer de Juego</p>
            </div>
            <div className="template-card">
              <div className="template-preview gameplay"></div>
              <p>Gameplay</p>
            </div>
            <div className="template-card">
              <div className="template-preview update"></div>
              <p>Actualización</p>
            </div>
            <div className="template-card">
              <div className="template-preview review"></div>
              <p>Reseña</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de consejos */}
      <div className="tips-section card">
        <div className="tip-icon">💡</div>
        <div className="tip-content">
          <h3>Consejo del día</h3>
          <p>Los videos de menos de 60 segundos tienen un 30% más de retención en TikTok. ¡Mantén tus clips cortos y dinámicos!</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard