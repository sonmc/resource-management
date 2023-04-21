import { atom, selector } from 'recoil';

const notificationAtom = atom({
    key: 'notifications',
    default: [],
});

export { notificationAtom };
