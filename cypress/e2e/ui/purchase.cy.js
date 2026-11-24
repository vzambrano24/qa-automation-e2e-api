
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import ConfirmationPage from '../../pages/ConfirmationPage';

describe('E2E - Flujo de compra SauceDemo', () => {

    beforeEach(function () {

        cy.fixture('purchaseData').as('testData');

        LoginPage.visit();

    });

    it('E2E-001 - Compra exitosa de dos productos',
        function () {

            const data = this.testData;

            // PASO 1: Autenticación

            cy.log('Paso 1: Autenticación');

            LoginPage.login(
                data.user.username,
                data.user.password
            );

            InventoryPage.verifyInventoryPage();

            cy.screenshot('01-login-exitoso');

            // PASO 2: Agregar productos

            cy.log('Paso 2: Agregar productos');

            data.products.forEach(product => {
                InventoryPage.addProduct(product.id);
            });

            InventoryPage.verifyCartCount(
                data.products.length
            );

            cy.screenshot('02-productos-agregados');

            // PASO 3: Validar carrito

            cy.log('Paso 3: Validar carrito');

            InventoryPage.openCart();

            CartPage.verifyCartPage();

            CartPage.verifyProducts(data.products);

            cy.screenshot('03-carrito-validado');

            // PASO 4: Completar formulario

            cy.log('Paso 4: Completar formulario');

            CartPage.clickCheckout();

            CheckoutPage.verifyCheckoutPage();

            CheckoutPage.fillCustomerInformation(
                data.customer
            );

            cy.screenshot('04-formulario-completado');

            CheckoutPage.clickContinue();

            // PASO 5: Validar resumen

            cy.log('Paso 5: Validar resumen de compra');

            CheckoutPage.verifyOverview(data.products);

            CheckoutPage.verifyTotals();

            cy.screenshot('05-resumen-validado');

            // PASO 6: Finalizar compra

            cy.log('Paso 6: Finalizar compra');

            CheckoutPage.finishPurchase();

            ConfirmationPage.verifySuccessfulPurchase(
                data.expected.confirmationMessage
            );

            cy.screenshot('06-compra-exitosa');

        });
});
