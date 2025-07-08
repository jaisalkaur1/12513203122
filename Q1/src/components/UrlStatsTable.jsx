import React from 'react';
// import { formatDate } from '../utils/format';
import Log from '../utils/logger';

const URLStatsTable = ({ urls, onViewDetails }) => {
  React.useEffect(() => {
    Log('frontend', 'info', 'stats-table', `Stats table rendered with ${urls.length} URLs`);
  }, [urls.length]);

  const handleViewDetails = (url) => {
    Log('frontend', 'info', 'stats-table', `View details clicked for URL: ${url.shortcode}`);
    onViewDetails(url);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Short URL</th>
          {/* <th>Created</th>
          <th>Expires</th> */}
          <th>Clicks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {urls.map(url => (
          <tr key={url.id}>
            <td>
              <div className="url-cell">
                <span className="font-mono" title={url.shortUrl}>
                  {url.shortUrl.length > 25 ? url.shortUrl.substring(0, 25) + '...' : url.shortUrl}
                </span>
              </div>
            </td>
            {/* <td>
              <div className="date-cell">
                {formatDate(url.createdAt)}
              </div>
            </td>
            <td>
              <div className="date-cell">
                {formatDate(url.expiryDate)}
              </div>
            </td> */}
            <td>
              <div className="clicks-cell">
                <span className="font-bold">{url.clicks}</span>
              </div>
            </td>
            <td>
              <div className="actions-cell">
                <button onClick={() => handleViewDetails(url)}>
                  View Details
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default URLStatsTable;
