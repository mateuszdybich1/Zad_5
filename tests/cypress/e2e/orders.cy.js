describe('Orders API', () => {
    const username = `user_${Math.floor(Math.random() * 10000)}`;
    const password = 'test123';
    let token = '';
    let productId = '';
    let secondProductId = '';

    before(() => {
        cy.request('POST', '/register', { username, password }).then(() => {
            cy.request('POST', '/login', { username, password }).then((resp) => {
                token = resp.body.token;

                cy.request({
                    method: 'POST',
                    url: '/products',
                    headers: { Authorization: `Bearer ${token}` },
                    body: { name: 'Juice' }
                }).then(() => {
                    cy.request('GET', '/products').then((resp) => {
                        const juice = resp.body.find(p => p.name === 'Juice');
                        productId = juice.id;

                        cy.request({
                            method: 'POST',
                            url: '/products',
                            headers: { Authorization: `Bearer ${token}` },
                            body: { name: 'Water' }
                        }).then(() => {
                            cy.request('GET', '/products').then((resp) => {
                                const water = resp.body.find(p => p.name === 'Water');
                                secondProductId = water.id;
                            });
                        });
                    });
                });
            });
        });
    });

    it('Should create a new order with valid product and token', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: { items: [{ id: productId, quantity: 2 }] }
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.have.property('orderId');
        });
    });

    it('Should not create order without token', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            body: { items: [{ id: productId, quantity: 1 }] },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(401);
        });
    });

    it('Should not create order with non-existent product', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: { items: [{ id: '00000000-0000-0000-0000-000000000000', quantity: 1 }] },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });

    it('Should not create order with empty items array', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: { items: [] },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });

    it('Should not create order with zero quantity', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: { items: [{ id: productId, quantity: 0 }] },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });

    it('Should not create order with negative quantity', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: { items: [{ id: productId, quantity: -1 }] },
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });

    it('Should create order with multiple products', () => {
        cy.request({
            method: 'POST',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                items: [
                    { id: productId, quantity: 1 },
                    { id: secondProductId, quantity: 2 }
                ]
            }
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.have.property('orderId');
        });
    });
});
