import store from '@/store/index.js';

export function getStoreToken() {
    return store.getters['auth/getToken'];
}

export function getLocalToken() {
    return localStorage.getItem('rtt') || null;
}

export function setLocalToken(value) {
    return localStorage.setItem('rtt', value);
}

export function removeLocalToken() {
    return localStorage.removeItem('rtt');
}

export function getLocalUser() {
    return JSON.parse(localStorage.getItem('rtu')) || null;
}

export function setLocalUser(value) {
    return localStorage.setItem('rtu', JSON.stringify(value));
}

export function removeLocalUser() {
    return localStorage.removeItem('rtu');
}



export function addDays(date, days) {
    var date = new Date(date.valueOf());
    date.setDate(date.getDate() + days);
    return new Date(date.setHours(0, 0, 0, 0));
};