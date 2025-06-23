import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function MediaControlCard({ titulo, artista, duracion, imagen, archivo }) {
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {titulo}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {artista} · {duracion}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={imagen}
        alt={`Imagen de ${titulo}`}
      />
      <audio ref={audioRef} src={archivo} onEnded={() => setIsPlaying(false)} />
    </Card>
  );
}
