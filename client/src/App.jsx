import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Logout from './pages/Logout'
import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './components/layouts/AdminLayout'
import AdminUsers from './pages/AdminUsers'
import AdminContacts from './pages/AdminContacts'
import EditUser from './pages/EditUser';
import AdminServices from './pages/AdminServices'
import Noaccess from './pages/Noaccess'
import { useAuth } from './store/Auth';
function App() {
 const { isAdmin } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<Logout />}/>
          {/* Protected Routes */}
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/service"
            element={
              <PrivateRoute>
                <Service />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/no-access"
            element={
                <Noaccess />
            }
          />

        //nested Route :- For Admin Pages
        <Route path="/admin" element={<AdminLayout/>} >
         <Route path="users" element={<AdminUsers/>} />
         <Route path="users/:id/edit" element={<EditUser />} />
         <Route path="contacts" element={<AdminContacts/>} />
         <Route path="services" element={<AdminServices />} />
        </Route> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App



