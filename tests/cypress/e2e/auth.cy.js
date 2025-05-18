describe('Authentication API', () => {
    const username = `user_${Math.floor(Math.random() * 10000)}`;
    const password = 'test123';
    let token = '';

    it('Should register a new user successfully', () => {
        cy.request('POST', '/register', { username, password }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.include('registered');
            expect(resp.body).to.be.a('string');
            expect(resp.body.length).to.be.greaterThan(5);
        });
    });

    it('Should not allow registering an existing user', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { username, password },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).to.exist;
            expect(resp.body).to.be.a('string');
        });
    });

    it('Should login with valid credentials', () => {
        cy.request('POST', '/login', { username, password }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.have.property('token');
            token = resp.body.token;
            expect(token.length).to.be.greaterThan(10);
            expect(resp.body.token).to.be.a('string');
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
            expect(resp.body).to.exist;
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
            expect(resp.body).to.exist;
        });
    });

    it('Should not register without username', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { username: '', password: 'x' },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).to.exist;
        });
    });

    it('Should not register without password', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: { username: 'x', password: '' },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).to.exist;
        });
    });

    it('Should not login with empty body', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {},
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });
});
