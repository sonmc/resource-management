import moment from 'moment';

export const calculatorWorkloadStatus = (workload) => {
    if (workload > 0 && workload < 50) {
        return '#06c706';
    } else if (workload >= 50 && workload < 90) {
        return '#ffb550';
    } else if (workload >= 90) {
        return '#ff0000';
    } else {
        return '#ffffff';
    }
};
export const formatTime = (time, format = 'YYYY-MM-DD') => {
    return moment(time).format(format);
};
