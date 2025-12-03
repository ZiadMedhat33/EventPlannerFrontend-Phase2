export async function login(email, password) {
    try {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Login failed, Error code: ${res.status}`);
        }
        localStorage.setItem("Authorization", data.data.token);
        console.log("Login successful" + data)
        return data.data.token;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
export async function logout() {
    localStorage.removeItem("Authorization");
}