const API_BASE = "/api/v1";

// Funzione base per gestire le richieste
async function request(endpoint, options = {}) {
    
    // Options.credentials include dice al browser di inviare e ricevere i cookies
    options.credentials = "include";
    options.headers = { "Content-Type": "application/json", ...options.headers };

    let res = await fetch(`${API_BASE}${endpoint}`, options);

    // Se il server ci dice che l'Access Token è scaduto (401) e non stiamo facendo ne login ne il refresh in background
    if (res.status === 401 && endpoint !== "/auth/login" && endpoint !== "/auth/refresh") {
        try {
            // Proviamo a vedere se possiamo fare il refresh dell'access token
            const refreshRes = await fetch(`${API_BASE}/auth/refresh`, { 
                method: "POST", 
                credentials: "include" 
            });
            
            if (!refreshRes.ok) throw new Error("Sessione scaduta");

            // Se il refresh ha successo viene ripristinato l'access token, riproviamo la chiamata originale
            res = await fetch(`${API_BASE}${endpoint}`, options);
        } catch (err) {
            // Se il refresh fallisce, forziamo il logout visivo
            localStorage.removeItem("liber_user");
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

