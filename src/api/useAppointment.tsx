import { useState, useEffect } from 'react';

import { get, update } from '../db/firestore.db';
import { Entities, Appointment, AppointmentStatusEnum } from '../types';
import useResponse, { Response } from './utils/useResponse';
import createApiFn from './utils/createApiFn';

interface AppointmentAPI {
    changeStatus: (status: AppointmentStatusEnum) => void;
    rescheduled: (date: string, time: string) => void;
}

interface UseAppointment {
    response: Response<Appointment>;
    api: AppointmentAPI;
}

const useAppointment = ($key: string): UseAppointment => {
    const [appointment$, setAppointment$] = useState(get<Appointment>(Entities.appointment, $key));
    const [response, setResponse] = useResponse(appointment$);

    useEffect(() => {
        setAppointment$(get<Appointment>(Entities.appointment, $key));
    }, [$key]);

    const changeStatus = createApiFn<Appointment>(
        async (status: AppointmentStatusEnum) => {
            if (!response.data) {
                return;
            }

            return update<Appointment>(Entities.appointment, $key, { ...response.data, status });
        },
        response,
        setResponse,
    );

    const rescheduled = createApiFn<Appointment>(
        async (date: string, time: string) => {
            if (!response.data) {
                return;
            }

            return update<Appointment>(Entities.appointment, $key, { ...response.data, date, time });
        },
        response,
        setResponse,
    );

    return { response, api: { changeStatus, rescheduled } };
};

export default useAppointment;
