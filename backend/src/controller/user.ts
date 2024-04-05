import {Context, Hono} from "hono";
import { sign } from "hono/jwt";

import {signinSchema,signupSchema} from'@mishri/common'

async function hashFunction(message:string) : Promise<string> {
    const encodedMsg = new TextEncoder().encode(message);
    const msgDigest = await crypto.subtle.digest(
      {
        name: "SHA-256",
      },
      encodedMsg
    );
    const msgHash = [...new Uint8Array(msgDigest)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return msgHash;
  }

export async function handleSignup(c:Context){

    const prisma=c.get('prisma');
   
    const body:{email:string,name:string,password:string}=await c.req.json();


    const {success}=signupSchema.safeParse(body);

    if(!success){
        return c.json({message:"Invalid inputs"})
    }

    const user= await prisma.user.findFirst({where:{email:body.email}})

    if(user) return c.json({message:"User already exists"})

    const password=await hashFunction(body.password);

    const newUser=await prisma.user.create({
        data:{
            name:body.name,
            email:body.email,
            password
        }
    })

    const token =await sign({id:newUser.id},c.env.JWT_SECRET);

    

    return c.json({message:"User signed up successfully",token,userId:newUser.id});

}

export async function handleSignin(c:Context){
    const prisma=c.get('prisma');

   
    const body :{email:string,password:string}=await c.req.json();


    const {success}=signinSchema.safeParse(body);

    if(!success){
        return c.json({message:"Invalid inputs"})
    }

    const user= await prisma.user.findFirst({where:{email:body.email}})

    if(!user) return c.json({message:"User does not exist"})

    const hashedPass = await hashFunction(body.password);
    if(hashedPass!==user.password){
        return c.json({message:"Wrong Password"})
    }

    const token =await sign({id:user.id},c.env.JWT_SECRET);

    

    return c.json({message:"User signed in successfully",token,userId:user.id});


}

export async function handleMe(c:Context){
const prisma=c.get('prisma');
const userId=c.get('userId');
const me=await prisma.user.findFirst({where:{id:userId},include:{posts:{select:{title:true}}}})
return c.json(me);
}

export async function getAuthorDetails(c:Context){
  const prisma=c.get('prisma');
  const authorId=c.req.param('authorId');
  const author=await prisma.user.findFirst({where:{id:authorId},include:{posts:{select:{title:true}}}})
  return c.json(author);
}