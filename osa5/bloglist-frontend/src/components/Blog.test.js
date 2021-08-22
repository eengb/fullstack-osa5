import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent,render } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'bears',
  author: 'Margaret',
  url: 'www.fi',
  likes: 24,
  user: { name: 'Thor',id:'6115264646c059252df1ae24',username:'Thunder' }  }

const mockHandler = jest.fn()


test('renders content', () => {

  const component = render(
    <Blog blog={blog} user={blog.user}/>)
  component.debug()


  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )
})

test('renders content + url and likes when view clicked ', () => {

  const component = render(
    <Blog blog={blog} user={blog.user} />)
  component.debug()

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(`${blog.title}`)
  expect(component.container).toHaveTextContent(`${blog.author}`)
  expect(component.container).toHaveTextContent(`${blog.url}`)
  expect(component.container).toHaveTextContent(`${blog.likes}`)
})



test('test double klicking', () => {

  const component = render(
    <Blog blog={blog} user={blog.user} giveaLike={mockHandler}/>)
  component.debug()

  const button = component.getByText('View')
  fireEvent.click(button)

  const likebutton = component.getByText('like')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)
  console.log(mockHandler.mock.calls)

  expect(mockHandler.mock.calls).toHaveLength(2)
})