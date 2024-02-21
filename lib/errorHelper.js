// Funzione per creare un nuovo oggetto di errore con uno stato HTTP specifico
export const StatusError = (code, msg) => {
    const error = new Error(msg); // Creazione di un nuovo oggetto di errore con il messaggio specificato
    error.statusCode = code; // Impostazione del codice di stato HTTP nell'oggetto di errore
    return error;
}

// Funzione per gestire gli errori nelle risposte HTTP
export const handleResponseError = (res, error) => {
    console.error(error);
    const code = error.statusCode || 500; // Ottiene il codice di stato HTTP dall'oggetto di errore, se presente, altrimenti utilizza il codice di stato predefinito 500
    res.status(code); // Imposta lo stato della risposta sulla base del codice di stato HTTP dell'errore
    res.send(code !== 500 ? error.message : "Server Error"); // Invia una risposta con il messaggio di errore corrispondente
                                                             // Se il codice di stato HTTP non è 500, utilizza il messaggio di errore dell'errore stesso
                                                             // Altrimenti, invia un messaggio di errore generico "Server Error"
}
