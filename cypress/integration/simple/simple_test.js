describe('My First test', function () {
    it('Does not do much', function () {
        cy.visit('https://ca4106-project-272809.appspot.com/');
        cy.get(".card-header");
    })
});
