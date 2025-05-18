describe('Products API', () => {
    const username = `user_${Math.floor(Math.random() * 10000)}`;
    const password = 'test123';
    let token = '';

    before(() => {
        cy.request('POST', '/register', { username, password });
        cy.request('POST', '/login', { username, password }).then((resp) => {
            token = resp.body.token;
            cy.log(token);
        });

    });

    it('Should get products (could be empty)', () => {
        cy.request('GET', '/products').then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.be.an('array');
        });
    });

    it('Should add a product with valid token', () => {
        cy.request({
            method: 'POST',
            url: '/products',
            headers: { Authorization: `Bearer ${token}` },
            body: { name: 'Milk' }
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.include('Product added');
        });
    });

    it('Should not add a product without a token', () => {
        cy.request({
            method: 'POST',
            url: '/products',
            body: { name: 'Bread' },
            failOnStatusCode: false
        }).then((resp) => {
            expect([401, 403]).to.include(resp.status);
        });
    });

    it('Should not add a product with an empty name', () => {
        cy.request({
            method: 'POST',
            url: '/products',
            headers: { Authorization: `Bearer ${token}` },
            body: { name: '' },
            failOnStatusCode: false
        }).then((resp) => {
            expect([400, 422, 500]).to.include(resp.status);
        });
    });

    it('Should get products and find Milk', () => {
        cy.request('GET', '/products').then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.be.an('array');
            expect(resp.body.length).to.be.greaterThan(0);
            const milk = resp.body.find(p => p.name === 'Milk');
            expect(milk).to.exist;
            expect(milk).to.have.property('id');
        });
    });

    it('Should add another product and find it', () => {
        cy.request({
            method: 'POST',
            url: '/products',
            headers: { Authorization: `Bearer ${token}` },
            body: { name: 'Butter' }
        }).then((resp) => {
            expect(resp.status).to.eq(201);
        });

        cy.request('GET', '/products').then((resp) => {
            const butter = resp.body.find(p => p.name === 'Butter');
            expect(butter).to.exist;
            expect(butter).to.have.property('id');
        });
    });
});
