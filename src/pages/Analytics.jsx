import React, { useState } from 'react'
import '../styles/analytics.css'

const Analytics = () => {
  // Estado para el período de tiempo seleccionado
  const [timeRange, setTimeRange] = useState('7d')
  
  // Datos de ejemplo para las métricas generales
  const overviewData = {
    views: {
      total: '32.5K',
      change: '+15%',
      positive: true
    },
    engagement: {
      total: '2.8K',
      change: '+23%',
      positive: true
    },
    followers: {
      total: '845',
      change: '+8%',
      positive: true
    },
    conversion: {
      total: '3.2%',
      change: '-1%',
      positive: false
    }
  }
  
  // Datos de ejemplo para el rendimiento por plataforma
  const platformData = [
    {
      platform: 'YouTube',
      icon: '▶️',
      color: '#ff0000',
      views: '15.2K',
      engagement: '1.3K',
      retention: '45%'
    },
    {
      platform: 'Instagram',
      icon: '📸',
      color: '#e1306c',
      views: '10.8K',
      engagement: '980',
      retention: '38%'
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      color: '#69c9d0',
      views: '6.5K',
      engagement: '520',
      retention: '52%'
    }
  ]
  
  // Datos de ejemplo para los videos más exitosos
  const topVideosData = [
    {
      title: 'Trailer de Lanzamiento',
      views: '8.2K',
      engagement: '720',
      platform: 'YouTube',
      date: '15/10/2023'
    },
    {
      title: 'Gameplay de Nuevas Mecánicas',
      views: '5.7K',
      engagement: '430',
      platform: 'TikTok',
      date: '22/10/2023'
    },
    {
      title: 'Anuncio de Actualización',
      views: '4.9K',
      engagement: '380',
      platform: 'Instagram',
      date: '05/11/2023'
    },
    {
      title: 'Entrevista con Desarrolladores',
      views: '3.8K',
      engagement: '290',
      platform: 'YouTube',
      date: '12/11/2023'
    }
  ]
  
  // Datos de ejemplo para las horas óptimas
  const optimalTimesData = [
    { day: 'Lunes', time: '18:00 - 20:00', engagement: 'Alto' },
    { day: 'Martes', time: '12:00 - 14:00', engagement: 'Medio' },
    { day: 'Miércoles', time: '19:00 - 21:00', engagement: 'Alto' },
    { day: 'Jueves', time: '17:00 - 19:00', engagement: 'Medio' },
    { day: 'Viernes', time: '20:00 - 22:00', engagement: 'Alto' },
    { day: 'Sábado', time: '15:00 - 17:00', engagement: 'Alto' },
    { day: 'Domingo', time: '14:00 - 16:00', engagement: 'Medio' }
  ]

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1 className="page-title">Analíticas</h1>
        
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 días
          </button>
          <button 
            className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 días
          </button>
          <button 
            className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90 días
          </button>
        </div>
      </div>

      {/* Resumen general */}
      <div className="overview-section">
        <div className="metrics-grid">
          <div className="metric-card card">
            <h3 className="metric-title">Visualizaciones</h3>
            <div className="metric-value">{overviewData.views.total}</div>
            <div className={`metric-change ${overviewData.views.positive ? 'positive' : 'negative'}`}>
              {overviewData.views.change}
            </div>
          </div>
          
          <div className="metric-card card">
            <h3 className="metric-title">Interacciones</h3>
            <div className="metric-value">{overviewData.engagement.total}</div>
            <div className={`metric-change ${overviewData.engagement.positive ? 'positive' : 'negative'}`}>
              {overviewData.engagement.change}
            </div>
          </div>
          
          <div className="metric-card card">
            <h3 className="metric-title">Nuevos Seguidores</h3>
            <div className="metric-value">{overviewData.followers.total}</div>
            <div className={`metric-change ${overviewData.followers.positive ? 'positive' : 'negative'}`}>
              {overviewData.followers.change}
            </div>
          </div>
          
          <div className="metric-card card">
            <h3 className="metric-title">Tasa de Conversión</h3>
            <div className="metric-value">{overviewData.conversion.total}</div>
            <div className={`metric-change ${overviewData.conversion.positive ? 'positive' : 'negative'}`}>
              {overviewData.conversion.change}
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal */}
      <div className="analytics-main">
        {/* Rendimiento por plataforma */}
        <div className="platform-performance card">
          <h2 className="card-title">Rendimiento por Plataforma</h2>
          <div className="platform-list">
            {platformData.map((platform, index) => (
              <div className="platform-item" key={index}>
                <div className="platform-header">
                  <div className="platform-icon" style={{ backgroundColor: platform.color }}>
                    {platform.icon}
                  </div>
                  <h3 className="platform-name">{platform.platform}</h3>
                </div>
                
                <div className="platform-stats">
                  <div className="platform-stat">
                    <span className="stat-label">Vistas</span>
                    <span className="stat-value">{platform.views}</span>
                  </div>
                  <div className="platform-stat">
                    <span className="stat-label">Interacciones</span>
                    <span className="stat-value">{platform.engagement}</span>
                  </div>
                  <div className="platform-stat">
                    <span className="stat-label">Retención</span>
                    <span className="stat-value">{platform.retention}</span>
                  </div>
                </div>
                
                <div className="platform-bar-container">
                  <div 
                    className="platform-bar" 
                    style={{ 
                      width: platform.retention,
                      backgroundColor: platform.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos más exitosos */}
        <div className="top-videos card">
          <h2 className="card-title">Videos Más Exitosos</h2>
          <div className="videos-table">
            <div className="table-header">
              <div className="header-cell">Título</div>
              <div className="header-cell">Vistas</div>
              <div className="header-cell">Interacciones</div>
              <div className="header-cell">Plataforma</div>
              <div className="header-cell">Fecha</div>
            </div>
            
            {topVideosData.map((video, index) => (
              <div className="table-row" key={index}>
                <div className="cell video-title">{video.title}</div>
                <div className="cell">{video.views}</div>
                <div className="cell">{video.engagement}</div>
                <div className="cell">{video.platform}</div>
                <div className="cell">{video.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de horas óptimas */}
      <div className="optimal-times card">
        <h2 className="card-title">Horas Óptimas para Publicar</h2>
        <div className="times-grid">
          {optimalTimesData.map((item, index) => (
            <div className="time-card" key={index}>
              <div className="day-label">{item.day}</div>
              <div className="time-value">{item.time}</div>
              <div className={`engagement-indicator ${item.engagement.toLowerCase()}`}>
                {item.engagement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de recomendaciones */}
      <div className="recommendations card">
        <h2 className="card-title">Recomendaciones Personalizadas</h2>
        <div className="recommendations-content">
          <div className="recommendation-item">
            <div className="recommendation-icon">💡</div>
            <div className="recommendation-text">
              <p>Tus videos de <strong>gameplay</strong> tienen un 25% más de retención. Considera crear más contenido de este tipo.</p>
            </div>
          </div>
          
          <div className="recommendation-item">
            <div className="recommendation-icon">⏰</div>
            <div className="recommendation-text">
              <p>Las publicaciones los <strong>viernes por la noche</strong> reciben un 40% más de interacciones. Programa tus contenidos más importantes para este horario.</p>
            </div>
          </div>
          
          <div className="recommendation-item">
            <div className="recommendation-icon">📱</div>
            <div className="recommendation-text">
              <p><strong>TikTok</strong> está generando la mayor tasa de conversión. Considera aumentar tu frecuencia de publicación en esta plataforma.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics