import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Avatar,
  Link,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const [nombre, setNombre] = React.useState('');
  const [apellidos, setApellidos] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registro:', { nombre, apellidos, email, password, image });
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Crear cuenta
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <label htmlFor="image-upload">
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Avatar
              src={imagePreview}
              sx={{
                width: 100,
                height: 100,
                cursor: 'pointer',
                border: '2px solid #1976d2',
              }}
            />
          </label>
        </Box>

        <form onSubmit={handleRegister}>
          <TextField
            label="Nombre"
            fullWidth
            required
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Apellidos"
            fullWidth
            required
            margin="normal"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/" underline="hover">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
