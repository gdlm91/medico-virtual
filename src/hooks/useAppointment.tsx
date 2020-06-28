import { useState, useEffect } from 'react';

import { get, update } from '../db/firebase.db';
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

export const getAppointmentKeysFromPath = ($path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_div1, storyKey, _div2, appointmentKey] = $path.split('/');

    return { storyKey, appointmentKey };
};

const useAppointment = (storyKey: string, appointmentKey: string): UseAppointment => {
    const path = `${Entities.stories}/${storyKey}/${Entities.appointments}/${appointmentKey}`;
    const [appointment$, setAppointment$] = useState(get<Appointment>(path));
    const [response, setResponse] = useResponse(appointment$);

    useEffect(() => {
        setAppointment$(get<Appointment>(path));
    }, [path]);

    const changeStatus = createApiFn<Appointment>(
        async (status: AppointmentStatusEnum) => {
            if (!response.data) {
                return;
            }

            return update<Appointment>(path, { ...response.data, status });
        },
        response,
        setResponse,
    );

    const rescheduled = createApiFn<Appointment>(
        async (date: string, time: string) => {
            if (!response.data) {
                return;
            }

            return update<Appointment>(path, { ...response.data, date, time });
        },
        response,
        setResponse,
    );

    return { response, api: { changeStatus, rescheduled } };
};

export default useAppointment;
