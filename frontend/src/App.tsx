import {Route, Routes } from 'react-router-dom';
import './App.css';
import AppToolbar from './components/UI/AppToolbar.tsx';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import {Alert} from '@mui/material';

function App() {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Alert severity="error">Страница не найдена!</Alert>} />
      </Routes>
    </>
  )
}

export default App;
