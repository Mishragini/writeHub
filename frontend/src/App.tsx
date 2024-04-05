import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AddBlog } from './pages/AddBlog'
import { Blog } from './pages/Blog'
import { AccountProfile } from './pages/AccountProfile'
import { AuthorProfile } from './pages/AuthorProfile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
           <Route path="/signin" element={<Signin />} />
           <Route path="/publish" element={<AddBlog />}/>
          <Route path="/blog/:id" element={<Blog />} /> 
          <Route path="/myProfile" element={<AccountProfile />} /> 
          <Route path='/author/:authorId' element={<AuthorProfile/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App