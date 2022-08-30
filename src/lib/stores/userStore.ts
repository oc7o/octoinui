import { writable } from 'svelte/store';

interface UserStore {
    username: string;
    isStaff: boolean;
    isActive: boolean;
    isSuperuser: boolean;
    archived: boolean;
    verified: boolean;
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    dateJoined: string;
    lastLogin: string;
}

export const userStore = writable<UserStore | null>(null);

