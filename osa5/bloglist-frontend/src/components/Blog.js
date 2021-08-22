import React from 'react'
import { useState } from 'react'



const Blog = ({ blog, giveaLike, deleteBlog, user }) => {
  const [showMore, setShowMore] = useState(false)



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const MoreBlog = () => {
    return(
      <div >
        <p>{blog.url}</p>
        <p id='blogpara'>{blog.likes} likes <button onClick={() => giveaLike(blog)} > like </button></p>
        <p>{blog.user.name}</p>

      </div>
    )
  }

  return(
    <div id='blogid' className='blog' style={blogStyle}  >
      {blog.title} {blog.author} <button onClick={ () => setShowMore(!showMore)} > {showMore ? 'Hide':'View'}</button>
      {showMore && MoreBlog()}
      {blog.user.username === user.username ? <p><button onClick={ () => deleteBlog(blog)} > delete </button></p> : null}

    </div>
  )

}

export default Blog