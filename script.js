// 1. Registrar el Service Worker obligatoriamente para que Chrome active la PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito:', reg.scope))
      .catch((err) => console.log('Error al registrar el Service Worker:', err));
  });
}

// 2. Lógica del botón de instalación
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
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert("📲 Para instalar FM Feeling:\n\n1. Toca los tres puntitos ( ⋮ ) arriba a la derecha en tu navegador.\n2. Selecciona 'Instalar aplicación'.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('App instalada exitosamente');
    }
    
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}
