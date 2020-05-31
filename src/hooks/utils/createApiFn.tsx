/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'debounce';
import { UseResponse } from './useResponse';

const createApiFn = <T,>(
    apiFn: (...args: any[]) => Promise<T | void>,
    response: UseResponse<T>[0],
    setResponse: UseResponse<T>[1],
    debounceTime = 5000,
    emitResult = true,
) => {
    return debounce(async (...args: any[]) => {
        if (response.loading) return;

        setResponse({ loading: true });

        try {
            const result = await apiFn(...args);
            if (emitResult) {
                setResponse({ loading: false, error: undefined, data: result || undefined });
            }
        } catch (error) {
            setResponse({ loading: false, error });
        }
    }, debounceTime);
};

export default createApiFn;
