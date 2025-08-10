import jwt from 'jsonwebtoken';
import { DecodedToken, ErrorResponse } from "@/Types/types";

function response(message: string, type: string, title: string, status: number, redirect: string) {
    return {
        message: { Error: [message] },
        type,
        title,
        status,
        redirect
    };
}

function validateToken(token: string) {
    if (!token) {
        console.log("Token not found");
        return response("Token not found", "Authorization", "Token not found", 401, "/Auth/Login");
    }

    try {
        // Use verify instead of decode to ensure signature & exp are checked
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET;
        let decoded: DecodedToken | null;

        if (secret) {
            decoded = jwt.verify(token, secret) as DecodedToken; // throws on invalid or expired
        } else {
            // Fallback (NOT secure) if secret missing
            decoded = jwt.decode(token) as DecodedToken | null;
        }

        if (!decoded) {
            console.log("Failed to decode token");
            return response("Invalid token format", "Authorization", "Invalid Token format", 401, "/Auth/Login");
        }

        if (!decoded.exp) {
            console.log("Token missing exp");
            return response("Token missing exp claim", "Authorization", "Expiration error", 401, "/Auth/Login");
        }

        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp <= now) {
            return response("Token has expired", "Authorization", "Token expired", 401, "/Auth/Login");
        }

        // SUCCESS case (add whatever you need)
        return response("Token is valid", "Authorize", "Token is valid", 200, "");

    } catch (err: any) {
        if (err?.name === "TokenExpiredError") {
            return response("Token has expired", "Authorization", "Token expired", 401, "/Auth/Login");
        }
        if (err?.name === "JsonWebTokenError") {
            return response("Invalid token", "Authorization", "Token invalid", 401, "/Auth/Login");
        }
        console.error("Error validating token:", err);
        return response("Error validating token", "Authorization", "Validation error", 500, "/Auth/Login");
    }
}

export default validateToken;