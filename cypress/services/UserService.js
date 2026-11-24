
class UserService {

    baseUrl = 'https://petstore.swagger.io/v2';

    createUser(user) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/user`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: user,
            failOnStatusCode: false
        });
    }

    getUser(username) {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}/user/${encodeURIComponent(username)}`,
            headers: {
                'Accept': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    updateUser(username, user) {
        return cy.request({
            method: 'PUT',
            url: `${this.baseUrl}/user/${encodeURIComponent(username)}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: user,
            failOnStatusCode: false
        });
    }

    deleteUser(username) {
        return cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/user/${encodeURIComponent(username)}`,
            headers: {
                'Accept': 'application/json'
            },
            failOnStatusCode: false
        });
    }
}

export default new UserService();
