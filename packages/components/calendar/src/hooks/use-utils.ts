export const rangeArr = (n) => Array.from(Array.from({ length: n }).keys());

export const toNestedArr = (days) => {
    return rangeArr(
        days.length / 7
    ).map((index) => {
        const start = index * 7
        return days.slice(start, start + 7)
    })
}

export const isDate = (value) => {
    return value instanceof Date;
}

// date table

export const getPrevMonthLastDays = (date, count) => {
    const lastDay = date.subtract(1, 'month').endOf('month').date();
    return rangeArr(count).map((_, index) => lastDay - (count - index - 1));
}

export const getMonthDays = (date) => {
    const days = date.daysInMonth()
    return rangeArr(days).map((_, index) => index + 1)
}
