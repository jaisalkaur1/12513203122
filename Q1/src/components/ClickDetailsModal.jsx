import React from 'react';
import { formatDate } from '../utils/format';
import Log from '../utils/logger';

const ClickDetailsModal = ({ url, onClose }) => {
    React.useEffect(() => {
        Log('frontend', 'info', 'modal', `Click details modal opened for ${url.shortcode}`);
    }, [url.shortcode]);

    const handleClose = () => {
        Log('frontend', 'info', 'modal', 'Click details modal closed');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🔍 Click Details - {url.shortcode}</h2>
                    <button onClick={handleClose} className="modal-close">&times;</button>
                </div>

                <div className="modal-body">
                    <div className="modal-info">
                        <p><strong>Original URL:</strong> <span className="break-all">{url.longUrl}</span></p>
                        <p><strong>Created:</strong> {formatDate(url.createdAt)}</p>
                        <p><strong>Expires:</strong> {formatDate(url.expiryDate)}</p>
                        <p><strong>Total Clicks:</strong> <span className="click-count">{url.clicks}</span></p>
                    </div>

                    <h3 className="modal-section-title">Click History:</h3>
                    {url.clickDetails.length === 0 ? (
                        <div className="no-data">
                            <p>No clicks recorded yet.</p>
                            <p className="no-data-subtitle">This URL hasn't been accessed through the shortened link.</p>
                        </div>
                    ) : (
                        <div className="modal-table-container">
                            <table className="modal-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Source</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {url.clickDetails.map((click, i) => (
                                        <tr key={i}>
                                            <td>{formatDate(click.timestamp)}</td>
                                            <td>{click.source}</td>
                                            <td>{click.location}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClickDetailsModal;
