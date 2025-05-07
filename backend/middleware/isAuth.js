// middleware/isAuth.js
// module.exports = (req, res, next) => {
//     if (!req.session.user) {
//       return res.status(401).json({ msg: "Unauthorized" });
//     }
//     next();
//   };


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // First, check for session-based authentication
    if (req.session.user) {
        // If user is authenticated via session, proceed to next middleware
        return next();
    }

    // If no session, check for JWT token-based authentication
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized, token missing" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized, invalid token" });
        }
        
        // Attach the decoded data to the request object
        req.user = decoded;  // You can use this data later (e.g., req.user.id)
        next();
    });
};
