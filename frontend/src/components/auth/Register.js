import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        api.post('/register', { username, password })
            .then(() => {
                alert('Success, now please login.');
                navigate('/login');
            })
            .catch(err => {
                console.error('Register error:', err);
                alert('Register failed, please try again.');
            });
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: 40 }}>
            <Typography variant="h5" gutterBottom>
                Register
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
                onClick={handleRegister}
                style={{ marginTop: 16 }}
            >
                Register
            </Button>
            <Button
                variant="text"
                fullWidth
                onClick={() => navigate('/login')}
                style={{ marginTop: 8 }}
            >
                Already have an account? Log in
            </Button>
        </Container>
    );
};

export default Register;
