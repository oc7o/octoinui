import { browser } from '$app/env';
import { writable } from "svelte/store";


interface AuthStore {
    token: string | null;
    loggedIn: boolean;
}

var storedAuth = {loggedIn: false, token: null};
if (browser && window.localStorage.getItem('auth')) {
    
    storedAuth = JSON.parse(window.localStorage.getItem('auth') as string);
}

export const authStore = writable<AuthStore>(storedAuth);
authStore.subscribe(value => {
    if (browser) {
            
        window.localStorage.setItem("auth", value !== undefined ? JSON.stringify(value) : JSON.stringify({loggedIn: false, token: null}));
    }
});