import jwt from 'jsonwebtoken';

export const authenticateDonor = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from headers
  console.log("Token:", token); // Log the token for debugging

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded JWT:', decoded); // Log the decoded JWT for debugging

    // Attach the decoded information to req.user
    req.user = decoded;  // This should be consistent with your previous implementation
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Authenticate Recipient
export const authenticateRecipient = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token with the secret
    console.log('Decoded JWT:', decoded); // Log the decoded JWT for debugging

    // Check if the 'id' exists in the decoded token
    if (!decoded.id) {
      console.log('Decoded token does not contain an id field');
      return res.status(401).json({ error: 'Unauthorized - No valid ID found in token' });
    }

    req.recipientId = decoded.id;  // Set recipientId in the request object
    console.log('Recipient ID:', req.recipientId);  // Log the recipientId for debugging

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('JWT Verification Error (Recipient):', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};