import { useMemo } from 'react';
import { format } from 'date-fns';

import { listAll, FirestoreQuery } from '../db/firebase.db';
import { Entities, Appointment } from '../types';
import useResponse, { Response } from './utils/useResponse';
import getWeekFromDate from './utils/getWeekFromDate';

interface UseAppointmentList {
    response: Response<Appointment[]>;
}

export type QueryMode = 'week' | 'day';

const useAllAppointmentList = (date?: Date, mode: QueryMode = 'week'): UseAppointmentList => {
    const queries: FirestoreQuery[] = useMemo(() => {
        if (!date) {
            return [];
        }

        if (mode === 'day') {
            return [['date', '==', format(date, 'dd/MM/yyyy')]];
        }

        const { dateStart, dateEnd } = getWeekFromDate(date);

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
