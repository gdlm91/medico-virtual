import { useState, useEffect } from 'react';

import { get, update } from '../db/firebase.db';
import { Entities, Story, Patient } from '../types';
import useResponse, { Response } from './utils/useResponse';
import createApiFn from './utils/createApiFn';
import tokenizePatientData from '../db/utils/tokenizePatientData';

interface StoryAPI {
    updatePatientInfo: (patient: Patient) => void;
}

interface UseStory {
    response: Response<Story>;
    api: StoryAPI;
}

const useStory = (storyKey: string): UseStory => {
    const path = `${Entities.stories}/${storyKey}`;
    const [story$, setStory$] = useState(get<Story>(path));
    const [response, setResponse] = useResponse(story$);

    useEffect(() => {
        setStory$(get<Story>(path));
    }, [path]);

    const updatePatientInfo = createApiFn<Story>(
        async (patient: Patient) => {
            if (!response.data) {
                return;
            }

            const keywords = tokenizePatientData(response.data.patient);

            return update<Story>(path, { ...response.data, keywords, patient });
        },
        response,
        setResponse,
    );

    return { response, api: { updatePatientInfo } };
};

export default useStory;
