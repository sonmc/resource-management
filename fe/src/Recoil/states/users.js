import { atom, selector } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null,
});
const currentUserAtom = atom({
    key: 'currentUser',
    default: {},
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

export { usersAtom, currentUserAtom };
