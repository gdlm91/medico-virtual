import { useState } from 'react';

import { listAll } from '../db/firestore.db';
import { Entities, Appointment } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseAppointmentList {
    response: Response<Appointment[]>;
}

const useAppointmentList = (): UseAppointmentList => {
    const [appointment$] = useState(listAll<Appointment>(Entities.appointment));
    const [response] = useResponse(appointment$);

    return { response };
};

export default useAppointmentList;
