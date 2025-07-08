import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import URLShortener from './components/URLShortener';
import StatisticsPage from './pages/StatisticsPage';
import Log from './utils/logger';

function App() {
  // Log app initialization
  React.useEffect(() => {
    Log('frontend', 'info', 'app', 'Application initialized with routing');
  }, []);

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<URLShortener />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
