Cypress.Commands.add('reset_database', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('add_user', () => {
    const user = {
        username: 'test',
        password: 'test',
        name: 'test test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('user', JSON.stringify(body))
    })
})

Cypress.Commands.add('add_blog', ({ title, author, url, likes }) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: {
            title,
            author,
            url,
            likes
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
})