import { useState, useEffect } from 'react';

import { list } from '../db/firestore.db';
import { Entities, Appointment } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseStoryList {
    response: Response<Appointment[]>;
}

const useAppointmentList = (storyKey: string): UseStoryList => {
    const path = `${Entities.stories}/${storyKey}/${Entities.appointments}`;
    const [storyList$, setStoryList$] = useState(
        list<Appointment>(path, { sorters: [['timestamp', 'desc']] }),
    );
    const [response] = useResponse(storyList$);

    useEffect(() => {
        setStoryList$(list<Appointment>(path));
    }, [path]);

    return { response };
};

export default useAppointmentList;
