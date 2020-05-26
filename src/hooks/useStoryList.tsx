import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { listAll } from '../db/firestore.db';
import { Entities, Story } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseStoryList {
    response: Response<Story[]>;
}

const useStoryList = (query = ''): UseStoryList => {
    const [debouncedQuery] = useDebounce(query, 500);
    const [storyList$, setStoryList$] = useState(
        listAll<Story>(`${Entities.stories}`, [['keywords', 'array-contains', debouncedQuery || '']]),
    );
    const [response] = useResponse(storyList$);

    useEffect(() => {
        setStoryList$(
            listAll<Story>(`${Entities.stories}`, [['keywords', 'array-contains', debouncedQuery || '']]),
        );
    }, [debouncedQuery]);

    return { response };
};

export default useStoryList;
