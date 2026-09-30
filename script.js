// Registro del Service Worker para habilitar la PWA en el dominio
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado correctamente:', reg.scope))
      .catch((err) => console.log('Error al registrar el Service Worker:', err));
  });
}
