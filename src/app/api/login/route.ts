import { NextResponse } from "next/server"
import { limiter } from "../config/limiter"

export async function GET(request : Request) {
    const remaining = await limiter.removeTokens(1);
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const data = await res.json();

    const origin = request.headers.get("origin");

    if(remaining < 0){
        return new NextResponse(null, {
            status : 429,
            statusText : "You've exceed requests!",
            headers : {
                'Access-Control-Allow-Origin' : origin || '*',
                'Content-Type' : 'text/plain'
            }
        })
    }
    return NextResponse.json({status : 200, data : data})
}