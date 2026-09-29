// Prueba directa del botón de instalación
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("¡El navegador autorizó la instalación de la PWA!");
});

// Esto se ejecuta apenas cargue la página
document.addEventListener('DOMContentLoaded', () => {
  const btnInstalar = document.getElementById('btnInstalar');
  
  if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
      // 1. Esto DEBE salir en la pantalla obligatoriamente al tocar el botón
      alert("¡El botón está respondiendo al toque!");

      // 2. Si el navegador guardó el prompt, lo lanza
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Resultado: ${outcome}`);
        deferredPrompt = null;
      } else {
        // 3. Si el navegador no lo guardó, te da la guía manual exacta
        alert("Para instalar la app, toca los tres puntitos arriba a la derecha de tu navegador y selecciona 'Instalar aplicación'.");
      }
    });
  }
});
