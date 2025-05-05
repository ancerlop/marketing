import React, { useState } from 'react'
import '../styles/video-upload.css'
import VideoEditor from '../components/VideoEditor'
import SocialMediaAccounts from '../components/SocialMediaAccounts'
import SchedulePublisher from '../components/SchedulePublisher'

const VideoUpload = () => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platforms: {
      youtube: true,
      instagram: true,
      tiktok: true
    },
    scheduledDate: '',
    scheduledTime: ''
  })

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Manejar cambios en las plataformas seleccionadas
  const handlePlatformChange = (platform) => {
    setFormData({
      ...formData,
      platforms: {
        ...formData.platforms,
        [platform]: !formData.platforms[platform]
      }
    })
  }

  // Manejar arrastrar y soltar
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Manejar soltar archivo
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Procesar archivo seleccionado
  const handleFile = (file) => {
    setSelectedFile(file)
    
    // Crear URL para previsualización
    if (file.type.includes('video')) {
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  // Estados para controlar los diferentes pasos del proceso
  const [showEditor, setShowEditor] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [editedVideoData, setEditedVideoData] = useState(null)
  const [schedulingResults, setSchedulingResults] = useState(null)

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!showEditor && !showScheduler && selectedFile) {
      // Si hay un archivo seleccionado y no estamos en modo edición, mostrar el editor
      setShowEditor(true)
    } else if (!showScheduler && selectedFile) {
      // Si ya pasamos por el editor, mostrar el programador
      setShowEditor(false)
      setShowScheduler(true)
    } else {
      // Este caso no debería ocurrir normalmente, pero por si acaso
      console.log('Formulario enviado:', { 
        ...formData, 
        file: selectedFile,
        editedData: editedVideoData,
        schedulingResults: schedulingResults
      })
      
      // Resetear el estado
      resetForm()
    }
  }
  
  // Resetear el formulario
  const resetForm = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setFormData({
      title: '',
      description: '',
      platforms: {
        youtube: true,
        instagram: true,
        tiktok: true
      },
      scheduledDate: '',
      scheduledTime: ''
    })
    setShowEditor(false)
    setShowScheduler(false)
    setEditedVideoData(null)
    setSchedulingResults(null)
  }

  // Manejar los cambios guardados desde el editor
  const handleEditorSave = (editData) => {
    setEditedVideoData(editData)
    setShowEditor(false)
  }
  
  // Manejar la finalización de la programación
  const handleScheduleComplete = (results) => {
    if (results) {
      setSchedulingResults(results)
      setShowScheduler(false)
      
      // Mostrar mensaje de éxito
      if (results.success && results.success.length > 0) {
        alert(`¡${results.success.length} publicaciones programadas con éxito!`)
      }
    } else {
      // El usuario canceló
      setShowScheduler(false)
    }
  }

  return (
    <div className="upload-container">
      <h1 className="page-title">Subir Video</h1>
      
      {showEditor && previewUrl ? (
        <div className="editor-wrapper card">
          <h2 className="section-title">Editar Video</h2>
          <VideoEditor 
            videoSrc={previewUrl} 
            onSave={handleEditorSave} 
          />
        </div>
      ) : showScheduler && selectedFile ? (
        <div className="scheduler-wrapper">
          <SchedulePublisher 
            videoData={{
              file: selectedFile,
              title: formData.title,
              description: formData.description,
              editedData: editedVideoData
            }}
            onScheduleComplete={handleScheduleComplete}
          />
        </div>
      ) : (
        <div className="upload-content">
        <div className="upload-area-container card">
          <form onSubmit={handleSubmit} className="upload-form">
            {/* Área de arrastrar y soltar */}
            <div 
              className={`drop-area ${dragActive ? 'active' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <>
                  <div className="drop-icon">🎬</div>
                  <p>Arrastra y suelta tu video aquí</p>
                  <span>o</span>
                  <label className="file-input-label">
                    Seleccionar archivo
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleFileChange} 
                      className="file-input"
                    />
                  </label>
                  <p className="file-hint">MP4, MOV o WebM (máx. 100MB)</p>
                </>
              ) : (
                <div className="preview-container">
                  {previewUrl && (
                    <video 
                      src={previewUrl} 
                      controls 
                      className="video-preview"
                    ></video>
                  )}
                  <div className="file-info">
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file"
                    onClick={() => {
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {/* Detalles del video */}
            <div className="form-section">
              <h2 className="section-title">Detalles del Video</h2>
              
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Nuevo Trailer de Nuestro Juego"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe brevemente tu video..."
                  rows="3"
                ></textarea>
              </div>
            </div>

            {/* Plataformas */}
            <div className="form-section">
              <h2 className="section-title">Plataformas</h2>
              
              <div className="platforms-grid">
                <div 
                  className={`platform-card ${formData.platforms.youtube ? 'selected' : ''}`}
                  onClick={() => handlePlatformChange('youtube')}
                >
                  <div className="platform-icon youtube">▶️</div>
                  <span className="platform-name">YouTube</span>
                </div>
                
                <div 
                  className={`platform-card ${formData.platforms.instagram ? 'selected' : ''}`}
                  onClick={() => handlePlatformChange('instagram')}
                >
                  <div className="platform-icon instagram">📸</div>
                  <span className="platform-name">Instagram</span>
                </div>
                
                <div 
                  className={`platform-card ${formData.platforms.tiktok ? 'selected' : ''}`}
                  onClick={() => handlePlatformChange('tiktok')}
                >
                  <div className="platform-icon tiktok">🎵</div>
                  <span className="platform-name">TikTok</span>
                </div>
              </div>
            </div>

            {/* Programación */}
            <div className="form-section">
              <h2 className="section-title">Programación</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="scheduledDate">Fecha</label>
                  <input 
                    type="date" 
                    id="scheduledDate" 
                    name="scheduledDate" 
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="scheduledTime">Hora</label>
                  <input 
                    type="time" 
                    id="scheduledTime" 
                    name="scheduledTime" 
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary">Guardar Borrador</button>
              <button type="submit" className="btn btn-primary glow-effect">Programar Publicación</button>
            </div>
          </form>
        </div>
        
        {/* Panel lateral con consejos */}
        <div className="upload-sidebar">
          <div className="tips-card card">
            <h3 className="card-title">Consejos para Shorts</h3>
            <ul className="tips-list">
              <li>Mantén tus videos entre 15-60 segundos para mayor engagement</li>
              <li>Usa música de tendencia para aumentar el alcance</li>
              <li>Comienza con una introducción impactante en los primeros 3 segundos</li>
              <li>Incluye llamadas a la acción claras</li>
              <li>Programa tus publicaciones en horarios de alta actividad</li>
            </ul>
          </div>
          
          <div className="performance-card card">
            <h3 className="card-title">Rendimiento Reciente</h3>
            <div className="performance-stat">
              <span className="stat-label">Mejor hora para publicar:</span>
              <span className="stat-value">18:00 - 20:00</span>
            </div>
            <div className="performance-stat">
              <span className="stat-label">Plataforma más efectiva:</span>
              <span className="stat-value">TikTok</span>
            </div>
            <div className="performance-stat">
              <span className="stat-label">Duración óptima:</span>
              <span className="stat-value">45 segundos</span>
            </div>
          </div>
        </div>
      </div>
      )}
      
      {/* Indicador de video editado */}
      {editedVideoData && !showEditor && !showScheduler && (
        <div className="edit-indicator card">
          <div className="edit-icon">✓</div>
          <div className="edit-info">
            <h3>Video Editado</h3>
            <p>Tu video ha sido editado con éxito. Puedes continuar con la publicación o volver a editarlo.</p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowEditor(true)}
          >
            Volver a Editar
          </button>
        </div>
      )}
      
      {/* Indicador de publicación programada */}
      {schedulingResults && !showScheduler && (
        <div className="schedule-success card">
          <div className="success-icon">🚀</div>
          <div className="success-info">
            <h3>¡Publicación Programada!</h3>
            <p>Tu video ha sido programado para publicación en {schedulingResults.success.length} plataformas.</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={resetForm}
          >
            Subir Otro Video
          </button>
        </div>
      )}
      
      {/* Componente de cuentas de redes sociales */}
      {!showEditor && !showScheduler && (
        <SocialMediaAccounts />
      )}
    </div>
  )
}

export default VideoUpload