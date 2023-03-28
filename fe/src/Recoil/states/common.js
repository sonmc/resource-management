import { atom, selector } from 'recoil';

const weekInMonthState = atom({
    key: 'currentWorkloadMonth',
    default: '',
});

export const newWeekInMonthState = selector({
    key: 'newWeekInMonthState',
    get: ({ get }) => {
        const value = get(weekInMonthState);
        return value;
    },
    set: ({ set }, newValue) => {
        set(weekInMonthState, newValue);
    },
});
