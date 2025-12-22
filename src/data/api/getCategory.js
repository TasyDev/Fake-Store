/* How to call
- await categories()

*/

export async function categories() {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories/?&limit=6&offset=6");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}

