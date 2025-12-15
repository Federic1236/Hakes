// api/check-password.js
// This code runs securely on the Vercel server.

// Vercel serverless functions are based on Node.js/Express-like syntax.
export default function handler(request, response) {
    // 1. Read the secret from the secure Vercel environment variables.
    // The name 'SECRET_CODE' must match the name you set in Vercel's dashboard.
    const CORRECT_PASSWORD = process.env.SECRET_CODE; 

    // 2. Extract the password sent by the client (index.html)
    // The password will be in the request body, sent as JSON.
    const { password } = request.body;

    // 3. Simple error handling: check if the password variable was set
    if (!CORRECT_PASSWORD) {
        response.status(500).json({ success: false, message: 'Server configuration error: Password variable is missing.' });
        return;
    }

    // 4. Perform the secure comparison.
    if (!password || password !== CORRECT_PASSWORD) {
        // Send a 401 Unauthorized status and a failure message
        response.status(401).json({ success: false, message: 'Invalid Credentials.' });
        return;
    }

    // 5. Success! If the passwords match, send a success message back.
    response.status(200).json({ success: true, message: 'Access Granted!' });
}
