export function fetchSeats() {
    return fetch('http://localhost:3000/seats')
        .then((response) => response.json());
}