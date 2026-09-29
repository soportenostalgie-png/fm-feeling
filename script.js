// 1. Registro obligatorio del Service Worker para que la PWA funcione
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registrado con éxito:', reg.scope))
      .catch((err) => console.log('Error al registrar el Service Worker:', err));
  });
}

// 2. Control inteligente del botón rojo de instalación
let deferredPrompt = null;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btnInstalar) {
    btnInstalar.style.display = 'block';
  }
});

if (btnInstalar) {
  // Muestra el botón para que siempre esté disponible
  btnInstalar.style.display = 'block';

  btnInstalar.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Si el navegador libera el evento, lanza el cartel nativo
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('App instalada exitosamente');
      }
      deferredPrompt = null;
    } else {
      // Si el navegador bloquea el llamado por código, muestra la guía clara
      alert("📲 Para instalar FM Feeling en tu celular:\n\n1. Toca los tres puntitos ( ⋮ ) arriba a la derecha en tu navegador.\n2. Selecciona 'Instalar aplicación' o 'Agregar a la pantalla principal'.\n\n¡Y listo!");
    }
  });
}
