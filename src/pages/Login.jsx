import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // ✅ importar esto

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate(); // ✅ hook de redirección

  const handleLogin = (e) => {
    e.preventDefault();
    // aqui ademas setear el rol seteamos la informacion del usuario foto,nombre,correo,etc
    if (email === 'admin@gmail.com' && password === 'admin') {
    localStorage.setItem('rol', 'admin');
    } else {
    localStorage.setItem('rol', 'user');
    }
    navigate('/reproductor');

  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
          maxWidth: 400,
          width: '100%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
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
            Ingresar
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" underline="hover">
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
