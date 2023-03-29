import { selector, atom } from 'recoil';

export const rolesAtom = atom({
    key: 'rolesAtom',
    default: [],
});

export const rolesState = selector({
    key: 'rolesState',
    get: ({ get }) => {
        const value = get(rolesAtom);
        return value;
    },
    set: ({ set }, newValue) => {
        set(rolesAtom, newValue);
    },
});
