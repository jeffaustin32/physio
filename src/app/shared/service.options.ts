import { Headers } from '@angular/http';

export const BASE_URL: string = 'http://localhost:3000/api';

// Create an Authorization header to allow access to secured server endpoints
export function createAuthorizationHeader(): Headers {
    let token: string = JSON.parse(localStorage.getItem('token'));
    let header = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return header;
}