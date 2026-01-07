export async function authenticationJWT(email, password) {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log('Login response:', data);
            return null;
        }

        return data;

    } catch (err) {
        console.error('Request failed:', err.message);
        return null;
    }
}
