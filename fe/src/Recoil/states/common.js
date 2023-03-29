import { atom, selector } from 'recoil';

const weekInMonthState = atom({
    key: 'weekInMonth',
    default: '',
});

export const newWeekInMonthState = selector({
    key: 'newWeekInMonthState',
    get: ({ get }) => {
        const value = get(weekInMonthState);
        return value;
    },
    set: ({ get, set }, newValue) => {
        const list = get(weekInMonthState);
        set(weekInMonthState, [...list, newValue]);
    },
});
