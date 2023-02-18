import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useContext } from 'react'
import AuthContext from './store/authContext'

import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'
import Booklist from './components/Booklist'
import Favorites from './components/Favorites'
import BookDetails from './components/BookDetails'

const App = () => {

  const authCtx = useContext(AuthContext)

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/books" />}
        />
        <Route
          path="/book"
          element={authCtx.token ? <Booklist /> : <Navigate to="/auth" />}
        />
        <Route
          path="/favorites"
          element={authCtx.token ? <Favorites /> : <Navigate to="/auth" />}
        />
        <Route
          path="/books/:id"
          element={authCtx.token ? <BookDetails /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App
