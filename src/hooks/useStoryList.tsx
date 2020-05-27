import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { listAll, add } from '../db/firestore.db';
import generateKeywords from '../db/utils/tokenizePatientData';
import { Entities, Story, Patient } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface StoryListAPI {
    createStory: (patient: Patient) => Promise<firebase.firestore.DocumentReference>;
}

interface UseStoryList {
    response: Response<Story[]>;
    api: StoryListAPI;
}

const useStoryList = (query = ''): UseStoryList => {
    const [debouncedQuery] = useDebounce(query, 300);
    const [storyList$, setStoryList$] = useState(
        listAll<Story>(`${Entities.stories}`, [['keywords', 'array-contains', debouncedQuery || '']]),
    );
    const [response, setResponse] = useResponse(storyList$);

    useEffect(() => {
        setStoryList$(
            listAll<Story>(`${Entities.stories}`, [['keywords', 'array-contains', debouncedQuery || '']]),
        );
    }, [debouncedQuery]);

    const createStory = async (patient: Patient) => {
        if (response.loading) return Promise.reject('loading...');

        setResponse({ loading: true });

        const newStory: Partial<Story> = {
            patient,
            keywords: generateKeywords(patient),
        };

        return await add<Partial<Story>>('stories', newStory);
    };

    return { response, api: { createStory } };
};

export default useStoryList;
