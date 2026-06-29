const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE = "/api/v1";

// Funzione base per gestire le richieste
async function request(endpoint, options = {}) {
    
    // Options.credentials include dice al browser di inviare e ricevere i cookies
    options.credentials = "include";

    const token = localStorage.getItem("accessToken");

    options.headers = { 
        "Content-Type": "application/json", 
        ...options.headers,
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    if (endpoint === "/auth/refresh") {
        options.credentials = "include";
    }

    const fullUrl = `${API_BASE_URL}${API_BASE}${endpoint}`;

    let res = await fetch(fullUrl, options);

    // Se il server ci dice che l'Access Token è scaduto (401) e non stiamo facendo ne login ne il refresh in background
    if (res.status === 401 && endpoint !== "/auth/login" && endpoint !== "/auth/refresh") {
        try {

            const refreshUrl = `${API_BASE_URL}${API_BASE}/auth/refresh`;

            // Proviamo a vedere se possiamo fare il refresh dell'access token
            const refreshRes = await fetch(refreshUrl, { 
                method: "POST", 
                credentials: "include" 
            });
            
            if (!refreshRes.ok) throw new Error("Sessione scaduta");

            const data = await refreshRes.json();
            localStorage.setItem("accessToken", data.accessToken);
            options.headers["Authorization"] = `Bearer ${data.accessToken}`;

            // Se il refresh ha successo viene ripristinato l'access token, riproviamo la chiamata originale
            res = await fetch(fullUrl, options);
        } catch (err) {
            // Se il refresh fallisce, forziamo il logout visivo
            localStorage.removeItem("accessToken");
            window.location.href = "/"; // Rimanda alla pagina di avvio
            throw new Error("Sessione scaduta, effettua nuovamente l'accesso.");
        }
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Errore del server");
    return data;
}

// Rotte di autenticazione
export async function login(email, password) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function register(username, email, password) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });
}

export async function logout() {
    // Chiamata al backend per invalidare il refresh token nel DB e nel cookie
    return request("/auth/logout", {
        method: "POST"
    });
}


//Rotte dei libri
export async function getBooks(){
    return request("/books",{
        method: "GET"

    })
}

export async function getFavorites(){
    return request("/books/biblioteca", {
        method: "GET"
    })
}

export async function toggleFavorite(bookId) {
    return request(`/books/${bookId}/favorite`, {
        method: "POST",
        body: JSON.stringify({ bookId }) //forse ridondante
    });
}

//Rotte dell'utente
export async function getInfoUser(){
    return request('/users', {
        method: "GET"
    })
}

export async function modifyUser(datiModificati){
    return request(`/users/profile`, {
        method: "PUT",
        body: JSON.stringify(datiModificati)
    })
}

//Rotte delle reviews
export async function getReviews(bookId){
    return request(`/books/${bookId}/reviews`);
}

export async function createReviews(bookId, reviewData) {
    return request(`/books/${bookId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData) 
    });
}

export async function deleteReviews(bookId,reviewId){
    return request (`/books/${bookId}/reviews/${reviewId}`,{
        method: "DELETE"
    })
}

