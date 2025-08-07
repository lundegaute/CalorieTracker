import jwt from 'jsonwebtoken';
import {DecodedToken} from "@/Types/types";

function validateToken(token: string): { isValid: boolean; isExpired: boolean; timeUntilExpiry?: number; error?: string; } {
    if (!token) {
        console.log("Token not found");
        return {
            isValid: false,
            isExpired: false,
            error: "Token not provided"
        };
    }
    try {
        const decoded = jwt.decode(token) as DecodedToken;

        if (!decoded) {
            console.log("Failed to decode token");
            return {
                isValid: false,
                isExpired: false,
                error: "Invalid token format"
            };
        }
        if (!decoded.exp) {
            console.log("Token missing expiration claim");
            return {
                isValid: false,
                isExpired: false,
                error: "Token missing expiration"
            };
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const isExpired = decoded.exp < currentTime;
        const timeUntilExpiry = decoded.exp - currentTime; // Time until expiry in seconds
        
        console.log(`Current time: ${currentTime}`);
        console.log(`Token expires at: ${decoded.exp}`);
        console.log(`Time until expiry: ${timeUntilExpiry} seconds`);
        console.log(`Token expired: ${isExpired}`);

        return {
            isValid: !isExpired,
            isExpired,
            timeUntilExpiry: timeUntilExpiry > 0 ? timeUntilExpiry : 0,
            error: isExpired ? "Token has expired" : undefined
        };
    } catch (error) {
        console.error("Error validating token:", error);
        return {
            isValid: false,
            isExpired: false,
            error: "Error validating token"
        };
    }
}

export default validateToken;