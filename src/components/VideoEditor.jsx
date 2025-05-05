import React, { useState, useRef, useEffect } from 'react'
import '../styles/video-editor.css'

const VideoEditor = ({ videoSrc, onSave }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100) // Porcentaje
  const [selectedFilter, setSelectedFilter] = useState('none')
  const [selectedText, setSelectedText] = useState(null)
  const [texts, setTexts] = useState([])
  
  // Filtros disponibles
  const filters = [
    { id: 'none', name: 'Normal', value: 'none' },
    { id: 'grayscale', name: 'Blanco y Negro', value: 'grayscale(100%)' },
    { id: 'sepia', name: 'Sepia', value: 'sepia(70%)' },
    { id: 'contrast', name: 'Alto Contraste', value: 'contrast(150%)' },
    { id: 'brightness', name: 'Brillante', value: 'brightness(130%)' },
    { id: 'blur', name: 'Desenfoque', value: 'blur(2px)' },
    { id: 'saturate', name: 'Saturado', value: 'saturate(200%)' },
    { id: 'gaming', name: 'Gaming', value: 'saturate(150%) contrast(110%) brightness(110%)' },
  ]

  // Efectos de texto disponibles
  const textEffects = [
    { id: 'normal', name: 'Normal' },
    { id: 'neon', name: 'Neón' },
    { id: 'retro', name: 'Retro' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'minimal', name: 'Minimalista' },
  ]

  // Inicializar el video
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const video = videoRef.current
      
      video.onloadedmetadata = () => {
        setDuration(video.duration)
        setTrimEnd(video.duration)
      }
      
      video.ontimeupdate = () => {
        setCurrentTime(video.currentTime)
      }
    }
  }, [videoSrc])

  // Controlar reproducción
  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [playing])

  // Controlar volumen
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  // Formatear tiempo en minutos:segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Manejar cambio en la barra de progreso
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Manejar cambio en los puntos de recorte
  const handleTrimChange = (start, end) => {
    setTrimStart(start)
    setTrimEnd(end)
  }

  // Añadir texto al video
  const addText = () => {
    const newText = {
      id: Date.now(),
      text: 'Texto nuevo',
      x: 50, // Posición en porcentaje
      y: 50,
      fontSize: 24,
      color: '#ffffff',
      effect: 'normal',
      time: {
        start: currentTime,
        duration: 3 // Duración en segundos
      }
    }
    
    setTexts([...texts, newText])
    setSelectedText(newText.id)
  }

  // Actualizar texto seleccionado
  const updateSelectedText = (property, value) => {
    if (!selectedText) return
    
    setTexts(texts.map(text => {
      if (text.id === selectedText) {
        return { ...text, [property]: value }
      }
      return text
    }))
  }

  // Eliminar texto seleccionado
  const deleteSelectedText = () => {
    if (!selectedText) return
    
    setTexts(texts.filter(text => text.id !== selectedText))
    setSelectedText(null)
  }

  // Guardar cambios
  const handleSave = () => {
    // En una implementación real, aquí se procesaría el video con los cambios
    // Para este ejemplo, solo pasamos los datos de edición al componente padre
    onSave({
      trimStart,
      trimEnd,
      filter: selectedFilter,
      texts,
      // Otros datos de edición
    })
  }

  return (
    <div className="video-editor">
      <div className="editor-main">
        <div className="video-preview-container">
          {/* Vista previa del video con filtros aplicados */}
          <div className="video-container" style={{ filter: filters.find(f => f.id === selectedFilter)?.value || 'none' }}>
            <video 
              ref={videoRef} 
              src={videoSrc} 
              className="video-preview"
              onClick={() => setPlaying(!playing)}
            ></video>
            
            {/* Capa para textos */}
            <div className="text-overlay">
              {texts.map(text => (
                <div 
                  key={text.id}
                  className={`video-text ${text.effect} ${selectedText === text.id ? 'selected' : ''}`}
                  style={{
                    left: `${text.x}%`,
                    top: `${text.y}%`,
                    fontSize: `${text.fontSize}px`,
                    color: text.color,
                    display: (currentTime >= text.time.start && 
                             currentTime <= text.time.start + text.time.duration) ? 'block' : 'none'
                  }}
                  onClick={() => setSelectedText(text.id)}
                >
                  {text.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Controles de reproducción */}
        <div className="playback-controls">
          <button 
            className="control-btn"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? '⏸️' : '▶️'}
          </button>
          
          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={(currentTime / duration) * 100 || 0} 
              onChange={handleProgressChange}
              className="progress-bar"
            />
            <span className="time-display">{formatTime(duration)}</span>
          </div>
          
          <div className="volume-control">
            <span className="volume-icon">{volume > 0 ? '🔊' : '🔇'}</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
          </div>
        </div>
      </div>
      
      <div className="editor-tools">
        <div className="tool-section">
          <h3 className="tool-title">Recortar</h3>
          <div className="trim-control">
            <div className="trim-slider">
              <div 
                className="trim-handle start" 
                style={{ left: `${(trimStart / duration) * 100}%` }}
              ></div>
              <div 
                className="trim-range" 
                style={{ 
                  left: `${(trimStart / duration) * 100}%`, 
                  width: `${((trimEnd - trimStart) / duration) * 100}%` 
                }}
              ></div>
              <div 
                className="trim-handle end" 
                style={{ left: `${(trimEnd / duration) * 100}%` }}
              ></div>
            </div>
            <div className="trim-times">
              <span>{formatTime(trimStart)}</span>
              <span>{formatTime(trimEnd)}</span>
            </div>
          </div>
        </div>
        
        <div className="tool-section">
          <h3 className="tool-title">Filtros</h3>
          <div className="filters-grid">
            {filters.map(filter => (
              <div 
                key={filter.id}
                className={`filter-item ${selectedFilter === filter.id ? 'selected' : ''}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <div className="filter-preview" style={{ filter: filter.value }}></div>
                <span className="filter-name">{filter.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="tool-section">
          <h3 className="tool-title">Texto</h3>
          <button className="btn btn-secondary" onClick={addText}>Añadir Texto</button>
          
          {selectedText && (
            <div className="text-editor">
              <div className="form-group">
                <label>Texto:</label>
                <input 
                  type="text" 
                  value={texts.find(t => t.id === selectedText)?.text || ''}
                  onChange={(e) => updateSelectedText('text', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Color:</label>
                <input 
                  type="color" 
                  value={texts.find(t => t.id === selectedText)?.color || '#ffffff'}
                  onChange={(e) => updateSelectedText('color', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Tamaño:</label>
                <input 
                  type="range" 
                  min="12" 
                  max="72" 
                  value={texts.find(t => t.id === selectedText)?.fontSize || 24}
                  onChange={(e) => updateSelectedText('fontSize', parseInt(e.target.value))}
                />
              </div>
              
              <div className="form-group">
                <label>Efecto:</label>
                <select 
                  value={texts.find(t => t.id === selectedText)?.effect || 'normal'}
                  onChange={(e) => updateSelectedText('effect', e.target.value)}
                >
                  {textEffects.map(effect => (
                    <option key={effect.id} value={effect.id}>{effect.name}</option>
                  ))}
                </select>
              </div>
              
              <button className="btn btn-danger" onClick={deleteSelectedText}>Eliminar</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="editor-actions">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary glow-effect" onClick={handleSave}>Guardar Cambios</button>
      </div>
    </div>
  )
}

export default VideoEditor