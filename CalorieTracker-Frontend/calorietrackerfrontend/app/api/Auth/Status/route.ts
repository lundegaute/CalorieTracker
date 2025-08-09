import { NextRequest, NextResponse} from "next/server";
import ValidateToken from "@/HelperFunctions/validateToken";


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value || "";
    const result = ValidateToken(token);

    if ( !result.isValid) {
        return NextResponse.json(
            { authenticated: false, reason: result.error },
            { status: 401 }
        );
    } else {
        return NextResponse.json(
            { authenticated: true, expiresIn: result.timeUntilExpiry },
            { status: 200 }
        )
    }
}