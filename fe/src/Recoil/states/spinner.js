import { atom } from 'recoil';

const spinnerAtom = atom({
    key: 'spinner',
    default: true,
});

export { spinnerAtom };
