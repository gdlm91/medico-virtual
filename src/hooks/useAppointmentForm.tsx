import { useState, useEffect } from 'react';

import { get, update, createIfUndefined } from '../db/firebase.db';
import { Entities, AppointmentForm } from '../types';
import useResponse, { Response } from './utils/useResponse';
import createApiFn from './utils/createApiFn';

interface AppointmentAPI {
    updateForm: (form: AppointmentForm) => void;
}

interface UseAppointmentForm {
    response: Response<AppointmentForm>;
    api: AppointmentAPI;
}

const useAppointment = (storyKey: string, appointmentKey: string): UseAppointmentForm => {
    // appointment form is in a sub-collection to avoid fetching it when querying for appointments
    const path = `${Entities.stories}/${storyKey}/${Entities.appointments}/${appointmentKey}/form/form`;
    const [appointmentForm$, setAppointmentForm$] = useState(get<AppointmentForm>(path));
    const [response, setResponse] = useResponse(appointmentForm$);

    useEffect(() => {
        setAppointmentForm$(get<AppointmentForm>(path));
    }, [path]);

    const updateForm = createApiFn<AppointmentForm>(
        async (form: AppointmentForm) => {
            if (!response.data) {
                return;
            }

            // need to create an empty form before updating for the first time.
            await createIfUndefined(path);

            return update<{ [key: string]: unknown }>(path, { ...form });
        },
        response,
        setResponse,
    );

    return { response, api: { updateForm } };
};

export default useAppointment;
