import { ThemeProvider } from "./components/ui/theme-provider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import MainComponent from "./components/app/MainComponent"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={
            <MainComponent>
              <Home />
            </MainComponent>
          }/>
          <Route 
            path="/host/vehicle"
            element=
            {
              <MainComponent>
                <Dashboard />
              </MainComponent>
            }
          />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
