async function obtenerJugadoresEnVivo() {
  const tarjetas = document.querySelectorAll('.card[data-appid]');

  tarjetas.forEach(async (card) => {
    const appId = card.getAttribute('data-appid');
    const countElement = card.querySelector('.player-count');

    if (!appId) return;

    // URL oficial de la API de Steam para contar jugadores
    const steamUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;
    
    // Usamos un proxy para saltar la restricción CORS del navegador
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(steamUrl)}`;

    try {
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      // Parseamos la respuesta JSON que devuelve AllOrigins
      const steamData = JSON.parse(data.contents);

      if (steamData.response && steamData.response.result === 1) {
        const totalJugadores = steamData.response.player_count;
        // Formateamos el número con separador de miles (ej: 4,520)
        countElement.textContent = totalJugadores.toLocaleString() + ' jugando';
      } else {
        countElement.textContent = 'No disponible';
      }
    } catch (error) {
      console.error('Error al conectar con Steam:', error);
      countElement.textContent = 'Error al cargar';
    }
  });
}

// Cargar al iniciar la página
document.addEventListener('DOMContentLoaded', obtenerJugadoresEnVivo);