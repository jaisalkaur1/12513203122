import React, { useState } from 'react';
import './App.css';

const BITLY_API_TOKEN = import.meta.env.VITE_BITLY_API_TOKEN;

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BITLY_API_TOKEN}`
        },
        body: JSON.stringify({ long_url: longUrl })
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.link);
      } else {
        setError(data.description || 'Something went wrong');
      }
    } catch (err) {
      console.log(err)
      setError('Failed to reach Bitly API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="app-content">
        <h1>URL Shortener</h1>
        <p className="subtitle">Transform your long URLs into short, shareable links</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="url"
              placeholder="Enter your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading && <span className="loading-spinner"></span>}
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <p>✨ Your shortened URL is ready!</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </div>
        )}

        {error && <div className="error">⚠️ {error}</div>}
      </div>
    </div>
  );
}

export default App;
