import { useState } from 'react';

import { listAll } from '../db/firebase.db';
import { Entities, Appointment } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseAppointmentList {
    response: Response<Appointment[]>;
}

const useAllAppointmentList = (): UseAppointmentList => {
    const [appointmentList$] = useState(listAll<Appointment>(Entities.appointments));
    const [response] = useResponse(appointmentList$);

    return { response };
};

export default useAllAppointmentList;
