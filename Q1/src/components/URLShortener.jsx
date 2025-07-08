import React, { useState } from 'react';
import Log from '../utils/logger';

const BITLY_API_TOKEN = import.meta.env.VITE_BITLY_API_TOKEN;

const URLShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) return;

        // Log form submission
        await Log('frontend', 'info', 'url-shortener', `Form submitted with URL: ${longUrl}`);

        setLoading(true);
        setError('');
        setShortUrl('');

        try {
            // Log API request initiation
            await Log('frontend', 'info', 'bitly-api', 'Initiating Bitly API request');

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
                // Log successful URL shortening
                await Log('frontend', 'info', 'url-shortener', `Successfully shortened URL: ${longUrl} -> ${data.link}`);

                // Save to localStorage for statistics
                const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
                const newUrl = {
                    id: Date.now(),
                    longUrl,
                    shortUrl: data.link,
                    shortcode: data.link.split('/').pop(),
                    createdAt: new Date().toISOString(),
                    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
                    clicks: 0,
                    clickDetails: []
                };
                savedUrls.push(newUrl);
                localStorage.setItem('shortenedUrls', JSON.stringify(savedUrls));

                await Log('frontend', 'info', 'url-shortener', 'URL data saved to localStorage for statistics');
            } else {
                const errorMessage = data.description || 'Something went wrong';
                setError(errorMessage);
                // Log API error response
                await Log('frontend', 'error', 'bitly-api', `API error: ${response.status} - ${errorMessage}`);
            }
        } catch (err) {
            const errorMessage = 'Failed to reach Bitly API';
            setError(errorMessage);
            // Log network/connection errors
            await Log('frontend', 'error', 'bitly-api', `Network error: ${err.message}`);
        } finally {
            setLoading(false);
            // Log request completion
            await Log('frontend', 'debug', 'url-shortener', 'URL shortening request completed');
        }
    };

    // Log component mount
    React.useEffect(() => {
        Log('frontend', 'info', 'url-shortener', 'URL Shortener component mounted');
    }, []);

    return (
        <div className="app-content">
            <h1>URL Shortener</h1>
            {/* <p className="subtitle">Transform your long URLs into short, shareable links</p> */}

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
    );
};

export default URLShortener; 