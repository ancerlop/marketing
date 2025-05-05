import React, { useState, useEffect } from 'react'
import '../styles/schedule-publisher.css'
import SocialMediaService from '../services/SocialMediaService'

const SchedulePublisher = ({ videoData, onScheduleComplete }) => {
  // Estado para las fechas y horas programadas por plataforma
  const [schedules, setSchedules] = useState({
    youtube: { enabled: true, date: '', time: '' },
    instagram: { enabled: true, date: '', time: '' },
    tiktok: { enabled: true, date: '', time: '' }
  })
  
  // Estado para el modo de programación (mismo horario para todas o personalizado)
  const [scheduleMode, setScheduleMode] = useState('same')
  
  // Estado para la fecha y hora común (cuando scheduleMode es 'same')
  const [commonSchedule, setCommonSchedule] = useState({ date: '', time: '' })
  
  // Estado para el proceso de programación
  const [scheduling, setScheduling] = useState(false)
  const [schedulingResults, setSchedulingResults] = useState(null)
  
  // Verificar conexiones de redes sociales al cargar
  const [connections, setConnections] = useState({
    youtube: false,
    instagram: false,
    tiktok: false
  })
  
  // Cargar estado de conexiones
  useEffect(() => {
    const checkConnections = async () => {
      const updatedConnections = { ...connections }
      
      for (const platform of Object.keys(connections)) {
        try {
          updatedConnections[platform] = await SocialMediaService.checkAuth(platform)
        } catch (error) {
          console.error(`Error verificando conexión con ${platform}:`, error)
        }
      }
      
      setConnections(updatedConnections)
    }
    
    checkConnections()
  }, [])
  
  // Actualizar programaciones individuales cuando cambia la programación común
  useEffect(() => {
    if (scheduleMode === 'same') {
      const updatedSchedules = { ...schedules }
      
      for (const platform of Object.keys(updatedSchedules)) {
        updatedSchedules[platform] = { 
          ...updatedSchedules[platform],
          date: commonSchedule.date,
          time: commonSchedule.time
        }
      }
      
      setSchedules(updatedSchedules)
    }
  }, [commonSchedule, scheduleMode])
  
  // Manejar cambios en la programación común
  const handleCommonScheduleChange = (e) => {
    const { name, value } = e.target
    setCommonSchedule(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Manejar cambios en programaciones individuales
  const handleScheduleChange = (platform, field, value) => {
    setSchedules(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }))
  }
  
  // Manejar cambio en el modo de programación
  const handleModeChange = (mode) => {
    setScheduleMode(mode)
  }
  
  // Programar publicaciones
  const handleSchedule = async () => {
    setScheduling(true)
    setSchedulingResults(null)
    
    const results = {
      success: [],
      failed: []
    }
    
    // Iterar sobre cada plataforma habilitada
    for (const platform of Object.keys(schedules)) {
      const schedule = schedules[platform]
      
      // Saltar plataformas deshabilitadas
      if (!schedule.enabled) continue
      
      // Saltar plataformas sin conexión
      if (!connections[platform]) {
        results.failed.push({
          platform,
          error: 'No conectado a esta plataforma'
        })
        continue
      }
      
      // Verificar que se haya seleccionado fecha y hora
      if (!schedule.date || !schedule.time) {
        results.failed.push({
          platform,
          error: 'Fecha u hora no especificada'
        })
        continue
      }
      
      try {
        // Crear objeto de fecha a partir de los campos
        const scheduledDate = new Date(`${schedule.date}T${schedule.time}:00`)
        
        // Programar publicación (en una implementación real, esto enviaría el video)
        const result = await SocialMediaService.scheduleVideo(
          platform,
          videoData.file,
          {
            title: videoData.title,
            description: videoData.description,
            // Otros metadatos relevantes
          },
          scheduledDate
        )
        
        results.success.push({
          platform,
          scheduledFor: scheduledDate.toLocaleString(),
          ...result
        })
      } catch (error) {
        console.error(`Error programando publicación en ${platform}:`, error)
        results.failed.push({
          platform,
          error: error.message || 'Error desconocido'
        })
      }
    }
    
    setScheduling(false)
    setSchedulingResults(results)
    
    // Si hay al menos un éxito, notificar al componente padre
    if (results.success.length > 0) {
      onScheduleComplete(results)
    }
  }
  
  // Obtener nombre legible de la plataforma
  const getPlatformName = (platformId) => {
    const names = {
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok'
    }
    return names[platformId] || platformId
  }
  
  // Obtener icono de la plataforma
  const getPlatformIcon = (platformId) => {
    const icons = {
      youtube: '▶️',
      instagram: '📸',
      tiktok: '🎵'
    }
    return icons[platformId] || '📱'
  }
  
  return (
    <div className="schedule-publisher">
      <h2 className="section-title">Programar Publicación</h2>
      
      {/* Selector de modo de programación */}
      <div className="schedule-mode-selector">
        <div className="mode-option">
          <input 
            type="radio" 
            id="mode-same" 
            name="scheduleMode" 
            value="same"
            checked={scheduleMode === 'same'}
            onChange={() => handleModeChange('same')}
          />
          <label htmlFor="mode-same">Mismo horario para todas las plataformas</label>
        </div>
        
        <div className="mode-option">
          <input 
            type="radio" 
            id="mode-custom" 
            name="scheduleMode" 
            value="custom"
            checked={scheduleMode === 'custom'}
            onChange={() => handleModeChange('custom')}
          />
          <label htmlFor="mode-custom">Personalizar horario por plataforma</label>
        </div>
      </div>
      
      {/* Programación común para todas las plataformas */}
      {scheduleMode === 'same' && (
        <div className="common-schedule">
          <div className="schedule-inputs">
            <div className="form-group">
              <label htmlFor="common-date">Fecha</label>
              <input 
                type="date" 
                id="common-date" 
                name="date"
                value={commonSchedule.date}
                onChange={handleCommonScheduleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="common-time">Hora</label>
              <input 
                type="time" 
                id="common-time" 
                name="time"
                value={commonSchedule.time}
                onChange={handleCommonScheduleChange}
                required
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de plataformas para programar */}
      <div className="platforms-schedule-list">
        {Object.keys(schedules).map(platform => (
          <div 
            key={platform} 
            className={`platform-schedule-item ${!connections[platform] ? 'disabled' : ''}`}
          >
            <div className="platform-info">
              <div className="platform-toggle">
                <input 
                  type="checkbox" 
                  id={`toggle-${platform}`}
                  checked={schedules[platform].enabled && connections[platform]}
                  onChange={() => handleScheduleChange(
                    platform, 
                    'enabled', 
                    !schedules[platform].enabled
                  )}
                  disabled={!connections[platform]}
                />
                <label htmlFor={`toggle-${platform}`} className="toggle-label"></label>
              </div>
              
              <div className="platform-icon" data-platform={platform}>
                {getPlatformIcon(platform)}
              </div>
              
              <div className="platform-name">
                {getPlatformName(platform)}
                {!connections[platform] && (
                  <span className="connection-warning">No conectado</span>
                )}
              </div>
            </div>
            
            {scheduleMode === 'custom' && schedules[platform].enabled && connections[platform] && (
              <div className="platform-schedule-inputs">
                <div className="form-group">
                  <label htmlFor={`${platform}-date`}>Fecha</label>
                  <input 
                    type="date" 
                    id={`${platform}-date`} 
                    value={schedules[platform].date}
                    onChange={(e) => handleScheduleChange(platform, 'date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`${platform}-time`}>Hora</label>
                  <input 
                    type="time" 
                    id={`${platform}-time`} 
                    value={schedules[platform].time}
                    onChange={(e) => handleScheduleChange(platform, 'time', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Resultados de la programación */}
      {schedulingResults && (
        <div className="scheduling-results">
          <h3>Resultados de la Programación</h3>
          
          {schedulingResults.success.length > 0 && (
            <div className="success-results">
              <h4>Publicaciones Programadas</h4>
              <ul className="results-list">
                {schedulingResults.success.map((result, index) => (
                  <li key={index} className="result-item success">
                    <div className="result-platform">
                      <span className="platform-icon">{getPlatformIcon(result.platform)}</span>
                      <span className="platform-name">{getPlatformName(result.platform)}</span>
                    </div>
                    <div className="result-details">
                      Programado para: {result.scheduledFor}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {schedulingResults.failed.length > 0 && (
            <div className="failed-results">
              <h4>Errores</h4>
              <ul className="results-list">
                {schedulingResults.failed.map((result, index) => (
                  <li key={index} className="result-item error">
                    <div className="result-platform">
                      <span className="platform-icon">{getPlatformIcon(result.platform)}</span>
                      <span className="platform-name">{getPlatformName(result.platform)}</span>
                    </div>
                    <div className="result-details error-message">
                      {result.error}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Botón de programación */}
      <div className="schedule-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => onScheduleComplete(null)}
        >
          Cancelar
        </button>
        
        <button 
          className="btn btn-primary glow-effect"
          onClick={handleSchedule}
          disabled={scheduling}
        >
          {scheduling ? 'Programando...' : 'Programar Publicaciones'}
        </button>
      </div>
    </div>
  )
}

export default SchedulePublisher