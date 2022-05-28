export const checkResponse = response => {
    if (response.ok) {
        // .ok returns true if status os 200 - 299
        return response;
    }
    throw new Error('Error is either 404 or 500');
}

export const json = response => response.json();