// 1. Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registrado:', reg.scope))
      .catch((err) => console.log('Error SW:', err));
  });
}

// 2. Atrapar el evento para que Chrome muestre su cartel o botón flotante nativo
window.addEventListener('beforeinstallprompt', (e) => {
  // Esto le permite a Chrome mostrar su banner/botón flotante automático de instalación
  console.log('Evento de instalación detectado por el navegador');
});
