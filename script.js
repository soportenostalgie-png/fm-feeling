// Script corregido para la PWA de FM Feeling
let deferredPrompt = null;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que aparezca el banner automático del navegador
  e.preventDefault();
  // Guarda el evento para cuando el usuario toque tu botón
  deferredPrompt = e;
  
  // Muestra el botón de instalación
  if (btnInstalar) {
    btnInstalar.style.display = 'block';
  }
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) {
      // Si el navegador aún no liberó el evento, avisa al usuario
      alert("Para instalar FM Feeling, toca los tres puntitos arriba a la derecha de tu navegador y selecciona 'Instalar aplicación'.");
      return;
    }

    // Lanza el cartel nativo del sistema
    deferredPrompt.prompt();
    
    // Espera la decisión del usuario
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('El usuario aceptó la instalación');
    }
    
    // Limpia la variable y oculta el botón
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}
