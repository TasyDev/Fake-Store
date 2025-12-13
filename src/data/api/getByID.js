export async function getDataById(slug) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}

export async function getDataBySearch(title) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}