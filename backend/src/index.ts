import { Context, Hono, Next } from 'hono'
import { router } from './router/user'
import { authMiddleWare } from './middleware/auth';
import { PrismaClient, Prisma } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

type PrismaContext = Context & {
    prisma: PrismaClient<Prisma.PrismaClientOptions>;
};

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string,
        prisma: PrismaClient<Prisma.PrismaClientOptions> 
    }
}>();

app.use('/api/v1/*',async (c:Context,next:Next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set("prisma",prisma)
    await next();
})

app.use('/api/v1/blog/*', authMiddleWare)

app.route("/api/v1", router);

export default app
