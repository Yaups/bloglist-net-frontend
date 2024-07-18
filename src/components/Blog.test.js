import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogContainer } from './Blog'

test('<Blog /> renders all content apart from the delete button when not logged in as the creator', () => {
  const blog = {
    title: 'This is a new blog for the unit test sl2046h3nv02',
    author: 'Author for unit test sl2046h3nv02',
    url: 'www.sl2046h3nv02.com',
    likes: 0,
    user: {
      name: 'Test Name sl2046h3nv02',
      username: 'not matching the testStore username',
    },
    comments: [{ _id: '5iojf934', text: 'comment text' }],
  }

  const user = {
    name: 'match',
    username: 'match',
  }

  render(
    <BlogContainer
      blog={blog}
      user={user}
      handleUpvote={() => null}
      listStyle={{}}
      commentText={''}
      setCommentText={() => null}
      handleComment={() => null}
      handleDeletion={() => null}
    />,
  )

  const title = screen.getByText(blog.title)
  const byAuthor = screen.getByText(`by ${blog.author}`)
  const likes = screen.queryByText(`Likes: ${blog.likes}`)
  const url = screen.queryByText(blog.url)
  const postedBy = screen.queryByText(`Posted by ${blog.user.name}`)
  const deleteButton = screen.queryByText('Delete blog')

  expect(deleteButton).toBe(null)
  expect(title).toBeDefined()
  expect(byAuthor).toBeDefined()
  expect(likes).toBeDefined()
  expect(url).toBeDefined()
  expect(postedBy).toBeDefined()
})

test('<Blog /> renders the delete button when logged in as the blog poster', () => {
  const blog = {
    title: 'This is a new blog for the unit test sl2046h3nv02',
    author: 'Author for unit test sl2046h3nv02',
    url: 'www.sl2046h3nv02.com',
    likes: 0,
    user: {
      name: 'Test Name sl2046h3nv02',
      username: 'match',
    },
    comments: [{ _id: '5iojf934', text: 'comment text' }],
  }

  const user = {
    name: 'match',
    username: 'match',
  }

  render(
    <BlogContainer
      blog={blog}
      user={user}
      handleUpvote={() => null}
      listStyle={{}}
      commentText={''}
      setCommentText={() => null}
      handleComment={() => null}
      handleDeletion={() => null}
    />,
  )

  const title = screen.getByText(blog.title)
  const byAuthor = screen.getByText(`by ${blog.author}`)
  const likes = screen.queryByText(`Likes: ${blog.likes}`)
  const url = screen.queryByText(blog.url)
  const postedBy = screen.queryByText(`Posted by ${blog.user.name}`)
  const deleteButton = screen.queryByText('Delete blog')

  expect(deleteButton).toBeDefined()
  expect(title).toBeDefined()
  expect(byAuthor).toBeDefined()
  expect(likes).toBeDefined()
  expect(url).toBeDefined()
  expect(postedBy).toBeDefined()
})

test('Clicking the like button calls its event handler once', async () => {
  const blog = {
    title: 'This is a new blog for the unit test 387hfhu83',
    author: 'Author for unit test 387hfhu83',
    url: 'www.387hfhu83.com',
    likes: 0,
    user: {
      name: 'Test Name sl2046h3nv02',
      username: 'not matching the testStore username',
    },
    comments: [{ _id: '5iojf934', text: 'comment text' }],
  }

  const user = {
    name: 'match',
    username: 'match',
  }

  const handleUpvote = jest.fn()

  render(
    <BlogContainer
      blog={blog}
      user={user}
      handleUpvote={handleUpvote}
      listStyle={{}}
      commentText={''}
      setCommentText={() => null}
      handleComment={() => null}
      handleDeletion={() => null}
    />,
  )

  const clicker = userEvent.setup()
  const likeButton = screen.getByText('Like blog')

  await clicker.click(likeButton)
  await clicker.click(likeButton)

  expect(handleUpvote.mock.calls).toHaveLength(2)
})
