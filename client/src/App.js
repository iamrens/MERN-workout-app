import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';


const theme = createTheme({
  palette: {
    primary: {
      main: '#212121'
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter( 
    createRoutesFromElements(
      <Route path="/" element={ <RootLayout /> }>
        <Route index element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" /> } />
        <Route path="signup" element={!user ? <Signup /> : <Navigate to="/" /> } />
        {/* <Route path="*" element={} /> */}
      </Route>
    )
  )

  return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </div>
  );
}

export default App;