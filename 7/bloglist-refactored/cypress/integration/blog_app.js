describe('Blog app', function () {
    beforeEach(function () {
        cy.reset_database()
    })

    it('login form is displayed', function () {
        cy.contains('username')
        cy.contains('password')
    })

    describe('login', function () {
        beforeEach(function () {
            cy.add_user()
        })

        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('test')

            cy.get('#loginButton').click()

            cy.contains('test test logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('hgg')
            cy.get('#password').type('teshghgt')

            cy.get('#loginButton').click()

            cy.contains('invalid username or password')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.add_user()
            cy.login({username: 'test', password: 'test'})
            cy.visit('http://localhost:3000')
        })

        it('a blog can be created', function () {
            cy.contains('new blog').click()

            cy.contains('title')
            cy.contains('author')
            cy.contains('url')

            cy.get('#title').type('new blog')
            cy.get('#author').type('user')
            cy.get('#url').type('www.blog.com')

            cy.get('#createBlog').click()

            cy.contains('a new blog new blog by user added')
        })
    })

    describe('when logged in and blogs are present', function () {
        beforeEach(function () {
            cy.add_user()
            cy.login({username: 'test', password: 'test'})
            cy.add_blog({title: 'blog1', author: 'author1', url: 'www.blog1.com', likes: 0})
            cy.add_blog({title: 'blog2', author: 'author2', url: 'www.blog2.com', likes: 1})
            cy.add_blog({title: 'blog3', author: 'author3', url: 'www.blog3.com', likes: 2})
            cy.visit('http://localhost:3000')
        })

        it('blog can be liked', function () {
            cy.contains('blog1')
            cy.contains('blog2')
            cy.contains('blog3')

            cy.contains('blog1').find('button').as('showButton')
            cy.get('@showButton').click()
            cy.contains('blog1').parent().find('#likeButton').click()
            cy.contains('liked blog blog1 by author1')
            cy.contains(1)
        })

        it('blog can be removed', function () {
            cy.contains('blog1').find('button').as('showButton')
            cy.get('@showButton').click()
            cy.contains('blog1').parent().find('#removeButton').click()
            cy.contains('removed blog blog1 by author1')
            cy.contains('blog1').should('not.exist')
        })

        it('should sort blogs by number of likes', function () {
            cy.get('.additionalInfo').as('divs')
            cy.get('@divs').eq(0).contains('likes 2')
            cy.get('@divs').eq(1).contains('likes 1')
            cy.get('@divs').eq(2).contains('likes 0')
        })
    })
})