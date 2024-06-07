import { ThemeProvider } from "./components/ui/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./components/app/MainComponent";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            element={
              <MainComponent>
                <Home />
              </MainComponent>
            }
          />
          <Route path="/become-host/vehicle" element={<Dashboard />} />
          <Route
            path="/profile/:id"
            element={
              <MainComponent>
                <Profile />
              </MainComponent>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
