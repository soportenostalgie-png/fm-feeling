// // 1. Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('SW registrado:', reg.scope))
            .catch((err) => console.log('Error SW:', err));
    });
}

// // 2. Atrapar el evento para que Chrome muestre su cartel o botón flotante nativo
window.addEventListener('beforeinstallprompt', (e) => {
    // // Esto le permite a Chrome mostrar su banner/botón flotante automático de instalación
    console.log('Evento de instalación detectado por el navegador');
});


// ==========================================
// 3. SISTEMA DE SALUDOS EN VIVO (SUPABASE)
// ==========================================

const SUPABASE_URL = "https://wqkwjohykqdjrihnwlut.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4p84L_X_gJZ2Rac1qDWnnA_A-Z40xsR";

// Enviar el saludo a la base de datos
async function enviarSaludo(event) {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre-oyente').value;
  const ciudad = document.getElementById('ciudad-oyente').value;
  const mensaje = document.getElementById('mensaje-oyente').value;
  const estado = document.getElementById('estado-envio');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/saludos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ nombre, ciudad, mensaje })
    });

    if (res.ok) {
      estado.style.color = "#00ff66";
      estado.innerText = "¡Gracias! Tu saludo fue enviado con éxito.";
      document.getElementById('form-saludo').reset();
      cargarSaludosEnVivo();
      setTimeout(() => {
        document.getElementById('modal-saludos').style.display = 'none';
        estado.innerText = "";
      }, 2000);
    } else {
      throw new Error('Error al enviar');
    }
  } catch (e) {
    estado.style.color = "#ff3300";
    estado.innerText = "Hubo un error al enviar el saludo. Intentá de nuevo.";
  }
}

// Leer los saludos de Supabase y mostrarlos en la marquesina
async function cargarSaludosEnVivo() {
  const track = document.getElementById('saludos-track');
  if (!track) return;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/saludos?select=*&order=creado_at.desc&limit=10`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const saludos = await res.json();
    if (!saludos || saludos.length === 0) return;

    let htmlSaludos = '<span class="news-item"><span>MENSAJES DE OYENTES:</span>';
    saludos.forEach(s => {
      htmlSaludos += ` &nbsp;&nbsp;💬 <b>${s.nombre}</b> (${s.ciudad}) dice: "${s.mensaje}" &nbsp;&nbsp;&nbsp;&nbsp;•`;
    });
    htmlSaludos += '</span>';

    track.innerHTML = htmlSaludos;
  } catch (e) {
    console.error("Error cargando saludos", e);
  }
}

// Cargar al iniciar la página
window.addEventListener('load', () => {
  cargarSaludosEnVivo();
});
