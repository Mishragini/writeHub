import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AddBlog } from './pages/AddBlog'
import { Blog } from './pages/Blog'
import { AccountProfile } from './pages/AccountProfile'
import { AuthorProfile } from './pages/AuthorProfile'
import { AllBlogs } from './pages/AllBlogs'
import Appbar from './components/Appbar'
import { Landing } from './pages/Landing'
import { Edit } from './components/Edit'

function App() {

  return (
    <>
      <BrowserRouter>
      <Appbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
           <Route path="/signin" element={<Signin />} />
           <Route path="/publish" element={<AddBlog />}/>
          <Route path="/blog/:id" element={<Blog />} /> 
          <Route path="/edit/:id" element={<Edit />} /> 
          <Route path="/myProfile" element={<AccountProfile />} /> 
          <Route path='/author/:authorId' element={<AuthorProfile/>}/>
          <Route path='/blogs' element={<AllBlogs/>}/>
          <Route path='/' element={<Landing />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App