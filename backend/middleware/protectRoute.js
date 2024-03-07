import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return req.status(401).json("Unauthorized - no Token Provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return req.status(401).json("Unauthorized - Invalid Token");
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return req.status(404).json("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectRoute;