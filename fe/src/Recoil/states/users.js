import { atom } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null,
});

const userAtom = atom({
    key: 'user',
    default: null,
});

const currentUserAtom = atom({
    key: 'currentUser',
    default: null,
});
export { usersAtom, userAtom, currentUserAtom };
