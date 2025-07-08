const LOGGING_SERVER_URL = 'http://localhost:3000';

/**
 * Frontend logging utility that sends logs to the backend logging service
 * @param {string} stack - The application stack (e.g., 'frontend', 'ui', 'api')
 * @param {string} level - Log level ('info', 'warn', 'error', 'debug')
 * @param {string} pkg - Package/component name (e.g., 'url-shortener', 'form-handler')
 * @param {string} message - The log message
 */
async function Log(stack, level, pkg, message) {
    try {
        const logData = {
            stack,
            level,
            package: pkg,
            message: typeof message === 'object' ? JSON.stringify(message) : String(message)
        };

        const response = await fetch(`${LOGGING_SERVER_URL}/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData)
        });

        if (!response.ok) {
            // If logging fails, we still want to show something in development
            if (process.env.NODE_ENV === 'development') {
                console.warn(`Logging failed: ${response.status} - ${response.statusText}`);
            }
        }
    } catch (error) {
        // If logging completely fails, we don't want to break the app
        if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to send log to backend:', error.message);
        }
    }
}

export default Log; 