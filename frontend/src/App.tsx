import { ThemeProvider } from "./components/ui/theme-provider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
// import Signup from './pages/Signup'
import Navbar from "./components/app/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {

  return (
    <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
