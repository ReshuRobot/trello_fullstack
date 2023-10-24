import './App.css';
import Homepage from './components/pages/homepage/homepage';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Removed duplicate BrowserRouter
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import './css/custom-scrollbar.css'
import Board from './components/pages/Board';
function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#FAFAFA', // Set your cream shade color
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Register />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="boards" element={<Homepage />} />
              <Route path="boards/:boardId" element={<Board/>} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
