async function authenticationJWT(email, password) {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            throw new Error('Login failed');
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error(err);
        return null;
    }
}