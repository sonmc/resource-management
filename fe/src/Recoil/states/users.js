import { atom, selector } from 'recoil';

const currentUserAtom = atom({
    key: 'currentUser',
    default: {},
});

export { currentUserAtom };
