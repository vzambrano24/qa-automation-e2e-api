PROYECTO DE AUTOMATIZACIÓN DE PRUEBAS E2E Y API REST
SAUCEDEMO & SWAGGER PETSTORE

1. OBJETIVO

Automatizar el flujo funcional de compra de dos productos en la plataforma SauceDemo, validando desde la autenticación del usuario hasta la confirmación exitosa del pedido.

2. TECNOLOGÍAS UTILIZADAS

- Node.js v26.13.1
- NPM 11.20.0
- Cypress 16.3.0
- JavaScript
- Page Object Model (POM)
- Mochawesome Reporter
- Visual Studio Code
- Google Chrome
- Git

3. PRERREQUISITOS

- Tener instalado Node.js y NPM en versiones compatibles con Cypress.
- Tener instalado Google Chrome.
- Contar con conexión a Internet.
- Disponibilidad de la aplicación https://www.saucedemo.com/

4. INSTALACIÓN DEL PROYECTO

Abrir una terminal en la carpeta raíz del proyecto y ejecutar:

npm ci

Verificar la instalación de Cypress:

npx cypress verify

5. EJECUCIÓN DE LAS PRUEBAS

Para ejecutar las pruebas en modo interactivo:

npm run cy:open

Seleccionar E2E Testing, Google Chrome y el archivo purchase.cy.js.

Para ejecutar las pruebas en modo headless:

npm run test:e2e

6. ARQUITECTURA DEL PROYECTO

El proyecto implementa el patrón de diseño Page Object Model, separando los localizadores, acciones, datos y escenarios de prueba.

- cypress/pages: contiene los Page Objects.
- cypress/fixtures: contiene los datos de prueba en formato JSON.
- cypress/e2e/ui: contiene el escenario automatizado.
- cypress/support: contiene las configuraciones de soporte.
- cypress.config.js: contiene la configuración general de Cypress.

7. ESCENARIO AUTOMATIZADO

ID: E2E-001

Nombre: Compra exitosa de dos productos.

Flujo funcional:

- Autenticación con credenciales válidas.
- Selección de dos productos.
- Validación del contador del carrito.
- Visualización y validación de productos y cantidades.
- Registro de información del cliente.
- Validación del resumen de compra.
- Validación de la consistencia del subtotal, impuestos y total.
- Finalización de la compra.
- Validación del mensaje "Thank you for your order!".

8. REPORTES Y EVIDENCIAS

Las evidencias se generan automáticamente en las siguientes rutas:

- Reporte HTML: cypress/reports/index.html
- Capturas de pantalla: cypress/screenshots/
- Video de ejecución: cypress/videos/

Para visualizar el reporte, abrir el archivo index.html en un navegador.

9. BUENAS PRÁCTICAS

- Separación de responsabilidades mediante POM.
- Reutilización de métodos.
- Parametrización de datos de prueba.
- Uso de localizadores mediante atributos data-test.
- Aserciones funcionales en cada etapa.
- Uso de esperas y reintentos nativos de Cypress.
- Generación automática de evidencias.
- Aislamiento de pruebas.

10. CONSIDERACIONES

El proyecto utiliza datos ficticios y credenciales públicas de demostración. La ejecución depende de la disponibilidad de la aplicación SauceDemo.
11. AUTOMATIZACIÓN DE SERVICIOS REST – SWAGGER PETSTORE

OBJETIVO

Automatizar y validar el ciclo de vida de un usuario mediante los servicios REST proporcionados por Swagger Petstore.

URL de documentación:
https://petstore.swagger.io/

URL base de servicios:
https://petstore.swagger.io/v2

12. ARQUITECTURA DE AUTOMATIZACIÓN API

Se implementó el patrón Service Object Model para separar la comunicación con los servicios REST de la lógica de los escenarios de prueba.

- cypress/services/UserService.js: centraliza las solicitudes HTTP.
- cypress/fixtures/userData.json: contiene los datos de prueba.
- cypress/e2e/api/user.cy.js: contiene el escenario automatizado.
- cypress/utils/EvidenceUtils.js: administra la generación de evidencias y el enmascaramiento de contraseñas.
- cypress/evidence/api/: contiene las solicitudes y respuestas en formato JSON.

13. ESCENARIOS Y VALIDACIONES API

API-001: Crear un usuario mediante POST.
Resultado esperado: HTTP 200.

API-002: Consultar el usuario creado mediante GET.
Resultado esperado: HTTP 200 y coincidencia de los datos registrados.

API-003: Actualizar el nombre y correo electrónico mediante PUT.
Resultado esperado: HTTP 200.

API-004: Consultar el usuario actualizado mediante GET.
Resultado esperado: HTTP 200 y coincidencia de los datos modificados.

API-005: Eliminar el usuario mediante DELETE.
Resultado esperado: HTTP 200.

API-006: Verificar la eliminación mediante GET.
Resultado esperado: HTTP 404.

Las seis operaciones se ejecutan dentro de un escenario integral de ciclo de vida del usuario.

14. EJECUCIÓN DE PRUEBAS API

Para ejecutar únicamente la automatización de servicios REST:

npm run test:api

Para ejecutar conjuntamente las pruebas E2E y API:

npm run test:all

Para ejecutar las pruebas de manera interactiva:

npm run cy:open

Seleccionar el archivo user.cy.js para APIs o purchase.cy.js para E2E.

15. EVIDENCIAS DE SERVICIOS REST

Cada operación genera un archivo JSON que contiene:

- Fecha y hora de ejecución.
- Método HTTP.
- URL del servicio.
- Datos de entrada.
- Código de respuesta HTTP.
- Tiempo de respuesta en milisegundos.
- Cuerpo de la respuesta.

Las contraseñas se enmascaran en los archivos JSON de evidencias.

16. BUENAS PRÁCTICAS DE AUTOMATIZACIÓN API

- Separación de responsabilidades.
- Reutilización de servicios REST.
- Generación dinámica de identificadores y nombres de usuario.
- Parametrización de datos de prueba.
- Validación de códigos HTTP.
- Validación del contenido de las respuestas.
- Limpieza de datos mediante afterEach.
- Captura automática de evidencias.
- Validación de persistencia y eliminación de información.

17. CONSIDERACIONES GENERALES

El proyecto integra la automatización funcional E2E y la automatización de servicios REST en un único framework Cypress.

La ejecución depende de la disponibilidad de los ambientes públicos SauceDemo y Swagger Petstore. Se utilizan datos de prueba ficticios.