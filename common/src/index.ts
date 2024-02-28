import {z} from'zod';

export const signupSchema=z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string().min(8)
})

export const signinSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8)
})

export const createPostSchema=z.object({
    title:z.string(),
    content:z.string(),
    published:z.string().optional()
})

export const updatePostSchema=z.object({
    title:z.string().optional(),
    content:z.string().optional(),
    published:z.string().optional()
})