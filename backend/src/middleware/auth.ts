import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authMiddleWare(c: Context, next: Next) {
    const autHeader = c.req.header('authorization');
    const token = autHeader?.split(' ')[1];
    
    if (!token) return c.json({ message: "Token is not present" }, 401);

    try {
        const decoded = await verify(token, c.env.JWT_SECRET);
        c.set("userId", decoded.id);
        await next();
    } catch (error) {
        return c.json({ message: 'Unauthorized: Invalid token' }, 401);
    }
}
