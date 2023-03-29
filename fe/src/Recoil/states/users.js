import { atom, selector } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null,
});

export const usersState = selector({
    key: 'usersState',
    get: ({ get }) => {
        const value = get(usersAtom);
        return value;
    },
    set: ({ set }, newValue) => {
        set(usersAtom, newValue);
    },
});

const currentUserAtom = atom({
    key: 'currentUser',
    default: null,
});

export const currentUserState = selector({
    key: 'currentUserState',
    get: ({ get }) => {
        const value = get(currentUserAtom);
        return value;
    },
    set: ({ set }, newValue) => {
        set(currentUserAtom, newValue);
    },
});

export { usersAtom, currentUserAtom };
