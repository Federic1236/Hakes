// api/check-password.js
// Checks the primary access password against the SECRET_CODE environment variable.

export default function handler(request, response) {
    // Read the secret from the secure Vercel environment variables.
    const CORRECT_PASSWORD = process.env.SECRET_CODE; 

    // Extract the password sent by the client.
    const { password } = request.body;

    // Check for server configuration error
    if (!CORRECT_PASSWORD) {
        response.status(500).json({ success: false, message: 'Server configuration error: Primary password (SECRET_CODE) is missing.' });
        return;
    }

    // Perform the secure comparison.
    if (!password || password !== CORRECT_PASSWORD) {
        // Send a 401 Unauthorized status and a failure message
        response.status(401).json({ success: false, message: 'Invalid Credentials.' });
        return;
    }

    // Success! 
    response.status(200).json({ success: true, message: 'Access Granted!' });
}
