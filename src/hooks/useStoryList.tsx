import { useState } from 'react';

import { listAll } from '../db/firestore.db';
import { Entities, Story } from '../types';
import useResponse, { Response } from './utils/useResponse';

interface UseStoryList {
    response: Response<Story[]>;
}

const useStoryList = (): UseStoryList => {
    const [storyList$] = useState(listAll<Story>(`${Entities.stories}`));
    const [response] = useResponse(storyList$);

    return { response };
};

export default useStoryList;
