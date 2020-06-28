import { startOfWeek, endOfWeek } from 'date-fns';

/**
 * Gets the start and end date of the week a date is in.
 */
const getWeekFromDate = (date: Date) => {
    const dateStart = startOfWeek(date);
    const dateEnd = endOfWeek(date);

    return { dateStart, dateEnd };
};

export default getWeekFromDate;
