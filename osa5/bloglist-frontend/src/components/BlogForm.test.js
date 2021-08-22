import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm works as intended?', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm handleSubmit={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Harrenhallin herra' }
  })

  fireEvent.change(author, {
    target: { value: 'Sir Jones' }
  })

  fireEvent.change(url, {
    target: { value: 'www.harrenhallinherra.fi' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Harrenhallin herra' )
  expect(createBlog.mock.calls[0][0].author).toBe('Sir Jones' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.harrenhallinherra.fi' )
})