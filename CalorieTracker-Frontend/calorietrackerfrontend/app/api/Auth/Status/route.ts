import { NextRequest, NextResponse} from "next/server";
import ValidateToken from "@/HelperFunctions/validateToken";


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value || "";
    const result = ValidateToken(token);

    if (  result.title === "Token expired" || result.title === "Token invalid" || result.title === "Token not found") {
        return NextResponse.json(
            { authenticated: false, reason: result.message.Error[0] },
            { status: 401 }
        );
    } else {
        return NextResponse.json(
            { authenticated: true},
            { status: 200 }
        )
    }
}