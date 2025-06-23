import { useState, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Admin() {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioDuration, setAudioDuration] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const audioRef = useRef(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);

    // Crear URL temporal para calcular duración
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
      setAudioDuration(formatted);
      URL.revokeObjectURL(url);
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer lo que quieras con los datos
    console.log({
      titulo,
      artista,
      duracion: audioDuration,
      archivo: audioFile,
      imagen: imageFile,
    });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Subir nueva canción
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la canción"
          fullWidth
          margin="normal"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          label="Nombre del artista"
          fullWidth
          margin="normal"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Seleccionar archivo MP3
          <input type="file" accept="audio/mpeg" hidden onChange={handleAudioUpload} />
        </Button>

        {audioDuration && (
          <Typography sx={{ mt: 1 }}>Duración: {audioDuration}</Typography>
        )}

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Seleccionar imagen
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </Button>

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Previsualización:</Typography>
            <img
              src={imagePreview}
              alt="Previsualización"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Guardar canción
        </Button>
      </form>
    </Box>
  );
}
