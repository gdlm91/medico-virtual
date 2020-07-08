import React, { useMemo } from 'react';
import { eachDayOfInterval, format } from 'date-fns';

import { Appointment } from '../types';
import styles from './AgendaEntries.module.css';
import getWeekFromDate from '../hooks/utils/getWeekFromDate';
import moment, { Moment } from 'moment';
import { Tag } from 'antd';

type Timetable = string[];

const generateTimetable = (fromTime: string, toTime: string) => {
    const times: Timetable = [];
    const interval = 30; // slots of 30 minutes

    const [fromTimeHour, fromTimeMin] = fromTime.split(':').map(Number);
    const [toTimeHour, toTimeMin] = toTime.split(':').map(Number);

    const fromTimeInMinutes = fromTimeHour * 60 + fromTimeMin;
    const toTimeInMinutes = toTimeHour * 60 + toTimeMin;

    for (
        let countInMinutes = fromTimeInMinutes;
        countInMinutes <= toTimeInMinutes;
        countInMinutes = countInMinutes + interval
    ) {
        const timeHour = Math.floor(countInMinutes / 60);
        const timeMinutes = countInMinutes % 60;
        times.push(`${String(timeHour).padStart(2, '0')}:${String(timeMinutes).padStart(2, '0')}`);
    }

    return times;
};

interface EntryProps {
    date: Moment;
    entries: Appointment[];
    timetable: Timetable;
}

const DayEntry: React.FC<EntryProps> = ({ date, entries, timetable }) => {
    const groupedEntreis = useMemo(
        () =>
            timetable.map((time) => ({
                time,
                entries: entries.filter((entry) => entry.time === time),
            })),
        [entries, timetable],
    );

    return (
        <>
            <div className={styles.agendaHeader}>
                <h4>
                    <span className={styles.agendaDate}>{date.format('DD')}</span> {date.localeData().weekdays(date)}
                </h4>
            </div>
            {groupedEntreis.map((group, index) => (
                <div
                    key={group.time}
                    className={`${styles.agendaSlot} ${
                        index === groupedEntreis.length - 1 ? styles.agendaLastSlot : ''
                    }`}
                >
                    {group.entries.map((entry) => (
                        <Tag className={styles.agendaItem} key={entry.$key} title={entry.name}>
                            {entry.name}
                        </Tag>
                    ))}
                </div>
            ))}
        </>
    );
};

const WeekEntry: React.FC<EntryProps> = ({ date, entries, timetable }) => {
    const { dateStart, dateEnd } = useMemo(() => getWeekFromDate(date.toDate()), [date]);
    const datesOfWeek = useMemo(() => eachDayOfInterval({ start: dateStart, end: dateEnd }), [dateStart, dateEnd]);
    const groupedEntries = useMemo(
        () =>
            datesOfWeek.map((dateOfWeek) => ({
                date: moment(dateOfWeek),
                entries: entries.filter((entry) => entry.date === format(dateOfWeek, 'dd/MM/yyyy')),
            })),
        [datesOfWeek],
    );

    return (
        <>
            {groupedEntries.map((entry, index) => (
                <DayEntry key={index} date={entry.date} entries={entry.entries} timetable={timetable} />
            ))}
        </>
    );
};

interface AgendaEntriesProps {
    date: Moment;
    entries: Appointment[];
    mode?: string;
}

const AgendaEntries: React.FC<AgendaEntriesProps> = ({ date, entries, mode = 'day' }) => {
    const timetable = useMemo(() => generateTimetable('08:00', '17:00'), []);
    const gridRowCount = useMemo(
        () => ({
            gridTemplateRows: `repeat(${timetable.length + 1}, auto)`,
        }),
        [],
    );

    return (
        <div className={`${styles.agenda} ${styles[mode]}`} style={gridRowCount}>
            <div className={styles.agendaHeader}></div>
            {timetable.map((time, index) => (
                <div
                    className={`${styles.agendaTime} ${index === timetable.length - 1 ? styles.agendaLastSlot : ''}`}
                    key={time}
                >
                    <h4>{time}</h4>
                </div>
            ))}

            {mode === 'week' ? (
                <WeekEntry date={date} entries={entries} timetable={timetable} />
            ) : (
                <DayEntry date={date} entries={entries} timetable={timetable} />
            )}
        </div>
    );
};

export default AgendaEntries;
