import jwt_decode from "jwt-decode";


interface TokenPayload {
    isLogin: boolean,
    username: string,
    exp: number
}
function jwtCheck() {
    var isLogin = false
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        if (typeof localStorage.getItem("token") === 'string') {
            isLogin = localStorage.getItem("token") !== "null";
        }
    }
    if (isLogin) {
        const jwt = jwt_decode<TokenPayload>(localStorage.getItem("token") ?? '')
        const exp = jwt.exp
        return (Date.now() >= exp);
    }
    return false
}


export const jwtHelper = {
    jwtCheck,
};