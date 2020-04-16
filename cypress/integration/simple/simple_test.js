describe('Tests', function () {
    const itemByPage = 6;
    const testMovieId = "tt0120689";
    const testMovie = "The Green Mile";
    it('Is site UP', function () {
        cy.visit('/');
    });
    it('Item by page', function () {

        cy.get(".card-header").its('length').should('eq', itemByPage);
        cy.get(".card-body").its('length').should('eq', itemByPage);
        cy.get(".card-footer").its('length').should('eq', itemByPage);
    });
    it('Add element', function () {
        cy.get('#movieTitle').type(testMovie + ' {enter}');
        cy.contains(testMovie).click();
        cy.contains(testMovie);
        cy.wait(500);
        cy.get("#" + testMovieId + " > .modal-dialog > .modal-content > .modal-header > .close > span").click();
    });
    it('delete Movie', function () {
        cy.get('#movieTitle').type(testMovie + ' {enter}');
        cy.contains(testMovie).click();
        cy.contains(testMovie);
        cy.wait(500);
        cy.get("#" + testMovieId + " > .modal-dialog > .modal-content > .modal-body > form > .float-right").click()
        cy.contains(testMovie).should('not')
    })
});
