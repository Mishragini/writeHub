import {Hono} from 'hono';
import { handleSignin, handleSignup } from '../controller/user';
import {getBlogById, handlePostBlog, handlePutBlog} from '../controller/blog'
export const router=new Hono();

router.post('/user/signup',handleSignup);

router.post('/user/signin',handleSignin);

router.post('/blog',handlePostBlog);

router.put('/blog/:id',handlePutBlog);

router.get('/blog/:id',getBlogById);