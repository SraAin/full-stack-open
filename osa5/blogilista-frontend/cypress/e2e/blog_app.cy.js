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

    it('blog can be created', function () {
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

    it('blog can be liked', function () {
      cy.createBlog({
        title: 'What is next for Server Side Rendering in Angular',
        author: 'Jessica Janiuk',
        url: 'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67',
      });
      cy.contains('View').click();
      cy.get('#like').click();
      cy.contains('1');
    });

    it('blog can be deleted', function () {
      cy.createBlog({
        title: 'What is next for Server Side Rendering in Angular',
        author: 'Jessica Janiuk',
        url: 'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67',
      });
      cy.contains('View').click();
      cy.contains('Delete').click();
      cy.contains('Blog deleted succesfully');
    });

    it('delete button is visible', function () {
      cy.createBlog({
        title: 'What is next for Server Side Rendering in Angular',
        author: 'Jessica Janiuk',
        url: 'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67',
      });
      cy.contains('View').click();
      cy.get('#deleteButton');
    });

    it('blogs are arranged from most to least liked', function () {
      cy.createBlog({
        title: 'What is next for Server Side Rendering in Angular',
        author: 'Jessica Janiuk',
        url: 'https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67',
      });
      cy.createBlog({
        title: 'React Labs: What We Have Been Working On – March 2023',
        author: 'Joseph Savona',
        url: 'https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023',
      });
      //cy.get('.blog').eq(0).contains('View').click();
      cy.get('.blog').eq(1).contains('View').click();
      cy.get('.blog')
        .eq(1)
        .should(
          'contain',
          'React Labs: What We Have Been Working On – March 2023'
        );
      cy.get('.like').eq(1).click();
      cy.reload();
      cy.get('.blog').eq(0).contains('View').click();
      cy.get('.blog')
        .eq(0)
        .should(
          'contain',
          'React Labs: What We Have Been Working On – March 2023'
        );
    });
  });
});
