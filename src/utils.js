export const checkResponse = response => {
    if (response.ok) {
        return response;
    }
    throw new Error('Error is either 404 or 500');
}

export const json = response => response.json();