export async function getDataById(id) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products${id}`);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}