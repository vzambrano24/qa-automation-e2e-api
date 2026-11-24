
class InventoryPage {

    selectors = {
        title: '[data-test="title"]',
        cartLink: '[data-test="shopping-cart-link"]',
        cartBadge: '[data-test="shopping-cart-badge"]'
    };

    verifyInventoryPage() {
        cy.location('pathname')
            .should('eq', '/inventory.html');

        cy.get(this.selectors.title)
            .should('be.visible')
            .and('have.text', 'Products');
    }

    addProduct(productId) {
        cy.get(`[data-test="add-to-cart-${productId}"]`)
            .should('be.visible')
            .and('be.enabled')
            .click();
    }

    verifyCartCount(quantity) {
        cy.get(this.selectors.cartBadge)
            .should('be.visible')
            .and('have.text', String(quantity));
    }

    openCart() {
        cy.get(this.selectors.cartLink)
            .should('be.visible')
            .click();
    }
}

export default new InventoryPage();
