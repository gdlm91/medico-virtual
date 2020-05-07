import { useState, useEffect } from 'react';

import { get, update } from '../db/firestore.db';
import { Entities, Story, Patient } from '../types';
import useResponse, { Response } from './utils/useResponse';
import createApiFn from './utils/createApiFn';

interface StoryAPI {
    updatePatientInfo: (patient: Patient) => void;
}

interface UseStory {
    response: Response<Story>;
    api: StoryAPI;
}

const useStory = ($key: string): UseStory => {
    const [story$, setStory$] = useState(get<Story>(Entities.story, $key));
    const [response, setResponse] = useResponse(story$);

    useEffect(() => {
        setStory$(get<Story>(Entities.story, $key));
    }, [$key]);

    const updatePatientInfo = createApiFn<Story>(
        async (patient: Patient) => {
            if (!response.data) {
                return;
            }

            return update<Story>(Entities.story, $key, { ...response.data, patient });
        },
        response,
        setResponse,
    );

    return { response, api: { updatePatientInfo } };
};

export default useStory;
