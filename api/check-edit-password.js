// api/check-edit-password.js
// Checks the edit password against the EDIT_CODE environment variable.

export default function handler(request, response) {
    // Read the edit secret from the secure Vercel environment variables.
    const CORRECT_EDIT_PASSWORD = process.env.EDIT_CODE; 

    // Extract the password sent by the client (named 'editPassword' in the client script).
    const { editPassword } = request.body;

    // Check for server configuration error
    if (!CORRECT_EDIT_PASSWORD) {
        response.status(500).json({ success: false, message: 'Server configuration error: Edit password (EDIT_CODE) is missing.' });
        return;
    }

    // Perform the secure comparison.
    if (!editPassword || editPassword !== CORRECT_EDIT_PASSWORD) {
        // Send a 401 Unauthorized status and a failure message
        response.status(401).json({ success: false, message: 'Invalid Edit Credentials.' });
        return;
    }

    // Success! 
    response.status(200).json({ success: true, message: 'Edit Access Granted!' });
}
