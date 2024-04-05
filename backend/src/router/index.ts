import {Hono} from 'hono';
import { getAuthorDetails, handleMe, handleSignin, handleSignup, updateUser } from '../controller/user';
import {getBlogById, handlePostBlog, handlePutBlog,getAllBlogs} from '../controller/blog'
export const router=new Hono();

router.post('/user/signup',handleSignup);
router.post('/user/signin',handleSignin);
router.get('/me',handleMe);
router.get('/author/:authorId',getAuthorDetails);
router.put('/me',updateUser);

router.post('/blog',handlePostBlog);
router.put('/blog/:id',handlePutBlog);
router.get('/blog/:id',getBlogById);
router.get('/blogs',getAllBlogs);

