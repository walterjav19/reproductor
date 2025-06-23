import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function MusicPlayerBar({ playlist = [], currentIndex = 0, onChangeTrack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const track = playlist[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      onChangeTrack(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onChangeTrack(currentIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body1">{track?.titulo || 'Sin título'}</Typography>

      <IconButton onClick={handlePrev}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton onClick={handleNext}>
        <SkipNextIcon />
      </IconButton>

      <Slider
        min={0}
        max={audioRef.current?.duration || 100}
        value={currentTime}
        onChange={handleSeek}
        onChangeCommitted={handleSeek}
        sx={{ width: 200 }}
      />

      <Typography variant="body2">
        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
      </Typography>

      <VolumeUp />
      <Slider
        value={volume}
        onChange={(e, v) => setVolume(v)}
        sx={{ width: 100 }}
      />

      <audio
        ref={audioRef}
        src={track?.archivo}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </Box>
  );
}
