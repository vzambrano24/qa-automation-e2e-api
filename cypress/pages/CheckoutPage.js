
class CheckoutPage {

    selectors = {
        title: '[data-test="title"]',
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        finishButton: '[data-test="finish"]',
        productName: '[data-test="inventory-item-name"]',
        productPrice: '[data-test="inventory-item-price"]',
        subtotal: '[data-test="subtotal-label"]',
        tax: '[data-test="tax-label"]',
        total: '[data-test="total-label"]'
    };

    verifyCheckoutPage() {
        cy.location('pathname')
            .should('eq', '/checkout-step-one.html');

        cy.get(this.selectors.title)
            .should('have.text', 'Checkout: Your Information');
    }

    fillCustomerInformation(customer) {

        cy.get(this.selectors.firstName)
            .should('be.visible')
            .type(customer.firstName);

        cy.get(this.selectors.lastName)
            .should('be.visible')
            .type(customer.lastName);

        cy.get(this.selectors.postalCode)
            .should('be.visible')
            .type(customer.postalCode);
    }

    clickContinue() {
        cy.get(this.selectors.continueButton)
            .should('be.enabled')
            .click();
    }

    verifyOverview(products) {

        cy.location('pathname')
            .should('eq', '/checkout-step-two.html');

        cy.get(this.selectors.title)
            .should('have.text', 'Checkout: Overview');

        cy.get(this.selectors.productName)
            .should('have.length', products.length);

        products.forEach(product => {

            cy.contains(
                this.selectors.productName,
                product.name
            ).should('be.visible');

        });
    }

    verifyTotals() {

        const getCents = text =>
            Math.round(Number(text.split('$').pop()) * 100);

        cy.get(this.selectors.productPrice).then($prices => {

            const expectedSubtotal = [...$prices].reduce(
                (sum, element) =>
                    sum + getCents(element.innerText),
                0
            );

            cy.get(this.selectors.subtotal)
                .invoke('text')
                .then(subtotalText => {

                    const subtotal = getCents(subtotalText);

                    expect(subtotal).to.equal(expectedSubtotal);

                    cy.get(this.selectors.tax)
                        .invoke('text')
                        .then(taxText => {

                            const tax = getCents(taxText);

                            cy.get(this.selectors.total)
                                .invoke('text')
                                .then(totalText => {

                                    const total = getCents(totalText);

                                    expect(total).to.equal(subtotal + tax);

                                });
                        });
                });
        });
    }

    finishPurchase() {
        cy.get(this.selectors.finishButton)
            .should('be.visible')
            .and('be.enabled')
            .click();
    }
}

export default new CheckoutPage();
