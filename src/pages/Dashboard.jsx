import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // NUEVO
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Music from './Music';
import Lists from './Lists';


import logo from '../assets/reproduct.png';

const getNavigation = () => {
  const rol = localStorage.getItem('rol'); // leer rol desde localStorage

  const base = [
    {
      segment: 'reproductor',
      title: 'Reproductor',
      icon: <LibraryMusicIcon />,
    },
    {
      segment: 'playlist',
      title: 'Playlist',
      icon: <QueueMusicIcon />,
    },
  ];

  if (rol === 'admin') {
    base.unshift({
      segment: 'admin',
      title: 'Administrador',
      icon: <AdminPanelSettingsIcon />,
    });
  }

  return base;
};


const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const renderPageContent = () => {
    switch (router.pathname) {
      case '/admin':
        return <Admin />;
      case '/reproductor':
        return <Music />;
      case '/playlist':
        return <Lists />;
      default:
        return <Typography>Ruta no encontrada</Typography>;
    }
  };


  const { window } = props;

  const router = useDemoRouter('/admin');

  // Estado de sesión datos quemados 
  const [session, setSession] = React.useState({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const navigate = useNavigate();

const authentication = React.useMemo(() => {
  return {
    signIn: () => {
      setSession({
        user: {
          name: 'prueba',
          email: 'bharatkashyap@outlook.com',
          image: 'https://avatars.githubusercontent.com/u/19550456',
        },
      });
    },
    signOut: () => {
      setSession(null);
      localStorage.removeItem('rol'); // opcional: limpiar rol
      navigate('/'); // redirigir a la página de inicio de sesión
    },
  };
}, []);




  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={getNavigation()}
        branding={{
          logo: <img src={logo} alt="rep logo" />,
          title: 'USAC Music Player',
          homeUrl: '/toolpad/core/introduction',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
            {renderPageContent()}
        </DashboardLayout>

      </AppProvider>
    </DemoProvider>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
