describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Jane Doe',
      username: 'username',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login to application');
  });

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('user');
      cy.get('#password').type('pass');
      cy.contains('login').click();

      cy.contains('wrong username or password');
    });

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('username');
      cy.get('#password').type('password');
      cy.contains('login').click();
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'username', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type(
        'What is next for Server Side Rendering in Angular'
      );
      cy.get('#author').type('Jessica Janiuk');
      cy.get('#link').type(
        'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67'
      );

      cy.get('#submit').click();
    });

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'What is next for Server Side Rendering in Angular',
        author: 'Jessica Janiuk',
        url: 'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67',
      });
      cy.contains('View').click();
      cy.get('#like').click();
      cy.contains('1');
    });
  });
});
