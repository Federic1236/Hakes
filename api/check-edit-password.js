// /api/check-edit-password.js
// Checks the password for enabling edit mode.

export default function handler(request, response) {
    // 1. Read the secret from the secure Vercel environment variables.
    // Ensure you set EDIT_CODE in your Vercel project settings.
    const CORRECT_EDIT_PASSWORD = process.env.EDIT_CODE; 

    // 2. Extract the password sent by the client.
    // Note: The client sends it as 'editPassword' (from the frontend JS).
    const { editPassword } = request.body;

    // 3. Simple error handling
    if (!CORRECT_EDIT_PASSWORD) {
        response.status(500).json({ success: false, message: 'Server configuration error: Edit password variable is missing.' });
        return;
    }

    // 4. Perform the secure comparison.
    if (!editPassword || editPassword !== CORRECT_EDIT_PASSWORD) {
        // Send a 401 Unauthorized status and a failure message
        response.status(401).json({ success: false, message: 'Invalid Edit Credentials.' });
        return;
    }

    // 5. Success! 
    response.status(200).json({ success: true, message: 'Edit Access Granted!' });
}
