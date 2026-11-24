
class CartPage {

    selectors = {
        title: '[data-test="title"]',
        cartItem: '[data-test="inventory-item"]',
        productName: '[data-test="inventory-item-name"]',
        quantity: '[data-test="item-quantity"]',
        checkoutButton: '[data-test="checkout"]'
    };

    verifyCartPage() {
        cy.location('pathname')
            .should('eq', '/cart.html');

        cy.get(this.selectors.title)
            .should('be.visible')
            .and('have.text', 'Your Cart');
    }

    verifyProducts(products) {

        cy.get(this.selectors.cartItem)
            .should('have.length', products.length);

        products.forEach(product => {

            cy.contains(
                this.selectors.productName,
                product.name
            ).should('be.visible');

        });

        cy.get(this.selectors.quantity)
            .should('have.length', products.length)
            .each($quantity => {
                cy.wrap($quantity)
                    .should('have.text', '1');
            });
    }

    clickCheckout() {
        cy.get(this.selectors.checkoutButton)
            .should('be.visible')
            .and('be.enabled')
            .click();
    }
}

export default new CartPage();
