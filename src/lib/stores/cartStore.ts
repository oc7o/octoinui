import { browser } from '$app/env';
import { writable } from "svelte/store";


interface CartStore {
    items: Object;
}

var storedCart = {items: {}};
if (browser && window.localStorage.getItem('cart')) {
    storedCart = JSON.parse(window.localStorage.getItem('cart') as string);
}

export const cartStore = writable<CartStore>(storedCart);
cartStore.subscribe(value => {
    if (browser) {
        window.localStorage.setItem("cart", value !== undefined ? JSON.stringify(value) : JSON.stringify({items: {}}));
    }
});

export const addToCart = (item: string) => {
    cartStore.update((cart) => {
        cart.items[item] = cart.items[item] ? cart.items[item] + 1 : 1;
        return cart;
    });
}