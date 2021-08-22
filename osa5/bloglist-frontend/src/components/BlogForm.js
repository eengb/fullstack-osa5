
import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'



const BlogForm = ({ handleSubmit }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const likes=0

  const handleBlogCreate = (event) => {
    event.preventDefault()

    handleSubmit({
      title,author,likes,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(


    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
      Title
          <input id="title" type = "text"  value = {title} name="title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
      Author
          <input id="author" type = "text"  value = {author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
      URL
          <input id="url" type = "text"  value = {url} name="url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="submitbutton" type ="submit"> submit </button>
      </form>
    </div>)
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}


export default BlogForm



