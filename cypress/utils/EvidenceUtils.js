
class EvidenceUtils {

    sanitize(data) {

        if (Array.isArray(data)) {
            return data.map(item => this.sanitize(item));
        }

        if (data !== null && typeof data === 'object') {

            return Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    key,
                    key.toLowerCase() === 'password'
                        ? '********'
                        : this.sanitize(value)
                ])
            );
        }

        return data;
    }

    saveResponse(fileName, method, url, request, response) {

        const evidence = {

            executionDate: new Date().toISOString(),

            request: {
                method: method,
                url: url,
                body: this.sanitize(request)
            },

            response: {
                status: response.status,
                durationMs: response.duration,
                body: this.sanitize(response.body)
            }
        };

        return cy.writeFile(
            `cypress/evidence/api/${fileName}.json`,
            evidence,
            { log: false }
        );
    }
}

export default new EvidenceUtils();
