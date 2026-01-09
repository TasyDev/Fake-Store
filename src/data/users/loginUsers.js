import { authenticationJWT } from "./authenticationJWT.js";

export async function loginUsers(email, password) {
    try {
        const jwt = await authenticationJWT(email, password);

        if (!jwt || !jwt.access_token) {
            console.log('Login failed');
            return null;
        }

        const login = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.access_token}`
            }
        });

        const user = await login.json();
        return user;

    } catch (err) {
        console.error('Request failed:', err.message);
        return null;
    }
}

