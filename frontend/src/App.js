import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from './components/Navbar'

import Home from './pages/Home'
import Profil from './pages/Profil';
import ErrorPage from './pages/ErrorPage';
import Create from './pages/Create';
import OnePost from './pages/OnePost';
import EditPage from './pages/EditPage';

import './scss/custom.scss';

function App() {  

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/post' element={<OnePost />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit' element={<EditPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Router>
)}

export default App;
