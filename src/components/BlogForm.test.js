import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogFormContainer } from './BlogForm'

test('<BlogForm /> event handler works correctly when posting a new blog', async () => {
  const blog = {
    title: 'This is a new blog for the unit test o02knsdspa',
    author: 'Author for unit test o02knsdspa',
    url: 'www.o02knsdspa.com',
  }

  const post = jest.fn()
  const blogPoster = userEvent.setup()

  render(<BlogFormContainer post={post} />)

  //Type in the blog title
  const titleInput = screen.getByPlaceholderText('Title of blog')
  await blogPoster.type(titleInput, blog.title)

  //Type in the blog author
  const authorInput = screen.getByPlaceholderText('Author of blog')
  await blogPoster.type(authorInput, blog.author)

  //Type in the blog url
  const urlInput = screen.getByPlaceholderText('Link to blog post')
  await blogPoster.type(urlInput, blog.url)

  //Click the post button
  const postBlogButton = screen.getByText('Add blog')
  expect(postBlogButton).toBeDefined()
  await blogPoster.click(postBlogButton)

  //Asserts
  expect(post.mock.calls).toHaveLength(1)
  expect(post.mock.calls[0][0]).toEqual(blog)
})
