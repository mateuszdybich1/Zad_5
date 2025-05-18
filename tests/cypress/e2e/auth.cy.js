describe('Authentication API', () => {
    const username = `user_${Math.floor(Math.random() * 10000)}`;
    const password = 'test123';
    let token = '';

    it('Should register a new user successfully', () => {
        cy.request('POST', '/register', { username, password }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.include('registered');
        });
    });

    it('Should not allow registering an existing user', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { username, password },
            failOnStatusCode: false
        }).then((resp) => {
            expect([400, 409, 500]).to.include(resp.status);
        });
    });

    it('Should login with valid credentials', () => {
        cy.request('POST', '/login', { username, password }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.have.property('token');
            token = resp.body.token;
            expect(token.length).to.be.greaterThan(10);
        });
    });

    it('Should not login with invalid password', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: { username, password: 'wrongpass' },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(401);
        });
    });

    it('Should not login with non-existent user', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: { username: 'ghost_user', password: 'nopass' },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(401);
        });
    });

    it('Should not register without username', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { password: 'x' },
            failOnStatusCode: false
        }).then((resp) => {
            expect([400, 422, 500]).to.include(resp.status);
        });
    });

    it('Should not register without password', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { username: 'xx' },
            failOnStatusCode: false
        }).then((resp) => {
            expect([400, 422, 500]).to.include(resp.status);
        });
    });

    it('Should not login with empty body', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {},
            failOnStatusCode: false
        }).then((resp) => {
            expect([400, 422, 500]).to.include(resp.status);
        });
    });
});
