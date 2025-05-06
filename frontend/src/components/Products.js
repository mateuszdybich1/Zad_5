import React, { useState, useEffect } from 'react';
import api from '../api';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const Products = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <List>
                {products.map(prod => (
                    <ListItem key={prod.id} divider>
                        <ListItemText
                            primary={prod.name}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onAddToCart({ id: prod.id, name: prod.name })}
                        >
                            Add to cart
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Products;
