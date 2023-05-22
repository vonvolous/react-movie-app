import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Auth from './hoc/auth'
import 'antd/dist/reset.css';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer'
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage';

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthMovieDetailPage = Auth(MovieDetail, null);
  const AuthFavoritePage = Auth(FavoritePage, null);

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<AuthLandingPage />}></Route>
          <Route path="/login" element={<AuthLoginPage />}></Route>
          <Route path="/register" element={<AuthRegisterPage />}></Route>
          <Route path="/movie/">
            <Route path=":movieId" element={<AuthMovieDetailPage />}/>
          </Route>
          <Route path="/favorite" element={<AuthFavoritePage />}></Route>
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
