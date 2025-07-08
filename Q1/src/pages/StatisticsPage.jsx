import React, { useEffect, useState } from 'react';
import URLStatsTable from '../components/URLStatsTable';
import ClickDetailsModal from '../components/ClickDetailsModal';
import Log from '../utils/logger';

const StatisticsPage = () => {
    const [urls, setUrls] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        Log('frontend', 'info', 'statistics', 'Statistics page mounted');
        const saved = localStorage.getItem('shortenedUrls');
        const urlData = saved ? JSON.parse(saved) : [];
        setUrls(urlData);
        Log('frontend', 'info', 'statistics', `Loaded ${urlData.length} URLs from localStorage`);
    }, []);

    const handleViewDetails = (url) => {
        setSelected(url);
        Log('frontend', 'info', 'statistics', `Viewing details for URL: ${url.shortcode}`);
    };

    const handleCloseModal = () => {
        setSelected(null);
        Log('frontend', 'info', 'statistics', 'Closed click details modal');
    };

    return (
        <div className="app-content">
            <h1>URL Statistics</h1>
            <p className="subtitle">View analytics and click data for your shortened URLs</p>

            {urls.length === 0 ? (
                <div className="result">
                    <p>No shortened URLs found</p>
                    <p style={{ margin: '10px 0', fontSize: '14px', opacity: '0.8' }}>
                        Create some shortened URLs first to see statistics here.
                    </p>
                </div>
            ) : (
                <div className="stats-container">
                    <URLStatsTable urls={urls} onViewDetails={handleViewDetails} />
                </div>
            )}

            {selected && (
                <ClickDetailsModal url={selected} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default StatisticsPage;
