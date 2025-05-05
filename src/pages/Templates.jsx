import React, { useState } from 'react'
import '../styles/templates.css'

const Templates = () => {
  // Categorías de plantillas
  const categories = [
    'Todos', 'Trailers', 'Gameplay', 'Actualizaciones', 'Reseñas'
  ]

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Datos de ejemplo para las plantillas
  const templateData = [
    {
      id: 1,
      title: 'Trailer Épico',
      category: 'Trailers',
      thumbnail: 'epic-trailer.jpg',
      description: 'Plantilla ideal para anunciar nuevos juegos con efectos cinemáticos y transiciones épicas.',
      duration: '30s',
      popularity: 'Alta'
    },
    {
      id: 2,
      title: 'Gameplay Destacado',
      category: 'Gameplay',
      thumbnail: 'gameplay-highlight.jpg',
      description: 'Muestra las mejores partes de tu juego con esta plantilla dinámica y energética.',
      duration: '45s',
      popularity: 'Media'
    },
    {
      id: 3,
      title: 'Actualización de Contenido',
      category: 'Actualizaciones',
      thumbnail: 'content-update.jpg',
      description: 'Anuncia nuevas características y contenido con esta plantilla informativa y atractiva.',
      duration: '20s',
      popularity: 'Alta'
    },
    {
      id: 4,
      title: 'Reseña Rápida',
      category: 'Reseñas',
      thumbnail: 'quick-review.jpg',
      description: 'Formato perfecto para compartir opiniones y valoraciones sobre juegos de forma concisa.',
      duration: '60s',
      popularity: 'Media'
    },
    {
      id: 5,
      title: 'Teaser Misterioso',
      category: 'Trailers',
      thumbnail: 'mysterious-teaser.jpg',
      description: 'Genera intriga y expectación con esta plantilla de estilo teaser oscuro y enigmático.',
      duration: '15s',
      popularity: 'Alta'
    },
    {
      id: 6,
      title: 'Tutorial de Mecánicas',
      category: 'Gameplay',
      thumbnail: 'mechanics-tutorial.jpg',
      description: 'Explica las mecánicas de tu juego de forma clara y visual con esta plantilla educativa.',
      duration: '45s',
      popularity: 'Baja'
    },
    {
      id: 7,
      title: 'Parche de Equilibrio',
      category: 'Actualizaciones',
      thumbnail: 'balance-patch.jpg',
      description: 'Comunica cambios de equilibrio y correcciones con esta plantilla técnica y detallada.',
      duration: '30s',
      popularity: 'Media'
    },
    {
      id: 8,
      title: 'Comparativa Visual',
      category: 'Reseñas',
      thumbnail: 'visual-comparison.jpg',
      description: 'Compara aspectos visuales o de rendimiento con esta plantilla de pantalla dividida.',
      duration: '40s',
      popularity: 'Baja'
    }
  ]

  // Filtrar plantillas por categoría
  const filteredTemplates = selectedCategory === 'Todos' 
    ? templateData 
    : templateData.filter(template => template.category === selectedCategory)

  return (
    <div className="templates-container">
      <div className="templates-header">
        <h1 className="page-title">Plantillas</h1>
        <button className="btn btn-primary glow-effect">+ Crear Plantilla Personalizada</button>
      </div>

      {/* Filtro de categorías */}
      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cuadrícula de plantillas */}
      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div className="template-item card" key={template.id}>
            <div className="template-preview">
              <div className="template-overlay">
                <button className="preview-btn">Vista Previa</button>
                <button className="use-btn btn-primary">Usar</button>
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-title">{template.title}</h3>
              <p className="template-description">{template.description}</p>
              <div className="template-meta">
                <span className="template-duration">
                  <span className="meta-icon">⏱️</span> {template.duration}
                </span>
                <span className="template-popularity">
                  <span className="meta-icon">🔥</span> {template.popularity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de plantillas destacadas */}
      <div className="featured-section">
        <h2 className="section-title">Plantillas Destacadas para Videojuegos</h2>
        <div className="featured-content">
          <div className="featured-info">
            <h3>Plantillas Optimizadas para Gaming</h3>
            <p>Nuestras plantillas están diseñadas específicamente para la industria de videojuegos, con transiciones, efectos y estilos que resaltan la acción y la emoción de tus juegos.</p>
            <ul className="featured-benefits">
              <li>Optimizadas para cada plataforma social</li>
              <li>Efectos visuales de alta calidad</li>
              <li>Transiciones dinámicas para gameplay</li>
              <li>Espacios para logos y marcas de agua</li>
              <li>Textos y subtítulos personalizables</li>
            </ul>
            <button className="btn btn-secondary">Ver Tutoriales</button>
          </div>
          <div className="featured-showcase">
            <div className="showcase-item">
              <div className="showcase-preview premium"></div>
              <span className="showcase-label">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates