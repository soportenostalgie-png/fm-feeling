// Script limpio para el botón de instalación de FM Feeling
let deferredPrompt = null;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que aparezca el banner automático del navegador
  e.preventDefault();
  // Guarda el evento para usarlo con tu botón
  deferredPrompt = e;
  
  if (btnInstalar) {
    btnInstalar.style.display = 'block';
  }
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert("Para instalar FM Feeling, ve a los tres puntitos arriba a la derecha de tu navegador y selecciona 'Instalar aplicación'.");
      return;
    }

    // Muestra el prompt nativo de instalación
    deferredPrompt.prompt();
    
    // Espera la respuesta del usuario
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    
    // Resetea la variable y oculta el botón
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}
