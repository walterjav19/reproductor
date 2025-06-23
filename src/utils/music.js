export async function getMusica() {
  const res = await fetch('/data/music.json');
  if (!res.ok) throw new Error('No se pudo cargar mus.json');
  return await res.json();
}
