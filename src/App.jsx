import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import MyRoutes from "./routers/routes"; 
import { Sidebar } from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import { Light, Dark } from "./styles/Themes";

export const ThemeContext = React.createContext(null);
export const AuthContext = React.createContext(null);

const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Condiciona la visibilidad del sidebar basado en la ruta actual
  const showSidebar = location.pathname !== "/login";

  return (
    <Container className={sidebarOpen && showSidebar ? "sidebarState active" : ""}>
      {showSidebar && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <MyRoutes />
    </Container>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <AuthContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<AppContent />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  
  &.active {
    grid-template-columns: 300px auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: ${({ theme, sidebarOpen }) => (sidebarOpen ? "300px auto" : "90px auto")};
  }

  color: ${({ theme }) => theme.text};
`;

export default App;