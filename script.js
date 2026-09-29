// Script final de instalación para la PWA de FM Feeling
let deferredPrompt;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btnInstalar) {
    btnInstalar.style.display = 'block'; // Muestra el botón cuando el navegador autoriza
  }
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) {
      // Si por alguna razón el navegador ya consumió el evento, guiamos al usuario
      alert("Para instalar FM Feeling, toca los tres puntitos arriba a la derecha de tu navegador y selecciona 'Instalar aplicación'.");
      return;
    }
    
    // Lanza el cartel nativo de instalación de Android/Chrome
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('El usuario instaló la app exitosamente');
    }
    
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}
