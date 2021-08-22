describe('Blog app', function() {

  const testuser ={
    username: 'test3',
    name: 'tester',
    password: 'admin'

  }



  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', testuser)
    cy.visit('http://localhost:3000')})


  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('login successful with right login creds ', function(){
      cy.contains('login')
      cy.get('#username').type('test3')
      cy.get('#password').type('admin')
      cy.get('#loginbutton').click()
      cy.contains('logout').click()

    })

    it('login fails with wrong login creds ', function(){


      cy.contains('login')
      cy.get('#username').type('test3')
      cy.get('#password').type('padmin')
      cy.get('#loginbutton').click()
      cy.contains('wrong credentials')})
  })

  describe('after login..',function(){
    beforeEach(function() {
      cy.loginUser({ username:'test3',password:'admin' })
    })

    it('Creation of blog', function() {
      cy.get('#toggler').click()
      cy.get('#title').type('avenger blog')
      cy.get('#author').type('hulk')
      cy.get('#url').type('www.aveblog.fi')
      cy.contains('submit').click()
      cy.contains('avenger blog hulk')
    })
    it('It can be liked!', function() {
      cy.createNewBlog({
        title: 'unicorn',
        author: 'horse',
        url: 'wwww.com',
        likes: 5 })
      cy.contains('View').click()
      cy.contains('like').click()

    })
    it('It can be deleted!', function() {
      cy.createNewBlog({
        title: 'unicorn',
        author: 'horse',
        url: 'wwww.com',
        likes: 5 })
      cy.contains('View').click()
      cy.contains('delete').click()
      cy.on('window:confirm',() => true)

    })

    beforeEach(function() {
      cy.createNewBlog({ title: 'unicorn',
        author: 'horse',
        url: 'wwww.fi',
        likes: 1 })

      cy.createNewBlog({ title: 'stripes',
        author: 'zebra',
        url: 'wwww.io',
        likes: 99 })

      cy.createNewBlog({ title: 'farm life',
        author: 'donkey',
        url: 'wwww.com',
        likes: 17 })
    })


    it('Likes are sorted', function() {

      cy.contains('View').click()
      cy.contains('View').click()
      cy.contains('View').click()



      cy.get('.blog').find('#blogpara').then(blogs => {
        cy.wrap(blogs[0])
        cy.wrap(blogs[1])
        cy.wrap(blogs[2])


        expect(blogs[0]).to.contain('99 likes')
        expect(blogs[1]).to.contain('17 likes')
        expect(blogs[2]).to.contain('1 likes')
      })

    })
  })

})
