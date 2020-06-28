import { useMemo } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

import { listAll, FirestoreQuery } from '../db/firebase.db';
import { Entities, Appointment } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseAppointmentList {
    response: Response<Appointment[]>;
}

export type QueryMode = 'week' | 'day';

const useAllAppointmentList = (date?: string, mode: QueryMode = 'week'): UseAppointmentList => {
    const queries: FirestoreQuery[] = useMemo(() => {
        if (!date) {
            return [];
        }

        if (mode === 'day') {
            return [['date', '==', date]];
        }

        // Just making sure Date gets the right day/month/year
        const [day, month, year] = date.split('/').map(Number);
        const dateObj = new Date(year, month - 1, day);

        const dateStart = startOfWeek(dateObj);
        const dateEnd = endOfWeek(dateObj);

        return [
            ['timestamp', '>=', dateStart.getTime()],
            ['timestamp', '<=', dateEnd.getTime()],
        ];
    }, [date, mode]);
    const appointmentList$ = useMemo(() => {
        return listAll<Appointment>(Entities.appointments, { queries });
    }, [queries]);
    const [response] = useResponse(appointmentList$);

    return { response };
};

export default useAllAppointmentList;
