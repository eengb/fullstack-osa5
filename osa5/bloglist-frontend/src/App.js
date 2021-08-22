import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage]=useState(null)

  const [messageColor, setMessageColor]= useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageColor(false)
      setUsername('')
      setPassword('')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogFormRef = useRef()
  const blogForm = () => (

    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        handleSubmit={handleBlogSubmit}
      />
    </Togglable>)

  const loginForm = () => (

    <LoginForm buttonLabel="log in"
      handleSubmit={handleLogin}
      username={username}
      password={password}
      usernameStates={({ target }) => setUsername(target.value)}
      passwordStates={({ target }) => setPassword(target.value)}
    />
  )

  const handleBlogSubmit = async (blog) => {

    blogFormRef.current.toggleVisibility()

    try {
      await blogService.create(blog)


      blogService.getAll().then(blogs => setBlogs( blogs ))

      setMessageColor(true)
      setErrorMessage(`${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setMessageColor(false)
      setErrorMessage('wrong blog cred')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const giveaLike = async (blog) => {
    const ublog={ 'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes+1,
      'user': blog.user.id }



    const id=blog.id
    const response =await blogService.update(id,ublog)
    console.log(response)

    blogService.getAll().then(blogs =>
      setBlogs( blogs ))

    setMessageColor(true)
    setErrorMessage(`${response.title} by ${response.author} liked!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const deleteBlog = async (blog) => {
    const areUSure = window.confirm(`Confirm delete action for ${blog.title} by ${blog.author}`)
    if (areUSure){

      const response =await blogService.remove(blog)
      setBlogs(blogs.filter((b) => b.id !== blog.id ? b : response))

      setMessageColor(true)
      setErrorMessage(`${blog.title} by ${blog.author} deleted!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }else{
      console.log('action canceled')
    }

  }

  const logged = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}> logout </button>

    </div>)



  const Notification = ({ message, messageColor }) => {
    if (message === null) {
      return null
    }
    if (messageColor===true) {
      return(
        <div className="errorGreen">
          {message}
        </div>)
    }else{


      return (
        <div className="errorRed">
          {message}
        </div>)}
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  },[])



  if (user === null){

    return(

      <div>
        <Notification message={errorMessage } messageColor={messageColor} />
        {loginForm()}
      </div>)
  }else{

    return (
      <div>
        {logged()}
        <h2>blogs</h2>
        <Notification message={errorMessage } messageColor={messageColor} />
        {blogForm()}
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <Blog id='lol' key={blog.id} blog={blog} giveaLike={giveaLike} deleteBlog={deleteBlog} user={user} />)}
      </div>
    )

  }

}


export default App