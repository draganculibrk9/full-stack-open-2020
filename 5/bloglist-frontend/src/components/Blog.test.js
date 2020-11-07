import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
    const blog = {
        name: 'Test blog',
        author: 'Test Test',
        likes: 0,
        url: 'www.blog.test.com',
        user: {
            name: 'Test User'
        }
    }

    const mock = jest.fn()

    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} removeHandle={mock} editHandle={mock}/>
        )
    })

    test('renders content correctly', () => {
        expect(component.container.querySelector('.basicInfo')).not.toHaveStyle('display: none')
        expect(component.container.querySelector('.additionalInfo')).toHaveStyle('display: none')
    })

    test('shows additional info', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container.querySelector('.additionalInfo')).not.toHaveStyle('display: none')
    })

    test('like button works', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mock.mock.calls).toHaveLength(2)
    })
})