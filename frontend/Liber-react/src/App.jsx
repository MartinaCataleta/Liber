import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import './App.css'

import { useAuth } from "./context/AuthContext";
import RefreshPage from './pages/RefreshPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BookPage } from './pages/BookPage';
import BibliotecaPage from './pages/BibliotecaPage';
import ProfiloPage from './pages/ProfiloPage';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <p className="loading">Caricamento...</p>;
  return user ? children : <Navigate to="/LoginPage" />;
}

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<RefreshPage/>}/>
        <Route path= "/LoginPage" element={<LoginPage/>}/>
        <Route path="/HomePage" element={
                    <ProtectedRoute><HomePage /></ProtectedRoute>
        } />
        <Route path="/BookPage" element={
                    <ProtectedRoute><BookPage /></ProtectedRoute>} 
        />
        <Route path="/BibliotecaPage" element={
                    <ProtectedRoute><BibliotecaPage /></ProtectedRoute>} 
        />
        <Route path="/ProfiloPage" element={
                    <ProtectedRoute><ProfiloPage/></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  
     <footer className='footer'>
                <p>Corso di Fondamenti Web 25/26 Martina Cataleta, Francesca Teresa Rosa Augello, Giuseppe Galetta</p>
      </footer> 
    </>
  )
}



export default App
