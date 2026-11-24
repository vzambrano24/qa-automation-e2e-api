
class ConfirmationPage {

    selectors = {
        title: '[data-test="title"]',
        confirmationHeader: '[data-test="complete-header"]',
        confirmationText: '[data-test="complete-text"]',
        backHomeButton: '[data-test="back-to-products"]'
    };

    verifySuccessfulPurchase(expectedMessage) {

        cy.location('pathname')
            .should('eq', '/checkout-complete.html');

        cy.get(this.selectors.title)
            .should('have.text', 'Checkout: Complete!');

        cy.get(this.selectors.confirmationHeader)
            .should('be.visible')
            .and('have.text', expectedMessage);

        cy.get(this.selectors.confirmationText)
            .should('be.visible');

        cy.get(this.selectors.backHomeButton)
            .should('be.visible');
    }
}

export default new ConfirmationPage();
