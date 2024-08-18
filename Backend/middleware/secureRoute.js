import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;

        // If no token, deny access
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is invalid, deny access
        if (!decoded) {
            return res.status(401).json({ error: "Invalid Token" });
        }

        // Find the user by ID
        const user = await User.findById(decoded.userId).select("-password");

        // If the user is not found, deny access
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in secureRoute: ", error);

        // Handle JWT token specific errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid Token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token has expired" });
        }

        // General server error
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default secureRoute;
