// Lista de canciones (Reemplazá estas URLs de ejemplo por las URLs públicas reales de tus MP3 en Supabase)
const playlist = [
    { title: "Clásico 1 - Artista 80s", url: "https://wqkwjohyqkdjrihnwlut.supabase.co/storage/v1/object/public/Musica/01.%20Hotel%20California.mp3" },
    { title: "Clásico 2 - Artista 90s", url: "TU_URL_DE_SUPABASE_2.mp3" },
    { title: "Clásico 3 - Éxito Internacional", url: "TU_URL_DE_SUPABASE_3.mp3" }
];

let currentTrackIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const volumeSlider = document.getElementById('volume-slider');
const trackTitle = document.getElementById('track-title');

function loadTrack(index) {
    if (playlist.length === 0) return;
    audioPlayer.src = playlist[index].url;
    trackTitle.textContent = playlist[index].title;
    audioPlayer.load();
}

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        if (!audioPlayer.src) {
            loadTrack(currentTrackIndex);
        }
        audioPlayer.play();
        playBtn.textContent = "⏸ Pausar";
    } else {
        audioPlayer.pause();
        playBtn.textContent = "▶ Reproducir";
    }
});

// MAGIA AUTOMÁTICA: Cuando termina un tema, salta al siguiente de la lista en bucle infinito
audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Vuelve al inicio si llega al final
    loadTrack(currentTrackIndex);
    audioPlayer.play();
});

// Carga inicial al abrir la página
loadTrack(currentTrackIndex);
volumeSlider.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});