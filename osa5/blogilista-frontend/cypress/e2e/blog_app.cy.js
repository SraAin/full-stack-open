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
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('username');
      cy.get('#password').type('password');
      cy.contains('login').click();
      cy.contains('logout').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user');
      cy.get('#password').type('pass');
      cy.contains('login').click();

      cy.contains('wrong username or password')
    });
  });
});
