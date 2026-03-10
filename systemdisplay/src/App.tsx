import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ExercisePage from "@/pages/ExercisePage";
import WeatherPage from "@/pages/WeatherPage";
import CallPage from "@/pages/CallPage";
import HealthPage from "@/pages/HealthPage";
import MapPage from "@/pages/MapPage";
import MediaPage from "@/pages/MediaPage";
import { useState } from "react";
import { AuthContext, HighContrastContext } from '@/contexts/authContext';
import { useHighContrast } from '@/hooks/useTheme';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <HighContrastContext.Provider
        value={{ isHighContrast, toggleHighContrast }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </HighContrastContext.Provider>
    </AuthContext.Provider>
  );
}
