import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Log from '../utils/logger';

const Navigation = () => {
    const location = useLocation();

    const handleNavClick = (tabName) => {
        Log('frontend', 'info', 'navigation', `User navigated to ${tabName} tab`);
    };

    return (
        <nav className="navigation-menu">
            <div className="nav-container">
                <div className="nav-tabs">
                    <Link
                        to="/"
                        className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}
                        onClick={() => handleNavClick('Shortener')}
                    >
                        {/* <span className="nav-icon">🔗</span> */}
                        URL Shortener
                    </Link>
                    <Link
                        to="/statistics"
                        className={`nav-tab ${location.pathname === '/statistics' ? 'active' : ''}`}
                        onClick={() => handleNavClick('Statistics')}
                    >
                        {/* <span className="nav-icon">📊</span> */}
                        Statistics
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 