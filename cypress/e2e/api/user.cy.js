
import UserService from '../../services/UserService';
import EvidenceUtils from '../../utils/EvidenceUtils';

describe('API - Gestion de usuarios Petstore', () => {

    let user;
    let updatedUser;
    let userCreated;

    beforeEach(() => {

        userCreated = false;

        cy.fixture('userData').then(data => {

            const uniqueId = Date.now();
            const username = `qa_user_${uniqueId}`;

            user = {
                id: uniqueId,
                username: username,
                ...data.user,
                email: `${username}@example.com`
            };

            updatedUser = {
                ...user,
                ...data.updatedUser
            };

        });
    });

    it('API-001 a API-006 - Ciclo de vida del usuario', () => {

        const baseUrl = UserService.baseUrl;
        const userUrl = `${baseUrl}/user/${user.username}`;

        // API-001: CREAR USUARIO

        cy.log('API-001 - Crear usuario');

        UserService.createUser(user).then(response => {

            userCreated = response.status === 200;

            EvidenceUtils.saveResponse(
                'API-001-crear-usuario',
                'POST',
                `${baseUrl}/user`,
                user,
                response
            );

            expect(response.status).to.eq(200);

            expect(response.body.code).to.eq(200);

        });

        // API-002: CONSULTAR USUARIO

        cy.log('API-002 - Consultar usuario creado');

        UserService.getUser(user.username).then(response => {

            EvidenceUtils.saveResponse(
                'API-002-consultar-usuario',
                'GET',
                userUrl,
                null,
                response
            );

            expect(response.status).to.eq(200);

            expect(response.body.id).to.eq(user.id);

            expect(response.body.username).to.eq(user.username);

            expect(response.body.firstName).to.eq(user.firstName);

            expect(response.body.lastName).to.eq(user.lastName);

            expect(response.body.email).to.eq(user.email);

        });

        // API-003: ACTUALIZAR USUARIO

        cy.log('API-003 - Actualizar usuario');

        UserService.updateUser(
            user.username,
            updatedUser
        ).then(response => {

            EvidenceUtils.saveResponse(
                'API-003-actualizar-usuario',
                'PUT',
                userUrl,
                updatedUser,
                response
            );

            expect(response.status).to.eq(200);

            expect(response.body.code).to.eq(200);

        });

        // API-004: CONSULTAR USUARIO ACTUALIZADO

        cy.log('API-004 - Consultar usuario actualizado');

        UserService.getUser(user.username).then(response => {

            EvidenceUtils.saveResponse(
                'API-004-consultar-usuario-actualizado',
                'GET',
                userUrl,
                null,
                response
            );

            expect(response.status).to.eq(200);

            expect(response.body.id).to.eq(user.id);

            expect(response.body.username).to.eq(user.username);

            expect(response.body.firstName)
                .to.eq(updatedUser.firstName);

            expect(response.body.email)
                .to.eq(updatedUser.email);

            expect(response.body.lastName)
                .to.eq(user.lastName);

            expect(response.body.firstName)
                .not.to.eq(user.firstName);

            expect(response.body.email)
                .not.to.eq(user.email);

        });

        // API-005: ELIMINAR USUARIO

        cy.log('API-005 - Eliminar usuario');

        UserService.deleteUser(user.username).then(response => {

            if (response.status === 200) {
                userCreated = false;
            }

            EvidenceUtils.saveResponse(
                'API-005-eliminar-usuario',
                'DELETE',
                userUrl,
                null,
                response
            );

            expect(response.status).to.eq(200);

        });

        // API-006: VERIFICAR ELIMINACION

        cy.log('API-006 - Verificar usuario eliminado');

        UserService.getUser(user.username).then(response => {

            EvidenceUtils.saveResponse(
                'API-006-verificar-eliminacion',
                'GET',
                userUrl,
                null,
                response
            );

            expect(response.status).to.eq(404);

        });

    });

    afterEach(() => {

        if (userCreated && user) {

            UserService.deleteUser(user.username).then(response => {

                expect(response.status)
                    .to.be.oneOf([200, 404]);

            });
        }
    });
});
