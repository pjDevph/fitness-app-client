import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/workouts" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/workouts" />} />
          <Route path="/workouts" element={user ? <Workouts /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;