import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        api.post('/login', { username, password })
            .then(res => {
                localStorage.setItem('authToken', res.data.token);
                alert('Login succeeded.');
                navigate('/products');
            })
            .catch(err => {
                console.error('Login error:', err);
                alert('Incorrect login data.');
            });
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: 40 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <TextField
                label="User name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                style={{ marginTop: 16 }}
            >
                Login
            </Button>
        </Container>
    );
};

export default Login;
