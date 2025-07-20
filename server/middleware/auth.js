import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not found", error: true, success: false });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS)
            if (!decode) {
                return res.status(403).json({ message: "Unauthorized access", error: true, success: false });
            }
            req.userId = decode.id;
            next();
        
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: error.message || "Internal server error", error: true, success: false });
    }
};

export default auth;