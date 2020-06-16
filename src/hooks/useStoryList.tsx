import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { list, add } from '../db/firebase.db';
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
        list<Story>(`${Entities.stories}`, {
            queries: [['keywords', 'array-contains', debouncedQuery || '']],
        }),
    );
    const [response] = useResponse(storyList$);

    useEffect(() => {
        setStoryList$(
            list<Story>(`${Entities.stories}`, {
                queries: [['keywords', 'array-contains', debouncedQuery || '']],
            }),
        );
    }, [debouncedQuery]);

    const createStory = async (patient: Patient) => {
        if (response.loading) return Promise.reject('loading...');

        const newStory: Partial<Story> = {
            patient,
            keywords: generateKeywords(patient),
        };

        return await add<Partial<Story>>('stories', newStory);
    };

    return { response, api: { createStory } };
};

export default useStoryList;
