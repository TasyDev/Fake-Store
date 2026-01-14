export async function createUser(name, email, password) {
    try {
        await newUser(name, email, password)
    } catch (err) {
        console.error('Request failed:', err.message)

    }
}

async function newUser(name, email, password) {
    const res = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            password,
            avatar: "https://picsum.photos/800"
        })
    })
    const data = await res.json()
    if (!res.ok) {
        console.error(data)
        throw new Error('Error creating user')
    }
    return console.log(data)
}