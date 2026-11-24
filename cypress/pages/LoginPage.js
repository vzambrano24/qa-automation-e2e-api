
class LoginPage {

    selectors = {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]'
    };

    visit() {
        cy.visit('/');
    }

    enterUsername(username) {
        cy.get(this.selectors.username)
            .should('be.visible')
            .type(username);
    }

    enterPassword(password) {
        cy.get(this.selectors.password)
            .should('be.visible')
            .type(password, { log: false });
    }

    clickLogin() {
        cy.get(this.selectors.loginButton)
            .should('be.enabled')
            .click();
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default new LoginPage();
