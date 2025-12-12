export async function getData() {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}