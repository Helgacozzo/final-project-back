// Funzione per creare un oggetto di errore con uno stato specifico
export const StatusError = (code, msg) => {
    const error = new Error(msg); // Creazione di un nuovo oggetto di errore
    error.statusCode = code; // Impostazione del codice dell'errore
    return error; 
}

// Funzione per gestire gli errori di risposta
export const handleResponseError = (res, error) => {
    console.error(error);
    const code = error.statusCode || 500; // Ottenimento del codice di stato dell'errore o impostazione a 500 se non specificato
    res.status(code).send(code !== 500 ? error.message : "Server Error");
}
