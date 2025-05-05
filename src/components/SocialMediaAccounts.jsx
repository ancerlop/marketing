import React, { useState, useEffect } from 'react'
import '../styles/social-media-accounts.css'
import SocialMediaService from '../services/SocialMediaService'

const SocialMediaAccounts = () => {
  // Estado para almacenar el estado de conexión de cada plataforma
  const [connections, setConnections] = useState({
    youtube: { connected: false, loading: true },
    instagram: { connected: false, loading: true },
    tiktok: { connected: false, loading: true }
  })

  // Verificar estado de conexión al cargar el componente
  useEffect(() => {
    const checkConnections = async () => {
      const updatedConnections = { ...connections }
      
      for (const platform of Object.keys(connections)) {
        try {
          const isConnected = await SocialMediaService.checkAuth(platform)
          updatedConnections[platform] = { connected: isConnected, loading: false }
        } catch (error) {
          console.error(`Error verificando conexión con ${platform}:`, error)
          updatedConnections[platform] = { connected: false, loading: false, error: true }
        }
      }
      
      setConnections(updatedConnections)
    }
    
    checkConnections()
  }, [])

  // Conectar una cuenta de red social
  const handleConnect = async (platform) => {
    try {
      // Actualizar estado a cargando
      setConnections(prev => ({
        ...prev,
        [platform]: { ...prev[platform], loading: true }
      }))
      
      // Iniciar proceso de autenticación
      await SocialMediaService.authenticate(platform)
      
      // Actualizar estado a conectado
      setConnections(prev => ({
        ...prev,
        [platform]: { connected: true, loading: false }
      }))
    } catch (error) {
      console.error(`Error conectando con ${platform}:`, error)
      
      // Actualizar estado con error
      setConnections(prev => ({
        ...prev,
        [platform]: { connected: false, loading: false, error: true }
      }))
    }
  }

  // Desconectar una cuenta
  const handleDisconnect = async (platform) => {
    try {
      // Actualizar estado a cargando
      setConnections(prev => ({
        ...prev,
        [platform]: { ...prev[platform], loading: true }
      }))
      
      // Desconectar cuenta
      await SocialMediaService.disconnect(platform)
      
      // Actualizar estado a desconectado
      setConnections(prev => ({
        ...prev,
        [platform]: { connected: false, loading: false }
      }))
    } catch (error) {
      console.error(`Error desconectando ${platform}:`, error)
      
      // Mantener estado anterior pero con error
      setConnections(prev => ({
        ...prev,
        [platform]: { ...prev[platform], loading: false, error: true }
      }))
    }
  }

  // Información de las plataformas
  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶️',
      color: '#ff0000',
      description: 'Publica videos en tu canal de YouTube automáticamente.'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      color: '#e1306c',
      description: 'Comparte Reels y videos cortos en tu cuenta de Instagram.'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      color: '#69c9d0',
      description: 'Publica videos virales en tu cuenta de TikTok.'
    }
  ]

  return (
    <div className="social-accounts-container card">
      <h2 className="section-title">Cuentas Conectadas</h2>
      <p className="section-description">
        Conecta tus cuentas de redes sociales para publicar automáticamente tus videos.
      </p>
      
      <div className="accounts-grid">
        {platforms.map(platform => {
          const connectionState = connections[platform.id]
          
          return (
            <div className="account-card" key={platform.id}>
              <div className="account-header" style={{ backgroundColor: platform.color }}>
                <div className="platform-icon">{platform.icon}</div>
                <h3 className="platform-name">{platform.name}</h3>
              </div>
              
              <div className="account-body">
                <p className="platform-description">{platform.description}</p>
                
                <div className="connection-status">
                  {connectionState.loading ? (
                    <span className="status-loading">Cargando...</span>
                  ) : connectionState.connected ? (
                    <span className="status-connected">
                      <span className="status-icon">✓</span> Conectado
                    </span>
                  ) : (
                    <span className="status-disconnected">
                      <span className="status-icon">✕</span> No conectado
                    </span>
                  )}
                </div>
                
                {connectionState.error && (
                  <p className="connection-error">
                    Ocurrió un error. Por favor, intenta de nuevo.
                  </p>
                )}
              </div>
              
              <div className="account-footer">
                {connectionState.connected ? (
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => handleDisconnect(platform.id)}
                    disabled={connectionState.loading}
                  >
                    Desconectar
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleConnect(platform.id)}
                    disabled={connectionState.loading}
                  >
                    Conectar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="accounts-info">
        <div className="info-icon">ℹ️</div>
        <p className="info-text">
          Al conectar tus cuentas, otorgas permisos para publicar contenido en tu nombre. 
          Puedes desconectar tus cuentas en cualquier momento.
        </p>
      </div>
    </div>
  )
}

export default SocialMediaAccounts