import Auth from "api/auth";
import { IsLogin } from "api/func";
import { redirect, type MiddlewareFunction } from "react-router";

async function authMiddleware() {
    console.log("authMiddleware")
    const result = localStorage.getItem(Auth.keyToken);
    if (Boolean(result)) {
        throw redirect("/");
    }
}

export const middleware: MiddlewareFunction[] = [authMiddleware];
