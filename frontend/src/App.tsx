import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPag from './pages/login.pag';
import Register from './pages/register.pag';
import Home from './pages/home';
import Profile from './pages/profile.pag';
import Update from './pages/update.pag';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<LoginPag />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<Update />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
