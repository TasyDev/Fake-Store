async function editUser(id, value = {}) {
    const userData = {
        id: id,
        email: value.email,
        password: value.password,
        name: value.name,
        role: value.role,
        avatar: value.avatar
    };

    try {
        const updatedUser = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!updatedUser.ok) {
            const errorText = await updatedUser.text();
            return console.error('Request failed:', errorText);
        }

        console.log("Éxito");
        return await updatedUser.json();
    } catch (err) {
        console.error('Request failed:', err.message);
        return null;
    }
}


