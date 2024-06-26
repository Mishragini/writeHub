import {Hono,Context} from "hono";
import {createPostSchema,updatePostSchema} from'@mishri/common'

export async function handlePostBlog(c:Context){
    const prisma=c.get('prisma');

    const userId=c.get('userId');

    const body:{title:string,content:string}=await c.req.json();

    const {success}= createPostSchema.safeParse(body);

    if(!success) {
        return c.json({message:"Invalid inputs"})

    }

    const post =await prisma.post.create({data:{title:body.title,content:body.content,authorId:userId,createdOn:new Date()}});

    return c.json({
		id: post.id
	});

}

export async function handlePutBlog(c:Context){
    const prisma=c.get('prisma');

    const userId=c.get('userId');

    const blogId=c.req.param('id');

    

    const body:{
        title?:string,
        content?:string,
        publishes?:boolean
    }=await c.req.json();

    const {success}= updatePostSchema.safeParse(body);

    if(!success) {
        return c.json({message:"Invalid inputs"})

    }

    const updatedBlog=await prisma.post.update({where:{
        id:blogId,
        authorId:userId
    },data:body})

    return c.json(updatedBlog);
}

export async function getBlogById(c:Context){
    const prisma=c.get('prisma');

    const blogId=c.req.param('id');

    const blog=await prisma.post.findFirst({where:{id:blogId},include:{author:{select:{name:true,about:true}}}});

    return c.json(blog);
}

export async function getAllBlogs(c:Context){
    const prisma=c.get('prisma');

    const userId=c.get('userId')
    try {
        const blogs = await prisma.post.findMany();
        return c.json(blogs);
      } catch (error) {
        console.error('Error retrieving blogs:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
      }
}