// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registrado:', reg.scope))
      .catch((err) => console.log('Error SW:', err));
  });
}

// Botón de instalación interactivo
let deferredPrompt = null;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btnInstalar) btnInstalar.style.display = 'block';
});

if (btnInstalar) {
  // Aseguramos que el botón siempre esté visible
  btnInstalar.style.display = 'block';

  btnInstalar.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Si el navegador liberó el evento, lanza el cartel nativo
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('App instalada');
      }
      deferredPrompt = null;
    } else {
      // Si el navegador bloquea el llamado por código, muestra la guía exacta
      alert("📲 Para instalar FM Feeling como aplicación:\n\n1. Toca los tres puntitos ( ⋮ ) arriba a la derecha de tu navegador.\n2. Selecciona 'Instalar aplicación'.\n\n¡Y listo!");
    }
  });
}
