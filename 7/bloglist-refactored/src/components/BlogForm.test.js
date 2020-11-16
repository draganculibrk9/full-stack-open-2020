import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
    const createBlog = jest.fn()

    let component

    beforeEach(() => {
        component = render(
            <BlogForm createHandle={createBlog}/>
        )
    })

    test('create works', () => {
        const title = component.container.querySelector('input[name="Title"]')
        const author = component.container.querySelector('input[name="Author"]')
        const url = component.container.querySelector('input[name="Url"]')

        fireEvent.change(title, {
            target: { value: 'Blog title' }
        })

        fireEvent.change(author, {
            target: { value: 'Blog author' }
        })

        fireEvent.change(url, {
            target: { value: 'Blog url' }
        })

        const form = component.container.querySelector('form')
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Blog title' )
        expect(createBlog.mock.calls[0][0].author).toBe('Blog author' )
        expect(createBlog.mock.calls[0][0].url).toBe('Blog url' )
    })
})