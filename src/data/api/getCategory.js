export async function categories() {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}