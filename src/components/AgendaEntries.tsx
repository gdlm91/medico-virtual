import React from 'react';
import { eachDayOfInterval, format } from 'date-fns';

import { Appointment } from '../types';
import styles from './AgendaEntries.module.css';
import getWeekFromDate from '../hooks/utils/getWeekFromDate';

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
    date: Date;
    entries: Appointment[];
    timetable: Timetable;
}

const DayEntry: React.FC<EntryProps> = ({ date, entries, timetable }) => {
    const groupedEntreis = timetable.map((time) => ({
        time,
        entries: entries.filter((entry) => entry.time === time),
    }));

    return (
        <>
            <div>
                <h4>{date.getDate()}</h4>
            </div>
            {groupedEntreis.map((group) => (
                <div key={group.time}>
                    {group.entries.map((entry) => (
                        <p key={entry.$key}>{entry.name}</p>
                    ))}
                </div>
            ))}
        </>
    );
};

const WeekEntry: React.FC<EntryProps> = ({ date, entries, timetable }) => {
    const { dateStart, dateEnd } = getWeekFromDate(date);
    const datesOfWeek = eachDayOfInterval({ start: dateStart, end: dateEnd });
    const groupedEntries = datesOfWeek.map((dateOfWeek) => ({
        date: dateOfWeek,
        entries: entries.filter((entry) => entry.date === format(dateOfWeek, 'dd/MM/yyyy')),
    }));

    return (
        <>
            {groupedEntries.map((entry, index) => (
                <DayEntry key={index} date={entry.date} entries={entry.entries} timetable={timetable} />
            ))}
        </>
    );
};

interface AgendaEntriesProps {
    date: Date;
    entries: Appointment[];
    mode?: string;
}

const AgendaEntries: React.FC<AgendaEntriesProps> = ({ date, entries, mode = 'day' }) => {
    const timetable = generateTimetable('08:00', '17:00');
    const gridRowCount = {
        gridTemplateRows: `repeat(${timetable.length + 1}, auto)`,
    };

    return (
        <div className={`${styles.agenda} ${styles[mode]}`} style={gridRowCount}>
            <div>Hora</div>
            {timetable.map((time) => (
                <div className={styles.agendaTime} key={time}>
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
