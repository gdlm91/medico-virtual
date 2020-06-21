import { useEffect } from 'react';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

import useResponse from './utils/useResponse';
import { Cie10Record } from '../types';

const ENDPOINT = `${process.env.REACT_APP_FIREBASE_HTTPS}/cie`;

const useCie10 = (term: string) => {
    const [response, setResponse] = useResponse<Cie10Record[]>();

    useEffect(() => {
        if (!term || term.length < 4) {
            setResponse({ loading: false, error: undefined, data: undefined });
            return;
        }

        setResponse({ loading: true, error: undefined, data: undefined });

        const subscription = fromFetch(`${ENDPOINT}?term=${term}`)
            .pipe(
                switchMap((response) => {
                    if (response.status === 200) {
                        return response.json() as Promise<Cie10Record[]>;
                    } else {
                        throw new Error(`API responded with: ${response.status}`);
                    }
                }),
            )
            .subscribe(
                (res) => {
                    setResponse({ loading: false, error: undefined, data: res });
                },
                (error: Error) => setResponse({ loading: false, error, data: undefined }),
            );

        return () => subscription.unsubscribe();
    }, [term]);

    return [response];
};

export default useCie10;
