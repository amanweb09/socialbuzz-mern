import { useEffect, useState } from 'react'

import './App.css'
import './output.css'

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Signup from './pages/Signup';
import BottomTabs from './components/shared/BottomTabs';
import Navbar from './components/shared/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import { getProfile } from './api'
import { setIsAuth } from './Redux-store/authSlice'
import CreatePost from './pages/CreatePost'
import Account from './pages/Account'
import Profile from './pages/Profile'
import Loading from './components/shared/Loading'
import Notifications from './pages/Notifications'

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await getProfile()
          dispatch(setIsAuth({ isAuth: true, user: data }))

          setLoading(false)
        } catch (error) {
          console.log(error.response.data);
          setLoading(false)

        }

      }
    )()
  }, [])

  if (loading) return <Loading />

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        } />
        <Route exact path='/create-post' element={
          <AuthRoute>
            <CreatePost />
          </AuthRoute>
        } />
        <Route exact path='/account/:username' element={
          <AuthRoute>
            <Account />
          </AuthRoute>
        } />
        <Route exact path='/profile' element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        } />
        <Route exact path='/notifications' element={
          <AuthRoute>
            <Notifications />
          </AuthRoute>
        } />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
      <BottomTabs />
    </Router>
  );
}

const AuthRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isAuth) {
    return children
  }

  return <Navigate to='/login' state={{ from: location }} />
}

export default App;
